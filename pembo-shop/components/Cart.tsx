import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'


const Cart = () => {
  const cartRef = useRef(null);
  const context = useStateContext();
  if (!context) {
    return null;
  }
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = context
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type='button' className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>{totalQuantities}</span>
        </button>
        {cartItems!.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button type='button' onClick={() => setShowCart(false)}
                className="btn">
                Continue Shopping

              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems!.length >= 1 && cartItems!.map((item, index) => (
            <div className="product" key={item.id}>
              <Image
                src={item.images[0].src}
                alt={item.name}
                className='cart-product-image'
                width={100}
                height={100} />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>XAF {item.price.amount}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item.id, 'dec')} >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.quantity}
                      </span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item.id, 'inc')}>
                        <AiOutlinePlus />
                      </span>

                    </p>
                  </div>
                  <button className="remove-item" onClick={() => onRemove(item.id)}><TiDeleteOutline /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems!.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>XAF {totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className="btn">Pay Here</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart