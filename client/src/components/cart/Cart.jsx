import React, { useState } from "react";
import "./cart.scss";
import { cartStore } from "../../store";
import CartItem from "../cartitems/CartItem";
import { useQuery } from "react-query";

const Cart = () => {
  const { cartItems } = cartStore((state) => state);
  return (
    <div className="cart__wrapper">
      {cartItems.length > 0 ? (
        cartItems.map((item) => <CartItem key={item} item={item} />)
      ) : (
        <h3>Cart is empty</h3>
      )}

      {cartItems.length > 0 && (
        <button className="checkout__btn">Checkout</button>
      )}
    </div>
  );
};

export default Cart;
