import { ChangeEvent, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { useFetch } from "../hooks/ApiHooks";
import { API_URLS } from "../configs/urls";
import { capitalizeFirstLetter } from "../utils/utils";
import Select from "./Select";
import { FilterOptions, SortingData } from "../types/productTypes";



type FilterProps = {
    onFilterChange: (_filters: FilterOptions) => void
    onSortingChange: (_sorting: SortingData) => void
}

export default function Filters(props: FilterProps) {
    const min = 0;
    const max = 1000
    const [selectedCategories, setCategories] = useState<string[]>([])
    const [price, setPrice] = useState<{ start: number, end: number }>({ start: min, end: max })

    //Category API call
    const { data, isLoading, error } = useFetch<string[]>({ url: API_URLS.CATEGORY_LIST, methodType: "GET"})

    const onCategorySelected = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const checked = e.target.checked
        if (checked && name) {
            setCategories((categories) => [...categories, name])
        } else {
            setCategories((categories) => categories.filter((category) => category !== name));
        }
    }

    // const sortingValue

    const sortOptions: { value: string, sorting: SortingData, label: string }[] = [
        { value: "price-asc", sorting: { type: "price", order: "asc" }, label: "Price low to high" },
        { value: "price-desc", sorting: { type: "price", order: "desc" }, label: "Price high to low" },
    ];

    const handleCategoryChange = (value: string) => {
        const sortingOption = sortOptions.find(item => item.value === value)?.sorting
        console.log("🚀 ~ handleCategoryChange ~ sortingOption:", sortingOption)
        if (sortingOption) {
            props.onSortingChange(sortingOption)
        }
    };

    return (
        <div className="filter-container desktop">
            <Select
                label="Sort By"
                options={sortOptions}
                className=""
                defaultValue="all"
                onChange={handleCategoryChange}
            />
            <div className="my-6 w-full h-0.5 bg-gray-200 rounded-full" />
            <div className="flex flex-row items-center">
                <h5>Filters</h5>
                {/* Adding an apply button as APIs are not supportive for runtime filters */}
                <button className="w-full ml-4 text-red-500 border-2 rounded-lg"
                    onClick={() => { props.onFilterChange({ category: selectedCategories, price: price }) }}
                >
                    Apply
                </button>
            </div>
            <div className="mt-4">
                <h5>Price Range</h5>
                <PriceRangeSlider maxPrice={max} minPrice={min} onChange={(start, end) => setPrice({ start: start, end: end })} />
                <h5 className="mt-4">Categories</h5>
                {isLoading && <span>Loading ...</span>}
                {data?.map(category => {
                    return (
                        <p className="text-sm mt-3 flex items-center" key={category}>
                            <input name={category} className="accent-emerald-500/25" type="checkbox" onChange={onCategorySelected}></input>
                            <label className="ml-2">{capitalizeFirstLetter(category)}</label>
                        </p>
                    )
                })}
                {error && <span>{error}</span>}
            </div>
        </div>
    )
}