import { ChangeEvent, useEffect, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import Select from "./Select";
import { API_URLS } from "../configs/urls";
import { capitalizeFirstLetter } from "../utils/utils";
import { FilterOptions, SortingData } from "../types/productTypes";
import { fetchData } from "../utils/fetchUtils";

type FilterProps = {
    onFilterChange: (filters: FilterOptions) => void;
    onSortingChange: (sorting: SortingData) => void;
};

type CategoryResponse = string[];

export default function Filters({ onFilterChange, onSortingChange }: FilterProps) {
    const minPrice = 0;
    const maxPrice = 1000;

    const [categories, setCategories] = useState<CategoryResponse | null>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<{ start: number; end: number }>({
        start: minPrice,
        end: maxPrice,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        setError(null);

        const { data, error } = await fetchData<CategoryResponse>(API_URLS.CATEGORY_LIST);
        if (error) {
            setError(error);
        } else {
            setCategories(data);
        }

        setIsLoading(false);
    };

    // Fetch categories
    useEffect(() => {

        fetchCategories();
    }, []);

    // Sort options
    const sortOptions: { value: string; sorting: SortingData; label: string }[] = [
        { value: "price-asc", sorting: { type: "price", order: "asc" }, label: "Price Low to High" },
        { value: "price-desc", sorting: { type: "price", order: "desc" }, label: "Price High to Low" },
    ];

    // Handlers
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = e.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, name] : prev.filter((category) => category !== name)
        );
    };

    const handleSortChange = (value: string): void => {
        const sortingOption = sortOptions.find((option) => option.value === value)?.sorting;
        if (sortingOption) {
            onSortingChange(sortingOption);
        }
    };

    const handleApplyFilters = (): void => {
        onFilterChange({ category: selectedCategories, price: priceRange });
    };

    return (
        <div className="filter-container">
            {/* Sort By */}
            <Select
                label="Sort By"
                options={sortOptions}
                defaultValue="all"
                onChange={handleSortChange}
            />
            <div className="my-6 w-full h-0.5 bg-gray-200 rounded-full" />

            {/* Filters */}
            <div className="flex flex-row items-center">
                <h5>Filters</h5>
                <button
                    className="w-full ml-4 text-red-500 border-2 rounded-lg"
                    onClick={handleApplyFilters}
                >
                    Apply
                </button>
            </div>

            {/* Price Range */}
            <div className="mt-4">
                <h5>Price Range</h5>
                <PriceRangeSlider
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    onChange={(start, end) => setPriceRange({ start, end })}
                />

                {/* Categories */}
                <h5 className="mt-4">Categories</h5>
                {isLoading && <span>Loading...</span>}
                {error && <span className="text-red-500">{error}</span>}
                {!isLoading &&
                    categories?.map?.((category) => (
                        <p className="text-sm mt-3 flex items-center" key={category}>
                            <input
                                name={category}
                                type="checkbox"
                                className="accent-emerald-500/25"
                                onChange={handleCategoryChange}
                            />
                            <label className="ml-2">{capitalizeFirstLetter(category)}</label>
                        </p>
                    ))}
            </div>
        </div>
    );
}
