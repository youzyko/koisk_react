import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";

import MenuList from "./MenuList";
const Header = () => {
  const BASE_URL = "http://localhost:8080/api";
  const [headName, setHeadName] = useState({ items: [] });


  useEffect(() => {
    fetch(BASE_URL+"/name", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
       /*  console.log(data); */
        setHeadName(data);
      });
  }, []);

  console.log(headName.items);

  const menu = headName.items.map((item) => {
    return <div key={item.menuName}>
      {/* {item.menuName} */}

       <Link to={`/api/item/${item.menuId}`}>{item.menuName}</Link> 
    </div>
    {/* <h2 key={item.menuName}>{item.menuName}</h2> */};
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
           {menu} 
      
         
        </div>

        {/*   </nav> */}
      </div>
    </header>
  );
};
export default Header;
