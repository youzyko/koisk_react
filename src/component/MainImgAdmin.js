import React, { useEffect, useState, useRef } from "react";
//card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaceRetouchingNatural, Group } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


const MainImgAdmin = () => {
  const BASE_URL = "http://localhost:8080/api/image";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //id
  const [id, setId] = useState([]);

  //img
  const [img, setImg] = useState([]);

  //전체정보
   const [allinform,setAllInform]=useState([]);
   
   //새로운 이미지파일 
   const [newImg,setNewImg]=useState(null);
  
   //파일
   const $fileInput = useRef();

//id를 다 받아옴
 useEffect(() => {
  fetch(BASE_URL + "/bringId", {
    method: "get",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((res) => {
    //  console.log(res)
      setId(res);
    });
}, []);
console.log(id); 

//전체정보
useEffect(()=>{
  fetch(BASE_URL+"/bringall",{
    method: "get",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  })
  .then((res) => res.json())
  .then((res) => {
    setAllInform(res);
  });
},[])
console.log(allinform) 



//id 받아서 이미지 나열
useEffect(() => {
  Promise.all(
    id.map((item) => {
      return fetch(BASE_URL + `/${item}`, {
        method: "get",
        
      })
        .then((res) => res.blob())
        .then((imgData) => window.URL.createObjectURL(imgData));
    })
  ).then((url) => {
    setImg(url);
  });
}, [id]);

const imglist = img.map((item) => {
  return (
      <img src={item} style={{ height: "140px" }}></img>
  );
});

//삭제
/* const remove=(target)=>{
  //console.log(target.id)
  fetch(BASE_URL+`/${target.id}`,{
    method: 'DELETE',
    headers: { 
      'Authorization': 'Bearer ' + ACCESS_TOKEN 
    },
  })
  .then(res=>res.json())
  .then(res=>{
   // console.log(res) //true
   if (res){
      const updatedInform=allinform.filter(item=>item.id !== target.id);
      console.log(updatedInform)
      setAllInform(updatedInform); 
    } 
  })
  }
  console.log(allinform) */

  const remove = (target) => {
    fetch(BASE_URL + `/${target.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          const updatedInform = allinform.filter(
            (item) => item.id !== target.id
          );
          setAllInform(updatedInform);
  
          // Fetch the updated list of IDs and update the 'id' state
          fetch(BASE_URL + "/bringId", {
            method: "get",
            headers: {
              Authorization: "Bearer " + ACCESS_TOKEN,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              setId(res);
            });
        }
      });
  };
  
  const removeHandler=(item)=>{
   // console.log(item.id)
    //console.log(item)
    remove(item);
  }
  
const mainImgbunch = allinform.map((item, index) => {

  return (
    <Card sx={{ maxWidth: 345 }} style={{marginBottom:"2em", display: 'block',marginLeft: 'auto', marginRight: 'auto'}}>
      {/*    <CardMedia
    
    /> */}
      {imglist[index]}


      {/*     <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent> */}
      <CardActions>
      <Button size="small" onClick={() =>{
        console.log(item)
        if(window.confirm("진짜로 삭제하시겠습니까?")){removeHandler(item)}}}>
          삭제하기
        </Button>
        {/*         <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
});




  //업로드이미지
  const addClickSubmit=(e)=>{
   // e.preventDefault();
    const userFormData = new FormData();
  /*   const userBlob = new Blob([JSON.stringify(allinform)], {
      type: "application/json",
    }); */
    userFormData.append("mainImg", $fileInput.current.files[0]);
    
    fetch(BASE_URL + "/upload", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: userFormData,
    })
    .then((res) => {
      if (res.status === 200) {
        alert("정상적으로 상품등록을 완료했습니다");
        setNewImg(null)
      } else{
        alert("이미지를 등록해주세요");
      }
    })
    .catch((error)=>{
      console.log(error);
  alert("이미지를 등록해주세요");
    })
  }
  const fileClickHandler = (e) => {
    // const $fileInput = document.getElementById('profileImg');
    $fileInput.current.click();
  };

   // 이미지 썸네일 체인지 이벤트
   const showImageHandler = (e) => {
    // 첨부파일의 데이터를 읽어온다.
    const fileData = $fileInput.current.files[0];
    // 첨부파일의 바이트데이터를 읽기 위한 객체
    const reader = new FileReader();
    // 파일 바이트데이터를 img src나 a의 href에 넣기위한
    // 모양으로 바꿔서 로딩해줌
    reader.readAsDataURL(fileData);

    // 첨부파일이 등록되는 순간에 이미지 셋팅
    reader.onloadend = (e) => {
      // 이미지 src 등록
      setNewImg(reader.result);
    };
   
  };
     
  console.log(mainImgbunch)

  return (
    <>
      <h1
        style={{
          textDecorationLine: "underline",
          fontFamily: "Arial, sans-serif",
          fontSize: "32px",
          color: "#333",
          textAlign: "center",
        }}
      >
        메인 이미지 등록 / 삭제 페이지
      </h1>
      <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 5, width: "25ch" },
            
          }}
          noValidate
          autoComplete="off"
          onSubmit={addClickSubmit} 
        >
            <div onClick={fileClickHandler}  style={{margin:'auto'}}>
            <img
              alt="이미지 업로드"
              src={newImg ? newImg : require("../assets/img/image-add.png")} 
              style={{
                maxWidth: "150px",
                maxHeight: "200px",
                
             /*    border: "1px solid black", */
                marginLeft:"2em"
              }}
            ></img>

            <input
              id="itemImg"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={$fileInput}
                onChange={showImageHandler} 
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" /* onClick={backhome} */
            style={{ display: 'block', margin: '20px auto' }}
          >
            상품 추가
          </Button>
          </Box>
{/* 
        <div>
        <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        메인 이미지 등록
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Stack>
    </div> */}
      {mainImgbunch}
      
    
    </>
  );
};
export default MainImgAdmin;
