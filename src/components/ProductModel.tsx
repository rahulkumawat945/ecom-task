import { useEffect } from "react";
import { useFetch } from "../hooks/ApiHooks";
import { API_URLS } from "../configs/urls";
import SwiperSlider from "./SwiperSlider";
import SideModal from "./SideModels";
import { ProductData } from "../types/productTypes";

type ProductModelProps = {
    id: number | null,
    open: boolean,
    onClose: () => void
}

export default function ProductModel(props: ProductModelProps) {
    const { id, open } = props;
    console.log("🚀 ~ ProductModel ~ open:", open)

    const { data: product, isLoading, refetch } = useFetch<ProductData>({ url: API_URLS.PRODUCTS + "/" + id, noInitialLoad: true })
    console.log("🚀 ~ ProductModel ~ data:", product)

    useEffect(() => {
        if (open) {
            refetch()
        }
    }, [open])

    if (!id) {
        return null
    }
    return (
        <SideModal title="Product Details" open={open} onClose={props.onClose}>
            {!isLoading ? (
                <>
                    <div className="mb-20">
                        <SwiperSlider images={product?.images ?? []} />
                        <h4>{product?.title}</h4>
                        <p className="mt-2">{product?.description}</p>
                        <div className="mt-4 flex flex-row justify-between border-2 p-2 rounded-lg bg-slate-100">
                            <div className="font-semibold flex flex-row items-center">Rating: {(product?.rating ?? 0).toFixed(1)}
                                <img className="h-4 w-4" src={"/icons/star.png"} />
                            </div>
                            <div className="w-0.5 h11/12 bg-gray-300" />
                            <span className="font-semibold ">Stock: {product?.stock}</span>
                        </div>
                        <h5 className="mt-4">Reviews: {product?.reviews?.length}</h5>
                        <div className="mt-2 border-2 p-2 rounded-lg bg-slate-100">
                            <div className="mt-2">
                                {product?.reviews?.map((review) => {
                                    return (
                                        <>
                                            <div className="font-semibold text-xs mt-2">{review.reviewerName} ({review.reviewerEmail})</div>
                                            <div className="text-sm">{review.comment}</div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 fixed w-11/12 bottom-2">
                        <button className={"secondary-button flex-1"}>WishList</button>
                        <button className={`primary-button flex-1 ${product?.stock ? "" : "disable"}`}>Buy Now</button>
                    </div>
                </>
            ) : <span>Loading...</span>}

        </SideModal>
    )

}