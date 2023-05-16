import './index.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { useSelector } from "react-redux";
import SignupForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import { Index } from 'pages/Index';


function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/Home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/Signup" element={<SignupForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
