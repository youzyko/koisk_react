import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Cart = () => {
    const BASE_URL = "http://localhost:8080/api";
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const { state } = useLocation();
 
    const hereValue = state?.here;
    const hotValue = state?.hot;
    const menunameValue = state?.menuname;

    console.log(hereValue);
    console.log(hotValue);
    console.log(menunameValue);
    return(
        <div>
            
        </div>
    )
}
export default Cart;