import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import RegisterForm from "./pages/auth/Register";
import LoginForm from "./pages/auth/Login";
import MyProfile from "./pages/user/myProfile";
import VenueList from "./pages/venues";
import ProtectedRoute from "./components/Utility/ProtectedRoute";
import CreateVenuePage from "./components/Forms/CreateVenuePage/index.tsx";
import UpdateVenuePage from "./pages/venues/updateVenue";
import SingleVenue from "./pages/venues/singleVenue";
import NotFound from "./pages/NotFound.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route path="venues" element={<VenueList />} />
        <Route path="venue/:id" element={<SingleVenue />} />{" "}
        <Route
          path="createVenue"
          element={
            <ProtectedRoute>
              <CreateVenuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateVenue/:id"
          element={
            <ProtectedRoute>
              <UpdateVenuePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
