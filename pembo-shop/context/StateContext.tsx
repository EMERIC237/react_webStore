import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CartProduct } from "../models/cartProduct.model";
import { ProductModel } from "../models/product.model";
// Interface that defined the context used by the app
interface AppContextInterface {
  showCart: boolean;
  cartItems: CartProduct[] | undefined;
  totalPrice: number | undefined;
  totalQuantities: number | undefined;
  qty: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
  increaseQty: () => void;
  decreaseQty: () => void;
  onAddItems: (product: ProductModel, quantity: number) => void;
  toggleCartItemQuantity: (id: number, value: string) => void;
  onRemove: (id: number) => void;
}

const Context = createContext<AppContextInterface | null>(null);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState(1);

  let foundProduct: CartProduct | undefined;
  let index;

  const onAddItems = (product: ProductModel, quantity: number) => {
    const checkProductInCart = cartItems.some((item) => item.id === product.id)
    //if the product exist in the cart...
    setTotalPrice((prevTotalPrice) => prevTotalPrice + Number(product.price.amount) * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {

        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        } else {
          return cartProduct
        }
      })
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const onRemove = (id: number) => {
    foundProduct = cartItems.find((item) => item.id === id)
    const newCartItems = cartItems.filter((item) => item.id !== id)
    // foundProduct showing possibling "undefined" even inside the "if" statement
    if (foundProduct) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(foundProduct!.price) * foundProduct!.quantity)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct!.quantity)
    }
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item.id === id)
    index = cartItems.find((product) => product.id === id)
    const newCartItems = cartItems.filter((item) => item.id !== id)

    if (value === 'inc' && foundProduct) {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + Number(foundProduct!.price))
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

    } else if (value === 'dec' && foundProduct) {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(foundProduct!.price))
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }

  }
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  }
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1
    })
  }

  return <Context.Provider value={{
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    increaseQty,
    decreaseQty,
    onAddItems,
    toggleCartItemQuantity,
    onRemove,
  }}>
    {children}
  </Context.Provider>;
};


export const useStateContext = () => useContext(Context);