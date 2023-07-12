import React, { useEffect, useState } from "react";
import Cart from "./Cart";

const SuccessUrl = () => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //카트 전체 정보
  const [option, setOption] = useState([]);
  const [inform,setInform]=useState([]);
  const [payment, setPayment] = useState([]);

  //총 가격
  const totalPrice = localStorage.getItem("totalPrice");
  console.log(totalPrice);

  //전체 정보 받아오기
  useEffect(() => {
    fetch(BASE_URL + "/cart", {
      method: "get",
    /*   headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      }, */
    })
      .then((res) => res.json())
      .then((res) => {
        setOption(res);
       /*  savePayment(); */
      });
  }, []);
  console.log("option: ", option);
  

 
  //const cartmenuName = option.map((item) => item.itemName);
  
  const savePayment = () => {
    //메뉴 이름만 받아오기
    const cartmenuName = option.map((item) => item.itemName);
    const cartTopping=option.map((item) => item.selectedToppingsJson);
   
    const items = {
      totalPrice: totalPrice,
      orderNameJson: JSON.stringify(cartmenuName),
      orderTopping: JSON.stringify(cartTopping),
    };
  
    return fetch(BASE_URL + "/payment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: JSON.stringify(items),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setPayment(res);
        //window.location.href = "/payment";
      });
  };

  const alldoneDelete=()=>{
    fetch(BASE_URL+"/cart/deleteall",{
      method:'delete',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .then(res=>res.json())
  }

      //payment정보 불러오기
      useEffect(() => {
        fetch(BASE_URL + "/payment", {
          method: "get",
           headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          }, 
        })
          .then((res) => res.json())
          .then((res) => {
            setInform(res)
           /*  savePayment(); */
          });
      }, []);
    
      console.log("inform: ", inform);

      const orderIdNum=inform.map((item)=>item.orderId);
      console.log(orderIdNum)
       const latestNum =Math.max(...orderIdNum);
console.log("latestNum: ", latestNum);
 
/* let latestNum = null;
for (let i = 0; i < orderIdNum.length; i++) {
  if (latestNum === null || orderIdNum[i] > latestNum) {
    latestNum = orderIdNum[i];
  }
} */
console.log("latestNum: ", latestNum);


  useEffect(() => {
     if (option.length > 0 ) {  
      savePayment();
      localStorage.removeItem('totalPrice');
      localStorage.removeItem('cartmenuName');
      alldoneDelete();
       alert("주문번호는 " + (latestNum)+1); 
       //window.location.href="/"
      }  
  }, [option]);




  //진짜 return
  return <>{/* <button onClick={payClick} >추가하기</button> */}</>;
};
export default SuccessUrl;
