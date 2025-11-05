import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";

const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      setAuthUser(result);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Task Manager
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              {authUser && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/taskForm">
                      Add Form
                    </NavLink>
                  </li>
                 
                </>
              )}
             
              {!authUser && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            
            {authUser && (
              <div className="d-flex">
                <span className="navbar-text me-3">
                  Welcome, {authUser.email}
                </span>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => auth.signOut()}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;