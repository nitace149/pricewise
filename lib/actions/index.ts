"use server"

import { scrapAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";

export async function scrapeAndStoreProduct(productURL : string) {
    if(!productURL) return ;

    try {

        connectToDB();

        const scrapedProduct = await scrapAmazonProduct(productURL); 
        if(!scrapedProduct) return;

        // storing part

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}