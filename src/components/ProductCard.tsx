import { ProductData } from "../types/productTypes";
import starImg from '../assets/star.png'

type ProductProps = {
    product: ProductData,
    onClick: (_id: number) => void 
}

export const ProductCard = ({ product, onClick}: ProductProps) => {
    return (
        <div className="product-item flex flex-col" onClick={() => onClick(product.id)}>
            <img className="product-thumbnail lg:h-72 md:h-52 sm:h-44" src={product?.thumbnail} loading="lazy" />
            <span className="rounded-full px-2 py-1 text-xs font-semibold bg-orange-100 w-fit absolute top-2 right-2">
                {(product.category || "").toUpperCase()}
            </span>
            <div className="p-4 relative">
                <button className="primary-button buy-now">Buy Now</button>
                <p className="font-medium w-fit">{product.brand ?? "New"}</p>
                <h4 className="mt-2 text-sm work">{product.title}</h4>
                <div className="flex flex-row justify-between mt-2">
                    <p>${product.price}</p>
                    <div className="flex flex-row items-center"><img className="h-4 w-4 mr-1" src={starImg} />{Number(product.rating).toFixed(1)}</div>
                </div>
            </div>
        </div>
    )
};