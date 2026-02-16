import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link
            href={`/products/${product._id}`}
            className="sm:w-72 w-full flex flex-col gap-4 rounded-md"
        >
            <div className="relative w-full h-64 p-4">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="text-secondary text-xl font-semibold w-full truncate">
                    {product.title}
                </h3>

                <div className="flex justify-between">
                    <p className=" text-black opacity-50 capitalize">
                        {product.category}
                    </p>

                    <p className="font-semibold">
                        {product.currency}{product.currentPrice}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default ProductCard