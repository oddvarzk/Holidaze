import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
