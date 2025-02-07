import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex justify-around text-white font-semibold">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link to="/requests" className="hover:underline">Incoming Requests</Link>
        </li>
        <li>
          <Link to="/profile" className="hover:underline">My Profile</Link>
        </li>
      </ul>
    </nav>
  );

};

export default Navbar;
