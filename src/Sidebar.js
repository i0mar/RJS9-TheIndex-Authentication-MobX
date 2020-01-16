import React from "react";
import { NavLink, Link } from "react-router-dom";

// Logo
import logo from "./assets/theindex.svg";
import authStore from "./stores/authStore";
import { observer } from "mobx-react";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <img src={logo} className="logo" alt="the index logo" />
      <section>
        <h4 className="menu-item active">
          <NavLink to="/authors">AUTHORS</NavLink>
        </h4>
        <h4 className="menu-item">
          <NavLink to="/books">BOOKS</NavLink>
        </h4>
      </section>
      {!authStore.user ?
      <div>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Signup</button></Link>
      </div> : 
      <div>
        <button onClick={() => authStore.logout()}>Logout {authStore.user.username}</button>
      </div>}
    </div>
  );
};

export default observer(Sidebar);
