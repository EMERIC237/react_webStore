import { SanityImageObject } from "@sanity/image-url/lib/types/types";
// SanityImageSource
export interface ProductModel {
  id: number;
  images: SanityImageObject[];
  name: string;
  slug: { _type: string; current: string };
  price: number;
  details: string;
  category: string;
}
