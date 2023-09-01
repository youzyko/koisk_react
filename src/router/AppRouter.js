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
import PaymentList from "component/PaymentList";

import {API_BASE_URL} from "../config/host-config";
const AppRouter = () => {
  
  // 배포 환경에서 console.log, console.warn 지우기
  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() { };
    console.warn = function no_console() { };
  }

  const BASE_URL = `${API_BASE_URL}/api`;
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [option, setOption] = useState([]);

  const [tf,setTf]=useState(true);

  //찐 return 
  return (
    <>
    <Header />



        <Routes>
          <Route exact path="/api/item/:menuId" element={<MenuList  />} />
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
          <Route path="/paymentlist" element={<PaymentList />} />
     
        </Routes>

  </>
  );
};

export default AppRouter;
