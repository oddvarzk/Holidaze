import Nav from "../Nav";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between py-2 px-7 bg-tin text-white">
      <div className="mt-2">
        <Link to="/">
          <h3 className="font-Metamorphous text-xl text-amber-100 py-6">
            Holidaze
          </h3>
        </Link>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
