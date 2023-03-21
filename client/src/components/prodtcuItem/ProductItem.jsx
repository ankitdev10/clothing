import "./productItem.scss";
import { FavoriteBorder, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { cartStore } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductItem = ({ item }) => {
  const { cartItems, addCartItem } = cartStore((state) => state);

  // ADD ITEM TO CART

  const addItem = () => {
    if (!cartItems.includes(item._id)) {
      addCartItem(item._id);
      toast.success("Item added to your cart", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div className="card">
        <div className="card__top">
          <img src={item?.imgUrl} alt="" />

          <div className="hover__container">
            <FavoriteBorder className="hover__icon" />
            <Link to={`/product/${item._id}`} className="link">
              <Visibility className="hover__icon" />
            </Link>
          </div>
        </div>
        <Link to={`/product/${item._id}`} className="link">
          <div className="card__info">{item?.desc}</div>
          <div className="card__price">Rs {item?.price}</div>
        </Link>

        <button type="button" onClick={addItem} className="cart__btn">
          Add to cart →
        </button>
      </div>
    </>
  );
};

export default ProductItem;
