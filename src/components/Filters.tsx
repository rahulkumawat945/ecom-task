import { ChangeEvent, useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { useFetch } from "../hooks/ApiHooks";
import { API_URLS } from "../configs/urls";
import { capitalizeFirstLetter } from "../utils/utils";
import Select from "./Select";

type FilterOptions = {
    price?: { start: number, end: number },
    category?: string[],
    rating?: string
}

type FilterProps = {

    onFilterChange: (_filters: FilterOptions) => void
}

export default function Filters(props: FilterProps) {
    const min = 0;
    const max = 100000
    const [selectedCategories, setCategories] = useState<string[]>([])
    const [price, setPrice] = useState<{ start: number, end: number }>({ start: min, end: max })
    const { data, isLoading, error } = useFetch<string[]>({ url: API_URLS.CATEGORY_LIST, methodType: "GET" })

    const onCategorySelected = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const checked = e.target.checked
        if (checked && name) {
            setCategories((categories) => [...categories, name])
        } else {
            setCategories((categories) => categories.filter((category) => category !== name));
        }
    }

    const sortOptions = [
        { value: "price-low-to-high", label: "Price low to high" },
        { value: "price-high-to-low", label: "Price high to low" },
    ];

    const handleCategoryChange = (value: string) => {
        console.log("Selected category:", value);
    };

    return (
        <div className="filter-container desktop">
            <h4>Filters</h4>
            <div className="mt-4">
                <Select
                    label="Sort By"
                    options={sortOptions}
                    className="mb-4"
                    defaultValue="all"
                    onChange={handleCategoryChange}
                />
                <h5>Price Range</h5>
                <PriceRangeSlider maxPrice={max} minPrice={min} onChange={(start, end) => setPrice({ start: start, end: end })} />
                <h5 className="mt-4">Categories</h5>
                {isLoading && <span>Loading ...</span>}
                {data?.map(category => {
                    return (
                        <p className="text-sm mt-3 flex items-center">
                            <input name={category} className="accent-emerald-500/25" type="checkbox" onChange={onCategorySelected}></input>
                            <label className="ml-2">{capitalizeFirstLetter(category)}</label>
                        </p>
                    )
                })}
                {error && <span>{error}</span>}
            </div>
            <button className="primary-button mt-4 w-full bg-slate-100"
                onClick={() => { props.onFilterChange({ category: selectedCategories, price: price }) }}
            >
                Apply
            </button>
        </div>
    )
}