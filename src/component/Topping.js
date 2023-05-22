import React, { useEffect, useState } from "react";
const Topping = () => {
    const BASE_URL = "http://localhost:8080/api";
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");


    const[topping,setTopping]=useState([]); //전체토핑 저장

    
    useEffect(()=>{
        fetch(BASE_URL+'/topping',{
            method:'get' ,
            headers: {
                Authorization: "Bearer " + ACCESS_TOKEN,
              }
        })
        .then(res=>res.json())
        .then(res=>{
            setTopping(res)
        })
    },[])
    console.log(topping)
    
    const toppingbunch=topping.map((item)=>{
        return(
            <div>
                {item.toppingName}
            </div>
        )
    })
    console.log(toppingbunch)

    return(
        <>
       
{toppingbunch}
        </>
    )
}
export default Topping;