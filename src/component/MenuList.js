import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
//<<<<<<<<<<<<<<<<노랑밀크티,블랙밀크티(상세Item)...>>>>>>>>>>>>>>>>>>>>
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const MenuList = ({ props }) => {
  const BASE_URL = "http://localhost:8080/api/item";
  /*    http://localhost:8080/api/item/1,2,3,.... */
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //전체정보
  const [menuList, setMenuList] = useState({ items: [] });

  const [groupImg, setGroupImg] = useState([]); //이미지 저장

  let menuId = useParams();
  // console.log("useParam",menuId)

  //해당되는 상세메뉴 받아오기
  useEffect(() => {
    fetch(BASE_URL + "/itemId" + `/${menuId.menuId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        //  console.log(json)
        setMenuList(json);
      });
  }, [menuId]);
  console.log(menuList);

  //ownImgId 받아서 해당되는 이미지 나열
  useEffect(() => {
    Promise.all(
      menuList.items.map((item) => {
        return fetch(BASE_URL + `/ownImgId/${item.ownImgId}`, {
          method: "get",
          headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          },
        })
          .then((res) => res.blob())
          .then((imgData) => window.URL.createObjectURL(imgData));
      })
    ).then((url) => {
      setGroupImg(url);
    });
  }, [menuList]);
  console.log(groupImg);

  const imgBunch = groupImg.map((item) => {
    return(
        <img src={item}></img>
    )
  });



  return (
    <div>
      <h1
        style={{
          textDecorationLine: "underline",
          fontFamily: "Arial, sans-serif",
          fontSize: "32px",
          color: "#333",
          textAlign: "center",
        }}
      >
        메뉴 리스트
      </h1>
       <Grid container spacing={2}>
        {menuList.items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                  {imgBunch[index]}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.itemPrice}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid> 
    </div>
  );
};
export default MenuList;
