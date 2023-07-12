import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
 import "swiper/css"; 
import "swiper/css/pagination";
import "swiper/css/navigation";
 import "./styles.css";
 import Sidebar from "./Sidebar";

 //자식컴포넌트
 import MenuList from "./MenuList";
 
 //부모 컴포넌트
const ImageSlide =()=>{
  const BASE_URL = "http://localhost:8080/api/image";
 //const token = localStorage.getItem("ACCESS_TOKEN"); 
  /* const [backImg,setBackImg]=useState(null); */
  const [group,setGroup]=useState([]);
  const [id,setId]=useState([]);

  useEffect(()=>{
    fetch(`${BASE_URL}/bringId`)
    .then(res=>res.json())
    .then(json=>{
      setId(json)
    })
  },[]) 

 //['00f5a659-e731-4788-b74b-aecab00d6c27', 'bbff3a50-2395-4105-b9f0-84eabcf4e647']


   useEffect(()=>{
    id.map((item)=>{
    fetch(BASE_URL+`/${item}`)
    .then(res=>{
      if(res.status===200){
        return res.blob();
      }
      return setGroup(null);
    })
    .then(imageData=>{
      const imgUrl = window.URL.createObjectURL(imageData);
      console.log(imgUrl);
      setGroup(group =>[...group, imgUrl]);
    });
  });
  }, [id]); 
  console.log([...group])

/*   const BASE_URL1 = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  const [option, setOption] = useState([]);
  useEffect(()=>{
    fetch(BASE_URL1 + "/cart", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOption(res);
      });
  },[option])
 */

const bunch =group.map((item)=>{
  return(
    <>
       <SwiperSlide><img src={item} alt="Blob URL Image" style={{ width: '100%', height: '1000px' }}/></SwiperSlide>
  
    </>
  )
})

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
    )
}
export default ImageSlide;

