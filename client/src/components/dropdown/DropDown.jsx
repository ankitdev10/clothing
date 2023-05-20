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
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("user");
    location.reload();
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
          <li>
            <FavoriteBorder />
            <span>Wishlist</span>
          </li>
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
