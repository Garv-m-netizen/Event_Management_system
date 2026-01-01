import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-slate-900 text-white">
      <Link to="/" className="text-xl font-bold">
        SummitSync
      </Link>

      <ul className="flex gap-8 text-sm">
        <li>
          <Link to="/" className="hover:text-green-400">
            Events
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-green-400">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-green-400">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
