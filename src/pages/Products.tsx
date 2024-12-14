import { useEffect, useRef, useState, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import { AnimatedDotsLoader } from "../components/AnimatedDotsLoader";
import Filters from "../components/Filters";
import { useFetch } from "../hooks/ApiHooks";
import { API_URLS } from "../configs/urls";
import { ProductData, ProductResponse } from "../types/productTypes";

export const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const limit = 20;
  const skip = products.length;

  // Using useFetch to get product data, with refetch mechanism
  const { data, isLoading, refetch } = useFetch<ProductResponse>({
    url: `${API_URLS.PRODUCTS}?limit=${limit}&skip=${skip}&select=title,price,thumbnail,category,brand,rating`,
    methodType: "GET",
  });

  // Handle fetching new products when data changes
  useEffect(() => {
    if (data?.products && data.skip === skip) {
      setProducts((prevProducts) => [...prevProducts, ...data.products]);

      // If the number of products returned is less than the limit, assume no more products
      if (data.products.length < limit) {
        refetch(); // Trigger refetch when you reach the end of products
      }
    }
  }, [data, skip]);

  // Handle intersection observer for infinite scrolling
  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoading) {
        refetch(); // Trigger the API call when observer is in view
      }
    },
    [isLoading, refetch]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <div className="product-container">
      <div className="product-header">
        <div className="">Sort By ↓</div>
      </div>
      <div className="flex flex-row">
        <Filters onFilterChange={() => {}} />
        <div>
          <div className="product-list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div ref={observerRef} className="flex w-full justify-center">
            {isLoading && <AnimatedDotsLoader />}
          </div>
        </div>
      </div>
    </div>
  );
};
