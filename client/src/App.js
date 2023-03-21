import { BrowserRouter, Route, Routes } from "react-router-dom";
import Categories from "./pages/categories/Categories";
import Home from "./pages/home/Home";
import Product from "./pages/products/Product";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
function App() {
  const queryClient = new QueryClient();
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
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
