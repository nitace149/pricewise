import Product from "@/lib/models/product.models";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/scraper/utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        connectToDB();

        const product = await Product.find({});
        if(!product) throw new Error("No products found");

        // 1. Scrape Last Product Details & Update DB
        const updatedProducts = await Promise.all(
            product.map(async (currentProduct) =>{
                const scrapedProduct = await scrapAmazonProduct(currentProduct.url);

                if(!scrapedProduct) throw new Error("No product found");


                const updatedPriceHistory = [
                    ...currentProduct.priceHistory, {price: scrapedProduct.currentPrice}
                ]
            
                const product = {
                    ...scrapedProduct, 
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory)
                }
            

                const updatedProduct = await Product.findOneAndUpdate(
                    {url: scrapedProduct.url},
                    product,
                );

                // Chech each product status & send email accourdingly
                const emailNotifiType = getEmailNotifType(scrapedProduct, currentProduct)
                if(emailNotifiType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotifiType);

                    const userEmail = updatedProduct.user.map((user: any) => user.email)

                    await sendEmail(emailContent, userEmail);
                }
                return updatedProduct;
            })
        )
        return NextResponse.json({
            message: 'ok', data: updatedProducts
        })
    } catch (error) {
        throw new Error(`Error in GET: ${error}`);
    }
}