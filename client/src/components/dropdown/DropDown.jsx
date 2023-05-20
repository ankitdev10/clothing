import "./dropdown.scss";
import {
  ManageAccounts,
  FavoriteBorder,
  Logout,
  Login,
} from "@mui/icons-material";
import { userStore } from "../../store";
import { Link } from "react-router-dom";

const DropDown = () => {
  const { user } = userStore((state) => state);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="dropdown__box">
      <div className="wrapper">
        <ul>
          <Link to={user ? `/profile/${user._id}` : "/login"} className="link">
            <li>
              <ManageAccounts />
              <span>Account</span>
            </li>
          </Link>
          <Link className="link" to={user ? `/wishlist/${user._id}` : "/login"}>
            <li>
              <FavoriteBorder />
              <span>Wishlist</span>
            </li>
          </Link>
          {user ? (
            <li onClick={handleLogout}>
              <Logout />
              <span>Logout</span>
            </li>
          ) : (
            <Link to="/login" className="link">
              <li>
                <Login /> <span>Login</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
