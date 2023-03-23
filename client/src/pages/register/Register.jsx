import "./register.scss";
import { useRef } from "react";
import { isError, useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { mutate, isSuccess, isError, error } = useMutation((user) => {
    return axios.post("/user/register", user);
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      email: emailRef.current?.value,
    };
    mutate(user);
  };

  return (
    <div className="login__container">
      <div className="wrapper">
        <h3 className="login__title">Register</h3>
        <h5 className="login__subtitle">Hi! Welcome to the family 👋</h5>
        <form action="">
          <div className="input__box">
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} type="text" placeholder="Username" />
          </div>
          <div className="input__box">
            <label htmlFor="username">Email</label>
            <input ref={emailRef} type="email" placeholder="Email" />
          </div>
          <div className="input__box">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password..."
            />
          </div>
          <button onClick={handleRegister} className="login__btn">
            Register
          </button>
        </form>
        <p className="bottom__text">
          Already have an account? <span>Login</span>
        </p>
        {/* {isError && <p>{error}</p>} */}
      </div>
    </div>
  );
};

export default Register;
