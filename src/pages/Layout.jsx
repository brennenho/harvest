import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-button">Landing</Link>
          </li>
          <li>
            <Link to="/chat" className="nav-button">Chat</Link>
          </li>
          <li>
            <Link to="/about" className="nav-button">About</Link>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </>
  )
};