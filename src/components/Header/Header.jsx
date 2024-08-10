import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../store/reducers/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const state = useSelector((state) => state);
  
  const user = useSelector((state) => state?.user?.userProfile?.body?.firstName);
  console.log(state);

  const handleSignOut = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img className="main-nav-logo-image" src="./images/argentBankLogo.png" alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <div className="main-nav-items">
            <a href="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user}
            </a>
            <div className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </div>
          </div>
        ) : (
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
}

export default Header;
