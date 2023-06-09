import React, { useEffect, useState, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
//delete
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

//등록하기 버튼
import Stack from "@mui/material/Stack";

/* BASIC SELECT */

/* UPLOAD BUTTON */
import Button from "@mui/material/Button";
import { json } from "react-router-dom";
import { SetMeal } from "@mui/icons-material";

const Topping = () => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  const [topping, setTopping] = useState([]); //전체토핑 저장

  const [img, setImg] = useState([]); // img

  //전체토핑 가져오기
  useEffect(() => {
    fetch(BASE_URL + "/topping", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTopping(res);
      });
  }, []);
  console.log(topping);

  //이미지
  useEffect(() => {
    Promise.all(
      topping.map((item) => {
        return fetch(BASE_URL + `/topping/${item.ownImgId}`, {
          method: "get",
          headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          },
        })
          .then((res) => res.blob())
          .then((data) => window.URL.createObjectURL(data));
      })
    ).then((url) => {
      setImg(url);
    });
  }, [topping]);

  //이미지 map
  const imgBunch = img.map((item) => {
    return <img style={{ width: "100%", height: "100%" }} src={item}></img>;
  });

  const toppingbunch = topping.map((item) => {
    return (
      <div>
        toppingName {item.toppingName}
        <br />
        toppingPrice {item.toppingPrice}
        <br />
        ownImgId {item.ownImgId}
      </div>
    );
  });
  console.log(toppingbunch);

  //삭제
  const remove = (target) => {
    // console.log(target.ownImgId)
    fetch(BASE_URL + `/topping/${target.ownImgId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //true
        if (res) {
          const updatedInform = topping.filter(
            (item) => item.ownImgId !== target.ownImgId
          );
          setTopping(updatedInform);
        }
      });
  };

  //삭제버튼 클릭
  const removeHandler = (item) => {
    console.log(item.ownImgId);
    remove(item);
  };

  const alltopping = topping.map((item, index) => {
    return (
      <>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  if (window.confirm("진짜로 삭제하시겠습니까?")) {
                    removeHandler(item);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{imgBunch[index]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={` 토핑 이름: ${item.toppingName} - 토핑 가격: ${item.toppingPrice}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  });

  //admin페이지
  const registTopping = () => {
    window.location.href = "/admintopping";
  };

  //진짜 return
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
        토핑 등록/ 수정/ 삭제
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={registTopping}>
              토핑 등록하기
            </Button>
          </Stack>
        </div>
        <div>{alltopping}</div>
      </div>
    </>
  );
};
export default Topping;
