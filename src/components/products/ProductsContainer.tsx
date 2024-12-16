import { useEffect, useRef, useState, useCallback } from "react";
import { ProductsPresenter } from "./ProductsPresenter";
import { API_URLS } from "../../configs/urls";
import { FilterOptions, ProductData, ProductResponse, SortingData } from "../../types/productTypes";
import { useFetch } from "../../hooks/ApiHooks";


export const ProductsContainer = () => {
    const [allProducts, setAllProducts] = useState<ProductData[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);
    const [productId, setSetProductID] = useState<number | null>(null);
    const [filters, setFilters] = useState<FilterOptions>({})
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [sorting, setSorting] = useState<SortingData>({ type: "price", order: "asc" })
    const observerRef = useRef<HTMLDivElement | null>(null);
    // const sorting

    const limit = 20;
    const skip = allProducts.length;

    const { data, isLoading, refetch, error } = useFetch<ProductResponse>({
        url: `${API_URLS.PRODUCTS}?sortBy=${sorting.type}&order=${sorting.order}&limit=${limit}&skip=${skip}&select=title,price,thumbnail,category,brand,rating`,
        methodType: "GET"
    });

    useEffect(() => {
        if (data?.products && data.skip === skip) {
            const latestProducts = [...allProducts, ...data.products]
            setAllProducts(latestProducts)
            setHasMore(data.products.length < limit)
            //filter out as per applied constraint and display data
            setFilteredProducts(applyFilters(filters, latestProducts));
        }
    }, [data, skip]);

    // Handle intersection observer for infinite scrolling
    const onIntersect = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting && !isLoading && !hasMore && !error) {
                refetch();
            }
        },
        [isLoading, refetch]
    );


    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => observer.disconnect();
    }, [onIntersect, allProducts]);

    //Due to API constraint created local filter function that applies after data fetching
    const applyFilters = (filter: FilterOptions, data: ProductData[]) => {
        let filteredData = data
        const { category, price, rating } = filter;
        filteredData = filteredData.filter(product => {
            const existInCategory = category?.length ? category?.includes(product.category) : true;
            const existInPriceRange = price ? (product.price >= price.start && product.price <= price.end) : true
            const existInRating = rating ? product.rating >= product.rating : true

            return existInCategory && existInPriceRange && existInRating;
        })

        return filteredData
    }

    const handleFilterChange = (filter: FilterOptions) => {
        setFilters(filter)
        setFilteredProducts(applyFilters(filter, allProducts))
    }

    const onProductSelected = (id: number) => {
        setSetProductID(id);
        setShowDetailsModel(true)
    }

    //Handled initial mount so refetch doesn't call twice on loading
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            refetch()
        }
    }, [sorting])

    const onSortingChange = (sorting: SortingData) => {
        console.log("🚀 ~ onSortingChange ~ sorting:", sorting)
        setAllProducts([])
        setFilteredProducts([])
        setSorting(sorting)
    }


    return (
        <ProductsPresenter
            products={filteredProducts}
            isLoading={isLoading}
            observerRef={observerRef}
            onProductSelected={onProductSelected}
            showDetailsModel={showDetailsModel}
            productId={productId}
            onCloseModel={() => setShowDetailsModel(false)}
            onFilterChange={handleFilterChange}
            onSortingChange={onSortingChange}
        />
    );
};
