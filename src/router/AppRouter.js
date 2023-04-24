import React from "react";
// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../component/Header";
 import Login from "../component/Login"; 
import MenuList from "../component/MenuList";
import Option from "../component/Option";
import ImageSlide from "../component/ImageSlide";
import Join from "../component/Join";
import MenuChange from "../component/MenuChange";
/* import ItemChange from "component/ItemChange"; */
import AdminItem from "../component/AdminItem";
const AppRouter = () => {

    return (
     <>
        <Header />
       <Routes>   {/* 
        <Route path="/menuList" element={<MenuList />} /> */}
      {/*   <Route exact path="/" element={<App />} /> */}
        <Route exact path="/api/item/:menuId" element={<MenuList />} />  
        <Route exact path="/api/option/:menuId" element={<Option />} />
      <Route  path="/login" element={<Login />} /> 
      <Route    exact path="/" element={<ImageSlide />} /> 
      <Route  path="/join" element={<Join />} /> 
   <Route  path="/menuchange" element={<MenuChange />} />  
{/*    <Route  path="/itemchange" element={<ItemChange />} />   */}
<Route  path="/adminitem" element={< AdminItem/>} />  
       </Routes>     
       </>
    );
};

export default AppRouter;