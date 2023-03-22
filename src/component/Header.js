import React, { useEffect, useState } from "react";

/* import { ThemeProvider, createTheme } from '@mui/material/styles'; */

const Header = () => {
  

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
          href="/1"
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
          href="/2"
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
          href="/3"
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
          href="/4"
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
          href="/5"
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
