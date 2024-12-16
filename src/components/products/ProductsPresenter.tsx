import { ProductData } from "../../types/productTypes";
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
}

export const ProductsPresenter = (props: ProductsPresenterProps) => {
  const {
    products,
    isLoading,
    observerRef,
    onProductSelected,
    showDetailsModel,
    productId,
    onCloseModel
  } = props;

  return (
    <div className="product-container">
      <div className="flex flex-row">
        <Filters onFilterChange={() => {}} />
        <div>
          <div className="product-list">
            {products.map((product) => (
              <ProductCard
                key={product.id} product={product}
                onClick={()=>{onProductSelected(product.id)}}
                />
            ))}
          </div>
          <div ref={observerRef} className="flex w-full justify-center">
            {isLoading && <AnimatedDotsLoader />}
          </div>
        </div>
      </div>
      <ProductModel open={showDetailsModel} id={productId} onClose={onCloseModel}/>
    </div>
  );
};
