import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../config/host-config";

const SuccessUrl = () => {
  //const BASE_URL = `${API_BASE_URL}/api`;
  const BASE_URL = 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com:8080/api';
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  const navigate = useNavigate();
  //장바구니정보를 가져온다=>거기에서 Max?=> 그냥 제일 큰 값만 추출...
  //하루마다 갱신되는 orderId 

  //장바구니 정보
  const [option, setOption] = useState([]);

  //매출테이블_get
  const [inform, setInform] = useState([]);

  //매출테이블_post
  const [payment, setPayment] = useState([]);

  const [tf, setTf] = useState(true);

  //주문번호(날짜가 바뀌면 리셋을 시켜야하는데)
  const initialOrderId = parseInt(localStorage.getItem("orderId")) || 1;
  const [orderId, setOrderId] = useState(initialOrderId);

  //오늘날짜
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
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
 console.log("option 장바구니: ", option);

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
        localStorage.setItem("orderId", orderId+1);
      });
  };
  //console.log(orderId);


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
    if (option.length>0){ //장바구니가 비어있지 않다면 
      savePayment(); //장바구니 저장 

      Swal.fire({
        icon: 'success',
        title: '주문번호'+[orderId],
      }).then(() => {
        // Redirect to "/topping" after the user clicks "확인" (OK) on the success message
        alldoneDelete()
       window.location.href = "/";
      })
     // alert("주문번호"+orderId)
  }
  }, [option]);
  console.log("inform",inform)

  console.log("currentDate",currentDate)


  useEffect(() => {
    const currentDateStr = new Date().toISOString().slice(0, 10);
    if (currentDate !== currentDateStr) {
      setCurrentDate(currentDateStr);
      setOrderId(1); // Reset orderId to 1 when the date changes
    }
  }, [currentDate]);


  

  //진짜 return
  return <></>;
};
export default SuccessUrl;
