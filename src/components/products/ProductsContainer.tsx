import { useEffect, useRef, useState, useCallback } from "react";
import { ProductsPresenter } from "./ProductsPresenter";
import { API_URLS } from "../../configs/urls";
import { FilterOptions, ProductData, ProductResponse, SortingData } from "../../types/productTypes";
import { fetchData } from "../../utils/fetchUtils";


const applyFilters = (filter: FilterOptions, data: ProductData[]): ProductData[] => {
    const { category, price, rating } = filter;

    return data.filter((product) => {
        const matchesCategory = !category?.length || category.includes(product.category);
        const matchesPrice = !price || (product.price >= price.start && product.price <= price.end);
        const matchesRating = !rating || product.rating >= rating;

        return matchesCategory && matchesPrice && matchesRating;
    });
};

export const ProductsContainer = () => {
    const [allProducts, setAllProducts] = useState<ProductData[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const [filters, setFilters] = useState<FilterOptions>({});
    const [sorting, setSorting] = useState<SortingData>({ type: "price", order: "asc" });
    const [showDetailsModel, setShowDetailsModel] = useState<boolean>(false);
    const [productId, setProductID] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const limit = 20;

    // Fetch data from API
    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        const skip = allProducts.length;
        const url = `${API_URLS.PRODUCTS}?sortBy=${sorting.type}&order=${sorting.order}&limit=${limit}&skip=${skip}&select=title,price,thumbnail,category,brand,rating`;

        const { data, error } = await fetchData<ProductResponse>(url);
        if (error) {
            setError(error);
        } else {
            if (data?.products && data.skip === skip) {
                const updatedProducts = [...allProducts, ...data.products];
                setAllProducts(updatedProducts);
                setHasMore(data.products.length < limit);
            }
        }
        setIsLoading(false);
    };

    // Update filtered products when filters or allProducts change
    useEffect(() => {
        setFilteredProducts(applyFilters(filters, allProducts));
    }, [filters, allProducts]);


    // Handle infinite scrolling using Intersection Observer
    const onIntersect = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            console.log("🚀 ~ ProductsContainer ~ entry:", entry)
            if (entry.isIntersecting && !isLoading && !hasMore && !error) {
                fetchProducts();
            }
        },
        [isLoading, hasMore, error, allProducts]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [onIntersect]);

    // Handle sorting change
    const onSortingChange = (newSorting: SortingData) => {
        setSorting(newSorting);
        setAllProducts([]);
        setFilteredProducts([]);
    };

    // Refetch data when sorting changes
    useEffect(() => {
        fetchProducts();
    }, [sorting]);

    // Handle product selection
    const onProductSelected = (id: number) => {
        setProductID(id);
        setShowDetailsModel(true);
    };

    // Handle filter changes
    const handleFilterChange = (filter: FilterOptions) => {
        setFilters(filter);
    };

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
