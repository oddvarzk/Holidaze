import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import MyProfile from "./pages/user/myProfile";
import VenueList from "./pages/venues";
import About from "./pages/about";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="venues" element={<VenueList />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
