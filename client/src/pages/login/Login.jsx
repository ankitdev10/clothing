import { useRef } from "react";
import "./login.scss";
import { useMutation } from "react-query";
import axios from "axios";
import { userStore } from "../../store";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { user: loggedUser, saveUser } = userStore((state) => state);

  const { mutate, isSuccess } = useMutation(
    (user) => {
      return axios.post("/user/login", user);
    },
    {
      onSuccess: (data) => {
        saveUser(data.data);
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    mutate(user);
  };

  return (
    <div className="login__container">
      <div className="wrapper">
        <h3 className="login__title">Login</h3>
        <h5 className="login__subtitle">Hi! Welcome Back 👋</h5>
        <form action="">
          <div className="input__box">
            <label htmlFor="username">Email</label>
            <input ref={usernameRef} type="text" placeholder="Username" />
          </div>
          <div className="input__box">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password..."
            />
          </div>
          <button onClick={handleLogin} className="login__btn">
            Login
          </button>
        </form>
        <p className="bottom__text">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
