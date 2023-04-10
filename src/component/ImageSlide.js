import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
 import "./styles.css";

const ImageSlide =()=>{

  const BASE_URL = "http://localhost:8080/api/image";
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
  }   );

  const [id,setId]=useState([]);

  useEffect(()=>{
    fetch(`${BASE_URL}/bringId`)
    // ,{
    //   method:"GET",
    //   headers: { 
    //     'Content-type': 'application/json'
    //   }
    // })
    .then(res=>res.json())
    .then(json=>{
      setId(json)
    })
  },[])


/*   const  = id.map((item)=>{
    return(
      <div key={item.id}>
          {item.id}
      </div>
    )
  }) */

  const circulId=id.map((item)=>{
    console.log(item);
    return item;
  })
  console.log(circulId[1])

 /*  console.log(backImg) */
   useEffect(()=>{

    id.map((item)=>{
    fetch(BASE_URL+`/${item}`)
    // ,{
    //   method:"GET",
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    // }
    // })
    .then(res=>{
      if(res.status===200){
        return res.blob();
      }
      return setBackImg(null);
    })
    .then(imageData=>{
      //서버가 보낸 이미지파일 =>url형식으로 변환
      const imgUrl = window.URL.createObjectURL(imageData);
      console.log(imgUrl)
      setBackImg(imgUrl);
    });
  });

  }, [id]);   
  console.log(backImg)






/*   
 useEffect(()=>{
    fetch(BASE_URL,{
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
   */

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
      setBackImg(objectURL);
      
    })
  },[]);  */

  //blob:http://localhost:3000/36bea821-0679-46dc-9a60-f91fa21375bb
  //console.log(mainImg) 

  
/*    useEffect(()=>{
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
  console.log(backImg)  */


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
  }  */
  
  //   const list=backImg.mainImgs.map((item)=>{
  //   return(
  //     <div>
  //       <img src={`${process.env.PUBLIC_URL}`+`${item.mainImg}`}>
  //       </img>
  //       {item.mainImg}
  //     </div>
  //   )
  // })

/* 
  const list=backImg.mainImgs.map((item)=>{
    return(
      <div>
        <img src={`${item.mainImg}`}></img>  
        {item.mainImg} 
      </div>
    )
  }){`${item.mainImg}`}
 console.log(list) */


/*   useEffect(()=>{
  fetch(BASE_URL,{
    method:"get"
  })
  .then(res=>res.blob())
  .then(blob=>{
    const reader=new FileReader();
    reader.onload=()=>{
      const basedata=reader.result;
      console.log(basedata)
      setBackImg(basedata)
    }
    reader.readAsDataURL(blob)
  })
})
 */



    

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


   // console.log(backImg.mainImgs.length);
    console.log(backImg.mainImgs[0])
    return (
        <>
        <div>
 
         <img src={backImg.mainImgs[0].mainImg}></img>  
    {/*  {circulId} */}
        {/*   {imageAll} */}
        {/* <{list} > */}
        {/* <img src ='C:\\profile_upload\\2023\\04\\03\\0cbc9b35-eaf8-4e19-9361-ad5e960bbebb_images (1).jpg'></img> */}
        {/* <img src={`${item.mainImg}`}> */}
  
        </div>
        {/* { backImg.mainImgs[0].mainImg != undefined ?
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
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            
            <SwiperSlide><img src={backImg.mainImgs[0].mainImg} alt="Blob URL Image" /></SwiperSlide>
      
          
          </Swiper> 
          : <></>
    } */}
        </>
    )
}
export default ImageSlide;

