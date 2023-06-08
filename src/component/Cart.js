
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
import { ConnectedTvOutlined, ImportExport } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Cart = (props) => {
  const BASE_URL = "http://localhost:8080/api";
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");


  //전체정보 받아오기
  const [option, setOption] = useState([]);

  //이미지
  const [img, setImg] = useState([]);


  //개수
  const [countMap, setCountMap] = useState([]);

  useEffect(() => {
    fetch(BASE_URL + "/cart", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
     .then((res)=>{

    setOption(res)
     })
  }, []);
  console.log("option: ",option);


  //찐return
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
      
      </div>
      <div
        style={{
          fontSize: 30,
          position: "fixed",
          top: 600,
          right: 0,
          marginRight: "20px",
          marginTop: "20px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
    
       
      </div>
    

    </div>
    
  );
};
export default Cart;