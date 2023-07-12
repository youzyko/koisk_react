import React, { useEffect, useState } from "react";
// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../component/Header";
import Login from "../component/Login";
import MenuList from "../component/MenuList";

import ImageSlide from "../component/ImageSlide";
import Join from "../component/Join";
import MenuChange from "../component/MenuChange";
import ItemChange from "component/ItemChange";
import AdminItem from "../component/AdminItem";
import MainImgAdmin from "component/MainImgAdmin";
/* import Sidebar from "component/Sidebar"; */
import Cart from "component/Cart";
import Topping from "component/Topping";
import AdminTopping from "component/AdminTopping";
import Payment from "component/Payment";
import SuccessUrl from "component/SuccessUrl";
import Sidebar from "component/Sidebar";
/* import Sidebar from '../component/Sidebar'; */
import { useLocation } from 'react-router-dom';

const AppRouter = () => {

  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [option, setOption] = useState([]);

  const [tf,setTf]=useState(true);

  function updateCart(){
    console.log("업데이트카트 실행이다")

      fetch(BASE_URL + "/cart", {
        method: "get",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setOption(res);
          setTf(false)
        });
      console.log("업데이트카트 끝이다")
  
  }
  console.log("업데이트카트 실행이다option",option)

useEffect(()=>{
<Sidebar></Sidebar>
},[tf])
  
  //찐 return 
  return (
    <>
    <Header />

{/*    <Sidebar  ></Sidebar>  */}

        <Routes>
          <Route exact path="/api/item/:menuId" element={<MenuList updateCart={updateCart} />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<ImageSlide />} />
          <Route path="/join" element={<Join />} />
          <Route path="/menuchange" element={<MenuChange />} />
          <Route path="/itemchange" element={<ItemChange />} />
          <Route path="/adminitem" element={<AdminItem />} />
          <Route path="/mainimgchange" element={<MainImgAdmin />} />
          <Route path="/topping" element={<Topping />} />
          <Route path="/admintopping" element={<AdminTopping />} />
          <Route path="/success/*" element={<SuccessUrl />} />
          <Route path="/payment" element={<Payment />} />
       {/*    <Route path="/cart" element={<Cart />} /> */}
        </Routes>
{/*          </div>
</div>  */}
  </>
  );
};

export default AppRouter;
