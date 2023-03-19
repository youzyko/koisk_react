import React from "react";
// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../component/Header";
import MilkTea from "../component/MilkTea";

const AppRouter = () => {


    return (
        <>
        <Header />
        <MilkTea/>
       <Routes> 
      {/*      <Route path="/" element={<BrownSugar />} />  */}
       </Routes>    
   </>
      
    );
};

export default AppRouter;