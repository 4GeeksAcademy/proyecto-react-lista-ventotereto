
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <strong>Mi Agenda</strong>
        </Link>
      </div>
    </nav>
  );
};