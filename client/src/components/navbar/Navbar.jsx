import { PersonOutline, ShoppingCartOutlined } from "@mui/icons-material";
import "./navbar.scss";
import Logo from "../../assests/logos/logo-white.png";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Cart from "../cart/Cart";
import { cartStore } from "../../store";
import DropDown from "../dropdown/DropDown";

const Navbar = ({ page }) => {
  const { cartItems } = cartStore((state) => state);

  const [color, setColor] = useState(false); // navbar color
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 300) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const showDropDown = () => {
    setOpenCart(false);
    setOpenMenu(!openMenu);
  };

  const showCart = () => {
    setOpenMenu(false);
    setOpenCart(!openCart);
  };
  return (
    <motion.div
      initial={page !== "p" && { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "linear", duration: 1, delay: 1 }}
      className={color ? "navbar color" : "navbar"}
      style={
        page === "p" && {
          background: "black",
          height: 80 + "px",
          padding: "0rem 3rem",
        }
      }
    >
      <div className="navbar__left">
        <Link to="/" className="link">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="navbar__right">
        <span className="nav__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active link" : "inactive link"
            }
          >
            Home
          </NavLink>
        </span>
        <span className="nav__item">
          <NavLink
            to="/categories/men"
            className={({ isActive }) =>
              isActive ? "active link" : "inactive link"
            }
          >
            Men
          </NavLink>
        </span>
        <span className="nav__item">
          <NavLink
            to="/categories/women"
            className={({ isActive }) =>
              isActive ? "active link" : "inactive link"
            }
          >
            Women
          </NavLink>
        </span>
        <span className="nav__item">
          <NavLink
            to="/categories/children"
            className={({ isActive }) =>
              isActive ? "active link" : "inactive link"
            }
          >
            Children
          </NavLink>
        </span>
      </div>
      <div className="navbar__misc">
        <div className="dropdown__container">
          <PersonOutline className="navbar__icon" onClick={showDropDown} />

          {openMenu && (
            <div className="dropdown">
              <DropDown />
            </div>
          )}
        </div>

        <div className="cart__container">
          <div className="cart__icon">
            <ShoppingCartOutlined onClick={showCart} className="navbar__icon" />
            <span className="counter">{cartItems.length}</span>
          </div>
          {openCart && (
            <div className="cart">
              <Cart />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
