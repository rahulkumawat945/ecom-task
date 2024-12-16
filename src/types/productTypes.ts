export type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
};

export type Dimensions = {
    width: number;
    height: number;
    depth: number;
};

export type Meta = {
    createdAt: string; 
    updatedAt: string;
    barcode: string;
    qrCode: string;
};

export type ProductResponse = {
    products: ProductData[],
    total: number,
    skip: number,
    limit: number
}

export type ProductData = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions?: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews?: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta?: Meta;
    images: string[];
    thumbnail: string;
};

export type FilterOptions = {
    price?: { start: number, end: number },
    category?: string[],
    rating?: number
}

export type SortBy= "price" //add more if requires and API supports
export type SortOrder = "asc" | "desc" //add more if requires and API supports
export type SortingData = {
    type: SortBy
    order: SortOrder
}