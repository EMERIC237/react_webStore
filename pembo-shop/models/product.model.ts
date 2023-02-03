// SanityImageSource
export interface ProductModel {
  id: number;
  images: any[];
  name: string;
  handle: string;
  price: {
    amount: string;
    currencyCode: string;
    [key: string]: any;
  };
  details: string;
  category: string;
}
