import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import { ImportExport } from "@mui/icons-material";

const Cart = (props) => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const { state } = useLocation();

  //전체정보 받아오기
  const [option, setOption] = useState([]);

  //이미지
  const [img, setImg] = useState([]);


 

  useEffect(() => {
    fetch(BASE_URL + "/cart", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOption(res);
      });
  }, []);
  console.log(option);

  useEffect(() => {
    Promise.all(
      option.map((item) => {
        return fetch(BASE_URL + `/cart/${item.ownImgId}`, {
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
  }, [option]);

  const imgBunch = img.map((item) => {
    return <img style={{ width: "100%", height: "100%" }} src={item}></img>;
  });

  const optionMap = option.map((item, index) => {
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
                <Avatar> {imgBunch[index]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`상품 이름: ${item.itemName} - 상품 가격:${item.itemPrice}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      display="block"
                      variant="body2"
                      color="textSecondary"
                    >
                      {` 옵션:${item.here}/${item.hot}/${item.ice}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  });
  
  //총합계
  const totalPrice =option.reduce((acc,item)=>{
    return acc+item.itemPrice;
  },0)

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
        장바구니
      </h1>
      총합계:{totalPrice}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        {optionMap}
      </div>
    </div>
  );
};
export default Cart;
