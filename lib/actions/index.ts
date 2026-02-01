"use server"

import { revalidatePath } from "next/cache";
import { scrapAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.models";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../scraper/utils";

export async function scrapeAndStoreProduct(productURL : string) {
    if(!productURL) return ;

    try {

        connectToDB();

        const scrapedProduct = await scrapAmazonProduct(productURL); 
        if(!scrapedProduct) return;

        // storing part
        let product = scrapedProduct;
        const existingProduct = await Product.findOne({url: scrapedProduct.url});

        if(existingProduct) {
            const updatedPriceHistory: = [
                ...existingProduct.priceHistory, {price: scrapedProduct.currentPrice}
            ]
        
            product = {
                ...scrapedProduct, 
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory)
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            {url: scrapedProduct.url},
            product,
            {upsert: true, new: true}
        )

        revalidatePath(`/products/${newProduct._id}`);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}