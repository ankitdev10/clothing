import "./banner.scss";
import BannerImg from "../../assests/banner.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ ease: "easeIn", duration: 1 }}
      className="banner"
    >
      <div className="banner__wrapper">
        <motion.div className="left">20% off on every item!</motion.div>
        <div className="center__img">
          <img src={BannerImg} alt="" className="banner__img" />
        </div>
        <div className="right__btn">
          <button className="btn">Shop now</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
