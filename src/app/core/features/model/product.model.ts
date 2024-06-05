export interface ProductModel {
    id: string;
    companyID: number;
    productSl: string;
    productCategory: string;
    productName: string;
    brand: string;
    model: string;
    origin: string;
    description: string;
    aditionalInformation: string;
    specialFeature: string;
    catalogUrl: string | null;
    imageUrl: string;
    imageFile: string | null;
}
