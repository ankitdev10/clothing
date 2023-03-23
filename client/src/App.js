import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./pages/categories/Categories";
import Home from "./pages/home/Home";
import Product from "./pages/products/Product";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/profile/Profile";
import { userStore } from "./store";
function App() {
  const queryClient = new QueryClient();
  const { user } = userStore((state) => state);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories/:id" element={<Categories />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/login" element={!user ? <Login /> : <Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/profile/:userId"
            element={user ? <Profile /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
