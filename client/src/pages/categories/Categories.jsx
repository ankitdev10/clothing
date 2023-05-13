import Navbar from "../../components/navbar/Navbar";
import "./cats.scss";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useQuery } from "react-query";
import ProductItem from "../../components/prodtcuItem/ProductItem";
import { useParams } from "react-router-dom";

const Categories = () => {
  const cat = useParams().id;
  console.log(cat);
  const fetchProds = async () => {
    return await axios.get(`/product/category?cat=${cat}`);
  };

  const { data } = useQuery(["fetchByCat-", cat], fetchProds);

  return (
    <div className="categories">
      <Navbar page="p" />
      <div className="cat__product">
        <h3 className="title">{cat}'s Wear</h3>
        <div className="product__wrapper">
          {data?.data.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
