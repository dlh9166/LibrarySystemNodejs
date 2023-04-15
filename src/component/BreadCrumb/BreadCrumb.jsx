import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

function Breadcrumb() {
  const location = useLocation();

  const paths = location.pathname.split("/").filter((path) => path !== "");
  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join("/")}`;
    const name = path.charAt(0).toUpperCase() + path.slice(1);
    return (
      <li style={{marginRight: 8}} key={index} className={index === paths.length - 1 ? styles.active : ""}>
        <Link to={url}>{name}</Link>
      </li>
    );
  });

  return (
    <nav className={styles.breadcrumb}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        {breadcrumbs}
      </ul>
    </nav>
  );
}

export default Breadcrumb;