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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import Swal from "sweetalert2";
/* import {API_BASE_URL} from "../config/host-config"; */
/* import { API_BASE_URL } from "config/host-config";
 */
//import { API_BASE_URL } from "config/host-config"; 

const Header = () => {
  const BASE_URL = `http://13.124.149.19:8080/api`;
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
  console.log(headName);

  const menu = headName.items.map((item) => {
    return (
      <div key={item.menuName}>
        {/* {item.menuName} */}

        <Link
          to={`/api/item/${item.menuId}`}
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none" /* ,border:"1px solid white"  */,
            marginLeft: "20px",
          }}
        >
          {item.menuName}
        </Link>
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

  const changemenu = (e) => {
    window.location.href = "/menuchange";
  };
  const changeItem = (e) => {
    window.location.href = "/adminitem";
  };
  const changeMainImg = (e) => {
    window.location.href = "/mainimgchange";
  };
  const changeTopping = (e) => {
    window.location.href = "/topping";
  };
  const paymentList = (e) => {
    window.location.href = "/paymentlist";
  };

  const button = USERNAME ? (
    <>
      <Button color="inherit" onClick={logoutHandler}>
        로그아웃
      </Button>

      {USERNAME == "admin" ? (
        <Button color="inherit" onClick={changemenu}>
          메뉴 등록/삭제
        </Button>
      ) : null}

      {USERNAME == "admin" ? (
        <Button color="inherit" onClick={changeMainImg}>
          메인 이미지 등록/삭제
        </Button>
      ) : null}

      {USERNAME == "admin" ? (
        <Button color="inherit" onClick={changeItem}>
          상품 등록/삭제
        </Button>
      ) : null}

      {USERNAME == "admin" ? (
        <Button color="inherit" onClick={changeTopping}>
          토핑 등록/삭제
        </Button>
      ) : null}

      {USERNAME == "admin" ? (
        <Button color="inherit" onClick={paymentList}>
          매출 조회
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

  function userLabel() {
    if (USERNAME == null) {
      return <p>로그인 후 이용해주세요</p>;
    } else if (USERNAME !== null) {
      return <p style={{ display: "none" }}>{USERNAME}님 환영합니다 </p>;
    }
  }

  const homeIcon = () => {
    fetch(BASE_URL + "/cart/deleteall", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //
      });
    /*   window.confirm("장바구니는 초기화됩니다.")
    window.location.href="/" */
  };

  //진짜 return
  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        border: "1px solid black",
        height:'150px'
      }}
    >
      {button}
      {userLabel()}
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
            paddingBottom: "20px",
          }}
        >
          {menu}
          <div>
            {/*  <ShoppingCartIcon
              onClick={cartIcon}
              sx={{
                fontSize: 40,
                position: "fixed",
                top: 55,
                right: 0,
                marginRight: "20px",
                marginTop: "20px",
                cursor: 'pointer'
              }}
            ></ShoppingCartIcon> */}
            <HomeIcon
              onClick={() => {
                Swal.fire({
                  title: "장바구니는 초기화 됩니다.",
                  //text: "",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "지우기",
                  cancelButtonText: "취소",
                })
               .then((result) => {
                  if (result.isConfirmed) {
                    homeIcon()
                  /*   Swal.fire(homeIcon());
                    window.location.href = "/" */
                    Swal.fire({
                    //  position: 'top-end',
                      icon: 'success',
                      title: '삭제완료',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    setTimeout(() => {
                      window.location.href = "/";
                    }, 1550);
                  }
                }); 
              }}
              sx={{
                fontSize: 40,
                position: "fixed",
                top: 55,
                right: 50,
                marginRight: "20px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            ></HomeIcon>
          </div>
        </div>

        {/*   </nav> */}
      </div>
    </header>
  );
};
export default Header;
