import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "./config/host-config";
import MilkTea from "./component/MilkTea";
import { json } from "react-router-dom";
export const BASE_URL = API_BASE_URL + "/api/item";

function App() {
  const [msg, setMsg] = useState("");


  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.text())
      .then((data) => setMsg(data))
      .catch((error) => console.log(error));
  }, []); // "GONG CHA에 오신것을 환영합니다. 메뉴를 선택해주세요"



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
       /*  backgroundImage: `url(${require('./images/hoMLazpO2ZnwtRvT_20211221.jpg').default})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center', */
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
        }}
      >
        {msg}
      </h1>
    </div>
  );
}

export default App;
