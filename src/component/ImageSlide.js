import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
 import "./styles.css";

const ImageSlide =()=>{

  const BASE_URL = "http://localhost:8080/api";
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [backImg,setBackImg]=useState(
     {
 count:"",
   mainImgs:[
    {
      id:"",
      mainImg:""
    }
   ]
  } );

  
  useEffect(()=>{
    fetch(BASE_URL+"/image/backgroung",{
      method:"get"
    })
    .then(res=>res.blob())
    .then(img=>{
      const imgUrl = window.URL.createObjectURL(img);
      Image.src=imgUrl;
      setBackImg(imgUrl);
      }
    )
  },[])
  console.log(backImg)
  


/*   
 useEffect(()=>{
    fetch(BASE_URL+"/image",{
      method:"GET",
    })
    .then(res=>{
      if(res.status===200){
        return res.blob();
      }
    })
    .then(imageData=>{
      //Blob 객체를 url로 만들때
      //const imgUrl=window.URL.createObjectURL(imageData);
      const objectURL = URL.createObjectURL(imageData);
      let myImage = document.getElementById('mainImg');
      myImage.src=objectURL;
      setMainImg(objectURL);
      
    })
  },[]); */
  //blob:http://localhost:3000/36bea821-0679-46dc-9a60-f91fa21375bb
  //console.log(mainImg) 

/*   
   useEffect(()=>{
    fetch(BASE_URL+"/image/backgroung",{
      method:"get",
    })
    .then(res=>res.blob())
    .then(data=>{
      const imgUrl=URL.createObjectURL(data);
      setBackImg(imgUrl)
    }
    )
  },[]) 
  console.log(backImg) */


/* 
  let imageAll;
  for(let key in backImg){
    imageAll=backImg[key].map(item=>{
      return(
        <div>
          {item.mainImg}
        </div>
      )
    })
  } */
/*   const list=backImg.mainImgs.map((item)=>{
    return(
      <div>
        {item.mainImg}
      </div>
    )
  })
 */

 {/*  const list=backImg.mainImgs.map((item)=>{
    return(
      <div>
        <img src={`${item.mainImg}`}></img>  
        {item.mainImg} 
      </div>
    )
  })
 console.log(list)
 */}

/*  useEffect(()=>{
  fetch(BASE_URL+"/image/backgroung",{
    method:"get"
  })
  .then(res=>res.blob())
  .then(blob=>{
    const reader=new FileReader();
    reader.onload=()=>{
      const basedata=reader.result;
      console.log(basedata)
    }
    reader.readAsDataURL(blob)
  })
})*/



    

 /*    function readFile(input){
      const fr=new FileReader();

      fr.readAsDataURL(input);

      fr.addEventListener('load',()=>{
        const res=fr.result;
        console.log(res)
      })
    } */
    //console.log(blob)
    //Blob {size: 332, type: 'application/json'}



    return (
        <>
        <div>
          <img src={backImg}></img>
        {/*   {imageAll} */}
         {/*  {list} */}
        </div>
         {/*  <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide><img src="" alt="Blob URL Image" /></SwiperSlide>
           
          </Swiper> */}
        </>
    )
}
export default ImageSlide;

