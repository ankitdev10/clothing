import "./footer.scss";
import Logo from "../../assests/logos/logo-white.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="wrapper">
        <div className="left">
          <img src={Logo} alt="" className="logo" />
          <div className="details">
            <span>Address: Chabahil, Kathamndu, Nepal</span>
            <span>Phone: 988383485</span>
            <span>Email: a@a.com</span>
          </div>
        </div>
        <div className="centre">
          <div className="centre-left">
            <h3>OUR SHOP</h3>
            <div className="buttons">
              <span>About Us</span>
              <span>Contact Us</span>
            </div>
          </div>
          <div className="centre-right">
            <h3>ACCOUNT</h3>
            <div className="buttons">
              <span>My Account</span>
              <span>Shipping Rates</span>
            </div>
          </div>
        </div>

        <div className="right">
          <h3>ABOUT US</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            iusto, omnis eos laudantium, qui optio eligendi dignissimos impedit
            culpa dolorum unde odit officia sapiente perspiciatis minima libero
            ducimus provident voluptatibus nostrum non vel reprehenderit
            deserunt porro similique. Animi, qui perspiciatis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
