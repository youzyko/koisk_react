import React, { useEffect, useState } from "react";
import Cart from "./Cart";

const SuccessUrl = () => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //카트 전체 정보
  const [option, setOption] = useState([]);
  const [inform, setInform] = useState([]);
  const [payment, setPayment] = useState([]);
  const [tf, setTf] = useState(true);

  //총 가격
  const totalPrice = localStorage.getItem("totalPrice");
  console.log(totalPrice);


  useEffect(() => { //장바구니 정보
    fetch(BASE_URL + "/cart", {
      method: "get",
      /*   headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      }, */
    })
      .then((res) => res.json())
      .then((res) => {
        setOption(res);
      });

  }, []);
 console.log("option: ", option);

  const savePayment = () => { //매출테이블 저장 
    //메뉴 이름만 받아오기
    const cartmenuName = option.map((item) => item.itemName);
    console.log("cartmenuName",cartmenuName)
    const cartTopping = option.map((item) => item.selectedToppingsJson);

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
        console.log(res); //true
        setPayment(res);
        // tlqkf();
        //window.location.href = "/payment";
      });
  };

  useEffect(()=>{
    if(option.length>0){ //장바구니가 비어있지 않고/변동될때만 저장
      setTf(false); 
      savePayment()
    }
    alldoneDelete(); //장바구나 삭제
  
  },[option])

  const alldoneDelete = () => { //장바구니 비우기
    fetch(BASE_URL + "/cart/deleteall", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .then((res) => res.json());

  };

  useEffect(() => {
    if (tf === false) {
      fetch(BASE_URL + "/payment", {
        method: "get",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setInform(res); // 매출 테이블 get
          const orderIdNum = res.map((item) => item.orderId);
          const latestNum = orderIdNum.length > 0 ? Math.max(...orderIdNum) : 0;
          setTf(true); // Set tf to true after setting the inform state
          setTimeout(() => {
            alert(latestNum);
        
          }, 0);
        });
    }
  }, [tf]);
  console.log("inform",inform)

  //진짜 return
  return <>{/* <button onClick={payClick} >추가하기</button> */}</>;
};
export default SuccessUrl;
