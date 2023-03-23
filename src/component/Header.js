import React, { useEffect, useReducer, useState } from "react";

const Header = () => {
  const BASE_URL = "http://localhost:8080/api/name";
  const [headName, setHeadName] = useState({ items: [] });

  useEffect(() => {
    fetch(BASE_URL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHeadName(data);
      });
  }, []);

  console.log(headName.items);

  const menu = headName.items.map((item) => {
    return <h2 key={item.menuName}>{item.menuName}</h2>;
  });

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
              display: "inherit",
            }}
          >
            {menu}
          </a>
        </nav>
      </div>
    </header>
  );
};
export default Header;
