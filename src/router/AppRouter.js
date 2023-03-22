import React from "react";
// 라우팅에 사용할 라이브러리
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../component/Header";
import MilkTea from "../component/MilkTea";
import BrownSugar from "../component/BrownSugar";
import ChaiTea from "../component/ChaiTea";
import Smoothie from "../component/Smoothie";
import Coffee from "../component/Coffee";
import Option from "../component/Option";
const AppRouter = () => {


    return (
        <>
        <Header />

       <Routes> 
            <Route path="/" element={<App />} />  
            <Route path="/1" element={<MilkTea />} />  
            <Route path="/2" element={<BrownSugar />} />   
            <Route path="/3" element={<ChaiTea />} /> 
            <Route path="/4" element={<Smoothie/>} /> 
            <Route path="/5" element={<Coffee />} />  
            {/* <Route path="/option/1" element={<Option />} />   */}
       </Routes>    
   </>
      
    );
};

export default AppRouter;