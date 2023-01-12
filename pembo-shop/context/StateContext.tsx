import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { createTypeReferenceDirectiveResolutionCache, idText } from "typescript";
interface AppContextInterface {
  showCart: boolean;
  cartItems: any[] | undefined;
  totalPrice: number | undefined;
  totalQuantities: number | undefined;
  qty: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
  increaseQty: () => void;
  decreaseQty: () => void;
  onAddItems: (product: any, quantity: number) => void;
  toggleCartItemQuantity: (id: number, value: string) => void;
  onRemove: (id: number) => void;
}

const Context = createContext<AppContextInterface | null>(null);

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState<number>(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index;

  const onAddItems = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.some((item: any) => item._id === product._id)
    //if the product exist in the cart...
    setTotalPrice((prevTotalPrice: number) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: any) => {

        if (cartProduct._id === product._id) {
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
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const onRemove = (id: number) => {
    foundProduct = cartItems.find((item) => item._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id: number, value: string) => {

    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.find((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)

    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
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