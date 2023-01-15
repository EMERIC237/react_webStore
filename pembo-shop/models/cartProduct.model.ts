import { ProductModel } from "./product.model";
export interface CartProduct extends ProductModel {
  quantity: number;
}
