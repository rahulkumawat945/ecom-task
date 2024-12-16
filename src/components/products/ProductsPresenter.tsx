import { FilterOptions, ProductData, SortingData } from "../../types/productTypes";
import Filters from "../Filters";
import { ProductCard } from "../ProductCard";
import { AnimatedDotsLoader } from "../AnimatedDotsLoader";
import ProductModel from "../ProductModel";
import SideModal from "../SideModels";
import { useState } from "react";

interface ProductsPresenterProps {
  products: ProductData[];
  isLoading: boolean;
  showDetailsModel: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  onProductSelected: (id: number) => void;
  productId: number | null;
  onCloseModel: () => void;
  onFilterChange: (_filters: FilterOptions) => void,
  onSortingChange: (_sorting: SortingData) => void
}

export const ProductsPresenter = (props: ProductsPresenterProps) => {
  const {
    products,
    isLoading,
    observerRef,
    onProductSelected,
    showDetailsModel,
    productId,
    onCloseModel,
    onFilterChange,
    onSortingChange
  } = props;

  const [showFilterModel, setShowFilterModel] = useState(false)

  return (
    <div className="product-container">
      <div className="flex flex-row">
        <div className="hidden lg:block">
          <Filters onFilterChange={onFilterChange} onSortingChange={onSortingChange} />
        </div>
        {/* Product list */}
        <div className="flex-1 mb-14 sm:mb-0">
          <div className="product-list">
            {products.map((product) => (
              <ProductCard
                key={product.id} product={product}
                onClick={() => { onProductSelected(product.id) }}
              />
            ))}
          </div>
          {isLoading && <AnimatedDotsLoader />}
          {/* Hiding observer element so it doesn't call load more before initial load */}
          <div ref={observerRef} className="w-full" />
        </div>
      </div>
      <div className="block md:hidden w-full bg-gray-50 fixed bottom-0 left-0 flex items-center p-4">
        <button className="primary-button w-full" onClick={() => setShowFilterModel(true)}>Filters</button>
      </div>
      <ProductModel open={showDetailsModel} id={productId} onClose={onCloseModel} />
      <SideModal open={showFilterModel} onClose={() => setShowFilterModel(false)}>
        <Filters
          onFilterChange={(filters) => {
            setShowFilterModel(false);
            onFilterChange(filters)
          }}
          onSortingChange={(sorting) => {
            setShowFilterModel(false);
            onSortingChange(sorting)
            }} />
      </SideModal>
    </div>
  );
};
