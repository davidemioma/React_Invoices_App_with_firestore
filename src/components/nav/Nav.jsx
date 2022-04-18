import React from "react";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/image-avatar.jpg";
import icon_sun from "../../assets/icon-sun.svg";
import icon_moon from "../../assets/icon-moon.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleTheme } from "../../store/store";
import { auth } from "../../firebase";
import classes from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className={classes.nav}>
      <img className={classes.logo} src={logo} alt="logo" />

      <div className={classes.content}>
        <img
          onClick={() => dispatch(toggleTheme())}
          className={classes.icon}
          src={theme === "dark_mode" ? icon_sun : icon_moon}
          alt="sun"
        />

        <div className={classes.avatar}>
          <img
            onClick={() => auth.signOut()}
            src={currentUser ? currentUser.profileImg : avatar}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
