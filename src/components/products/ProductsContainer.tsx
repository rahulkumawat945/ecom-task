import { useEffect, useRef, useState, useCallback } from "react";
import { ProductsPresenter } from "./ProductsPresenter";
import { API_URLS } from "../../configs/urls";
import { ProductData, ProductResponse } from "../../types/productTypes";
import { useFetch } from "../../hooks/ApiHooks";

export const ProductsContainer = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);
    const [productId, setSetProductID] = useState<number | null>(null);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const limit = 20;
    const skip = products.length;

    const { data, isLoading, refetch } = useFetch<ProductResponse>({
        url: `${API_URLS.PRODUCTS}?limit=${limit}&skip=${skip}&select=title,price,thumbnail,category,brand,rating`,
        methodType: "GET",
    });

    useEffect(() => {
        if (data?.products && data.skip === skip) {
            setProducts((prevProducts) => [...prevProducts, ...data.products]);

            // If the number of products returned is less than the limit, assume no more products
            if (data.products.length < limit) {
                refetch();
            }
        }
    }, [data, skip]);

    // Handle intersection observer for infinite scrolling
    const onIntersect = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading) {
                refetch();
            }
        },
        [isLoading, refetch]
    );

    function onProductSelected(id: number) {
        setSetProductID(id);
        setShowDetailsModel(true)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => observer.disconnect();
    }, [onIntersect]);

    return (
        <ProductsPresenter
            products={products}
            isLoading={isLoading}
            observerRef={observerRef}
            onProductSelected={onProductSelected}
            showDetailsModel={showDetailsModel}
            productId={productId}
            onCloseModel={() => setShowDetailsModel(false)}
        />
    );
};
