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
  //전체 금액 받아오기
  const totalPrice = localStorage.getItem("totalPrice");
  console.log(totalPrice);
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

  const clientKey = "test_ck_N5OWRapdA8d2qxRzXmAVo1zEqZKL";
  /* 시크릿키  test_sk_D4yKeq5bgrp1KYMmwO08GX0lzW6Y */
  loadTossPayments(clientKey).then((tossPayments) => {
    // ------ 결제창 띄우기 ------
    tossPayments
      .requestPayment("카드", {
        // 결제수단 파라미터
        // 결제 정보 파라미터
        // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
        // https://docs.tosspayments.com/reference/js-sdk
        amount: totalPrice, // 결제 금액
        orderId: uuidv4(), // 주문 ID
        orderName: "테스트 결제", // 주문명
        //customerName: '김토스', // 구매자 이름
        successUrl: "http://localhost:3000/", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        failUrl: "https://docs.tosspayments.com/guides/payment/test-fail", // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
      })
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

  //인코딩
  const secretKey = "test_sk_D4yKeq5bgrp1KYMmwO08GX0lzW6Y";
  const encodedString = btoa(secretKey);
  console.log(encodedString);
  /*  dGVzdF9za19ENHlLZXE1YmdycDFLWU1td08wOEdYMGx6VzZZ  */

  const axios = require('axios');

  
    /* method: "POST",
    url: "https://api.tosspayments.com/v1/payments/confirm",
    headers: {
      Authorization:
        "Basic dGVzdF9za19ENHlLZXE1YmdycDFLWU1td08wOEdYMGx6VzZZOg==",
      "Content-Type": "application/json",
    },
    data: {
      paymentKey: "4qjZblEopLBa5PzR0ArnjEWkZokGkrvmYnNeDMyW2G1OgwK7",
      amount: totalPrice,
      orderId: uuidv4(),
    }, 
    useEffect(()=>{
      const option={
        meth
      }
    })
  };
  axios(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });*/

  

  return <></>;
};
export default Payment;
