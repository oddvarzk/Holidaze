import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className='bg-tiner h-8 px-5 flex justify-end items-center'>
          <p className='font-semibold text-white text-sm'>Contact</p>
        </div>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
