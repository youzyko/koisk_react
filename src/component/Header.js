import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material"; 
const Header = () => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [headName, setHeadName] = useState({ items: [] });
  const USERNAME = localStorage.getItem("LOGIN_ID");

  useEffect(() => {
    fetch(BASE_URL + "/name", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        /*  console.log(data); */
        setHeadName(data);
      });
  }, []);
  console.log(headName.items);

  const menu = headName.items.map((item) => {
    return (
      <div key={item.menuName}>
        {/* {item.menuName} */}

        <Link to={`/api/item/${item.menuId}`} style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none'/* ,border:"1px solid white"  */,marginLeft:"20px" }}>{item.menuName}</Link>
      </div>
    );
    {
      /* <h2 key={item.menuName}>{item.menuName}</h2> */
    }
  });
  const logoutHandler = (e) => {
    //로컬스토리지 데이터 제거
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("LOGIN_ID");
    window.location.href = "/";
  };

  const changemenu=e=>{
    window.location.href = "/mainImg";
  };
  const button = USERNAME ? (
    <>
    <Button color="inherit" onClick={logoutHandler}>
      로그아웃
    </Button>

    {USERNAME=="admin" ? (
      <Button color="inherit" onClick={changemenu}>
        메뉴 수정
      </Button>
    ) : null}

{USERNAME=="admin" ? (
      <Button color="inherit" onClick={changemenu}>
         메인 이미지 수정
       
      </Button>
    ) : null}


    </>
  ) : (
    <>
      <Link
        to="/login"
        style={{ color: "#fff", marginRight: 20, textDecoration: "none" }}
      >
        로그인
      </Link>

      <Link to="/join" style={{ color: "#fff", textDecoration: "none" }}>
        회원가입
      </Link>
    </>
  );



  function userLabel(){
    if(USERNAME==null){
        return <p>로그인 후 이용해주세요</p>
    }else if(USERNAME!==null){
      return <p style={{display:"none"}}>{USERNAME}님 환영합니다 </p>
    }
   
  };

  

  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        border: "1px solid black",
      }}
    > {button}
       {userLabel()}
      <div style={{ display: "flex", alignItems: "center" }}>

        <a href="/">
          <img
            src={require("../images/gongcha_logo.png")}
            alt="logo"
            className="brand-logo"
            style={{ width: 45 }}
          />
        </a>

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
            paddingBottom:"20px"
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
