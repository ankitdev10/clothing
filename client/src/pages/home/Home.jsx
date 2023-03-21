import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Banner from "../../components/banner/Banner";
import ProductItem from "../../components/prodtcuItem/ProductItem";
import Testimonial from "../../components/testimonial/Testimonial";
import Footer from "../../components/footer/Footer";
import { useQuery } from "react-query";
import axios from "axios";

const Home = () => {
  const fetchProducts = async () => {
    return await axios.get("/product/all");
  };

  const { data, isLoading, isSuccess, isError } = useQuery(
    "allProds",
    fetchProducts
  );

  return (
    <div className="home">
      <Navbar />
      <Banner />
      <div className="home__product">
        <h3 className="title">New Products</h3>
        <div className="product__wrapper">
          {data?.data.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div className="home__product">
        <h3 className="title title__popular">Popular Products</h3>
        <div className="product__wrapper">
          {data?.data.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
