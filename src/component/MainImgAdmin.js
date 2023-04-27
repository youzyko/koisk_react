import React, { useEffect, useState, useRef } from "react";
//card
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Group } from "@mui/icons-material";

const MainImgAdmin = () => {
  const BASE_URL = "http://localhost:8080/api/image";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //id
  const [id, setId] = useState([]);
  const [img, setImg] = useState([]);

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
        setId(res);
      });
  }, []);
  console.log(id);

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
      <>
        <img src={item} style={{ height: "140px" }}></img>
      </>
    );
  });

  //삭제
  const deleteHandler = (targetId) => {
    fetch(BASE_URL + `/${targetId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setId(res);
      });
  };
  const removeClick = (targetId) => {
    deleteHandler(targetId);
  };

  const mainImgbunch = img.map((item, index) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
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
          <Button size="small" onClick={removeClick}>
            삭제하기
          </Button>
          {/*         <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    );
  });

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
      {mainImgbunch}
    </>
  );
};
export default MainImgAdmin;
