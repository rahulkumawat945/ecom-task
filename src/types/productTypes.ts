export type Review = {
    rating: number;
    comment: string;
    date: string; // ISO 8601 format
    reviewerName: string;
    reviewerEmail: string;
};

export type Dimensions = {
    width: number;
    height: number;
    depth: number;
};

export type Meta = {
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
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
    weight: number; // Unit unspecified, typically grams or ounces
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
