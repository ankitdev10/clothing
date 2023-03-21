import Navbar from "../../components/navbar/Navbar";
import "./product.scss";
import Dress from "../../assests/dress1.webp";
import Footer from "../../components/footer/Footer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Favorite } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const Product = () => {
  const [count, setCount] = useState(1);

  const hanldeCount = (type) => {
    type === "i" ? setCount((prev) => prev + 1) : setCount((prev) => prev - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const id = useParams().id;

  const getProd = async () => {
    return await axios.get(`/product/single/${id}`);
  };

  const { data, isLoading } = useQuery("singleProduct", getProd);

  return (
    <div className="product">
      <Navbar page="p" />
      <div className="product__container">
        <div className="wrapper">
          <div className="left">
            <img className="hero__img" src={data?.data.imgUrl} alt="" />

            <div className="other__images">
              <img src={Dress} className="small__img" alt="" />
              <img src={Dress} className="small__img" alt="" />
              <img src={Dress} className="small__img" alt="" />
            </div>
          </div>
          <div className="right">
            <h3>{data?.data.title}</h3>
            <p className="price">Rs {data?.data.price}</p>
            <hr />
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sunt
              enim at doloremque sequi molestiae aliquid consequuntur recusandae
              eum mollitia nostrum cum, tempore perspiciatis aperiam. Animi
              minima a eligendi ipsam rerum aliquam maiores tempora quae. Ad
              explicabo, veniam fugiat commodi saepe, praesentium doloremque
              eius aliquid illum minus quam et facere.
            </p>
            <div className="cart">
              <div className="counter">
                <button
                  onClick={() => hanldeCount("d")}
                  className="counter__btn increment"
                  disabled={count <= 1 && true}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={() => hanldeCount("i")}
                  className="counter__btn decrement"
                >
                  +
                </button>
              </div>
              <button className="add__to__cart">
                <AddShoppingCartIcon /> ADD TO CART
              </button>
              <button className="wishlist__btn">
                <Favorite className="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
