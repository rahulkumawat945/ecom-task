import { FilterOptions, ProductData, SortingData } from "../../types/productTypes";
import Filters from "../Filters";
import { ProductCard } from "../ProductCard";
import { AnimatedDotsLoader } from "../AnimatedDotsLoader";
import ProductModel from "../ProductModel";

interface ProductsPresenterProps {
  products: ProductData[];
  isLoading: boolean;
  observerRef: React.RefObject<HTMLDivElement>;
  onProductSelected: (id: number) => void;
  showDetailsModel: boolean;
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

  return (
    <div className="product-container">
      <div className="flex flex-row">
        <Filters onFilterChange={onFilterChange} onSortingChange={onSortingChange} />
        {/* Product list */}
        <div className="flex-1">
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
      <ProductModel open={showDetailsModel} id={productId} onClose={onCloseModel} />
    </div>
  );
};
