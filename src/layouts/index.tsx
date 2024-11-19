import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import unitedKingdomIcon from "../assets/unitedKingdom.svg";
import { Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-tiner gap-5 h-8 px-5 flex justify-end items-center">
        <p className="font-semibold text-paleSand text-sm hover:underline">
          <Link to="/Contact">Contact us</Link>
        </p>
        <div className="flex">
          <img
            src={unitedKingdomIcon}
            alt="United Kingdom Flag Icon"
            className="h-6 w-6"
          />
          <p className="px-2 text-paleSand">EN</p>
        </div>
      </div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
