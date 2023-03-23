import "./dropdown.scss";
import { ManageAccounts, FavoriteBorder } from "@mui/icons-material";

const DropDown = () => {
  return (
    <div className="dropdown__box">
      <div className="wrapper">
        <ul>
          <li>
            <ManageAccounts />
            <span>Account</span>
          </li>
          <li>
            <FavoriteBorder />
            <span>Wishlist</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
