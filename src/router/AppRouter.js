import React from "react";
// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../component/Header";
import MenuList from "../component/MenuList";
import Option from "../component/Option";
const AppRouter = () => {

    return (
     <>
        <Header />
       <Routes>   {/* 
        <Route path="/menuList" element={<MenuList />} /> */}
        <Route exact path="/" element={<App />} />
        <Route exact path="/api/item/:menuId" element={<MenuList />} />  
        <Route exact path="/option" element={<Option />} />
       </Routes>     
       </>
    );
};

export default AppRouter;