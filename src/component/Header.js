import React, { useEffect, useState } from "react";

/* import { ThemeProvider, createTheme } from '@mui/material/styles'; */

const Header = () => {
  const [headMenu, setHeadMenu] = useState(null);

  return (
    <header style={{ backgroundColor: "#333", color: "#fff", padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../images/gongcha_logo.png")}
          alt="logo"
          className="brand-logo"
          style={{ width: 45 }}
        />
        <h1
          style={{
            fontSize: "36px",
            marginLeft: "10px",
            paddingBottom: "20px",
          }}
        >
          GONG CHA
        </h1>
      </div>

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <a
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          MilkTea
        </a>
        <a
          href="/about"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          BrownSugar
        </a>
        <a
          href="/contact"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          ChaiTea
        </a>
        <a
          href="/contact"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Smoothie
        </a>
        <a
          href="/contact"
          style={{
            color: "#fff",
            textDecoration: "none",
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Coffee
        </a>
      </nav>
    </header>
  );
};
export default Header;
