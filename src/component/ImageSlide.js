import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import Sidebar from "./Sidebar";
/* import {API_BASE_URL} from "../config/host-config"; */
import { API_BASE_URL } from "config/host-config";
//자식컴포넌트
import MenuList from "./MenuList";

//부모 컴포넌트
const ImageSlide = () => {
//  const BASE_URL = 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com:8080/api/image';
  const BASE_URL = `${API_BASE_URL}/api`;
 /*  const BASE_URL = "http://localhost:8080/api"; */
  //const token = localStorage.getItem("ACCESS_TOKEN");
  /* const [backImg,setBackImg]=useState(null); */
  const [group, setGroup] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/bringId`)
      .then((res) => res.json())
      .then((json) => {
        setId(json);
      });
  }, []);

  useEffect(() => {
    id.map((item) => {
      fetch(BASE_URL + `/${item}`)
        .then((res) => {
          if (res.status === 200) {
            return res.blob();
          }
          return setGroup(null);
        })
        .then((imageData) => {
          const imgUrl = window.URL.createObjectURL(imageData);
          console.log(imgUrl);
          setGroup((group) => [...group, imgUrl]);
        });
    });
  }, [id]);
  console.log([...group]);

  const bunch = group.map((item) => {
    return (
      <>
        <SwiperSlide>
          <img
            src={item}
            alt="Blob URL Image"
            style={{  width: "100%", height: "890px" 
      
}}
          />
        </SwiperSlide>
      </>
    );
  });
console.log(BASE_URL)
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {bunch}
      </Swiper>
    </>
  );
};
export default ImageSlide;
