import { Outlet, Link } from "react-router-dom";
import banner from "../assets/banner.png";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="nav-container">
      <nav>
        <div className="nav-links">
          <div>
            <Link to="/landing">
              <img src={banner} alt="logo" className="logo"/>
            </Link>
          </div>
          <div>
            <Link to="/" className="nav-button">Chat</Link>
          </div>
          <div>
            <Link to="/about" className="nav-button">About</Link>
          </div>
        </div>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  )
};