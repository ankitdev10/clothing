import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { cartStore } from "../../store";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const [cartCount, setCartCount] = useState(1);
  const { deleteCartItem, cartItems } = cartStore((state) => state);

  const handleCartCount = (type) => {
    if (type === "inc") {
      setCartCount((prev) => prev + 1);
    }
    if (type === "dec") {
      setCartCount((prev) => prev - 1);
    }
  };

  const fetchCartItem = async () => {
    return await axios.get(`/product/single/${item}`);
  };
  const { data } = useQuery(["cart-item-", item], fetchCartItem);

  // remove items from cart
  const handleClear = () => {
    const filteredCart = cartItems.filter((id) => id !== item);
    deleteCartItem(filteredCart);
    toast.info("Item removed from cart");
  };

  return (
    <>
      <div className="cart__top">
        <div className="left__img">
          <img src={data?.data?.imgUrl[0]} alt="" />
        </div>
        <div className="right__details">
          <h3 className="title">{data?.data?.title}</h3>
          <div className="counter">
            <button
              onClick={() => handleCartCount("dec")}
              className="btn dec"
              disabled={cartCount <= 1 && true}
            >
              -
            </button>
            <span className="qty">{cartCount}</span>
            <button
              onClick={() => handleCartCount("inc")}
              className="btn inc"
              disabled={cartCount >= data?.data?.qty && true}
            >
              +
            </button>
          </div>
        </div>
        <ClearIcon className="clearIcon" onClick={handleClear} />
      </div>
    </>
  );
};

export default CartItem;
