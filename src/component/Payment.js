import React, { usimpeEffect, useState, useRef, useEffect } from "react";
import { json, Link, useParams } from "react-router-dom";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const Payment = () => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const [option, setOption] = useState([]);
  
  //전체 금액 받아오기
  const totalPrice = localStorage.getItem("totalPrice");
  console.log("totalPrice:",totalPrice);
  const cartmenuName = localStorage.getItem("cartmenuName");
  
  //orderId 랜덤 번호 생성
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  console.log(uuidv4()); 
  const [clientLoaded, setClientLoaded] = useState(false); 
  const clientKey = "test_ck_N5OWRapdA8d2qxRzXmAVo1zEqZKL";
 /*     //카트 전체정보 받아오기
     useEffect(() => {
      if (clientLoaded) {
        fetch(BASE_URL + "/cart", {
          method: "get",
          headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setOption(res);
          })
          .catch((error) => {
            console.error('Failed to fetch options:', error);
          });
      }
    }, [clientLoaded]);
  
    const menuNamelist=option.map((item)=>{
      return item.itemName
    })
  
    console.log("menuNamelist: ", menuNamelist); */
   
 
  /* 시크릿키  test_sk_D4yKeq5bgrp1KYMmwO08GX0lzW6Y */
  loadTossPayments(clientKey).then((tossPayments) => {
    setClientLoaded(true);
    // ------ 결제창 띄우기 ------
    tossPayments
      .requestPayment("카드", {
        // 결제수단 파라미터
        // 결제 정보 파라미터
        // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
        // https://docs.tosspayments.com/reference/js-sdk
        amount: totalPrice, // 결제 금액
        orderId: uuidv4(), // 주문 ID
        orderName: cartmenuName.toString(), // 주문명
        //customerName: '김토스', // 구매자 이름
        successUrl: "http://localhost:3000/success", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        failUrl: "https://docs.tosspayments.com/guides/payment/test-fail", // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
      })
      //http://localhost:3000/success?orderId=03e2c548-2d99-48e4-b6c6-31b2f6714405&paymentKey=pd12AjJexmnRQoOaPz8LEdWgvJ2lBv3y47BMw6vl0gkYqDNE&amount=5000
      //alert("결제가 완료 되었습니다/")
      // ------ 결제창을 띄울 수 없는 에러 처리 ------
      // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
      // 결제창에서 발생할 수 있는 에러를 확인하세요.
      //paymentkey: 4qjZblEopLBa5PzR0ArnjEWkZokGkrvmYnNeDMyW2G1OgwK7
      // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
      // http://localhost:3000/?orderId=aae46028-d690-4585-ae50-bdb7df44dd3b&paymentKey=4qjZblEopLBa5PzR0ArnjEWkZokGkrvmYnNeDMyW2G1OgwK7&amount=5000
      .catch(function (error) {
        if (error.code === "USER_CANCEL") {
          // 결제 고객이 결제창을 닫았을 때 에러 처리
        } else if (error.code === "INVALID_CARD_COMPANY") {
          // 유효하지 않은 카드 코드에 대한 에러 처리
        }
      });
  }, []);



  return <></>;
};
export default Payment;