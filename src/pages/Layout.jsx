import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="nav-container">
      <nav>
        <div className="nav-links">
          <div>
            <Link to="/">
              <img src="src/assets/Logo.png" alt="logo" className="logo"/>
            </Link>
          </div>
          <div>
            <Link to="/chat" className="nav-button">Chat</Link>
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