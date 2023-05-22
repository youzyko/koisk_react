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

  //삭제 버튼
  const remove = (target) => {
    console.log(target);
    fetch(BASE_URL + `/cart/${target.itemName}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //true
        if (res) {
          const updatedInform = option.filter(
            (item) => item.itemName !== target.itemName
          );
          setOption(updatedInform);
        }
      });
  };
  const removeHandler = (item) => {
    console.log(item.itemName);
    remove(item);
  };


  //수량 +
 
  const plus = (target) => {
    const selectedItem = target;
    const updatedCountMap = {
      ...countMap,
      [selectedItem]: (countMap[selectedItem] || 1) + 1
    };
    
    setCountMap(updatedCountMap);
    };

    
  //-
  const minus = (target) => {
    const selectedItem = target;
    const updatedCountMap = {
      ...countMap,
      [selectedItem]: (countMap[selectedItem] || 1) - 1
    };
    setCountMap(updatedCountMap);
  
  };
  
  console.log(countMap); 

  const optionMap = option.map((item, index) => {
    const count = countMap[item.random] || 1;
     if(countMap[item.random]<=0){
      alert("수량은 최소 1개")
      countMap[item.random]=1
    } 
   
    return (
      <>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          style={{ display: "flex" }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar> {imgBunch[index]}</Avatar>
            </ListItemAvatar>
            <ListItemText
  primary={
    <Typography
      component="span"
      display="block"
      variant="body1"
      color="textPrimary"
      style={{ position: 'relative' }}
    >
      상품 이름: {item.itemName}
      <span
        style={{
         display:'block'
         
        }}
      >  상품 가격:
      {item.itemPrice}</span>
     
    </Typography>
  }
  secondary={
    <React.Fragment>
      <Typography
        component="span"
        display="block"
        variant="body2"
        color="textSecondary"
      >
        {` 옵션:${item.here}/${item.hot}/${item.ice}/${item.sweetness}`}
      </Typography>
    </React.Fragment>
  }
/>
            {/* 개수 */}
          </ListItemButton>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddCircleOutlineIcon style={{ marginRight: "10px" }}  onClick={() => plus(item.random)}  />
            {count}
            <RemoveCircleOutlineIcon
              style={{ marginLeft: "10px", marginRight: "10px" }}  
              onClick={() => minus(item.random)}
            />
            <DeleteIcon
              onClick={() => {
                if (window.confirm("진짜로 삭제하시겠습니까?")) {
                  removeHandler(item);
                }
              }}
            />
          </div>

          {/*     </ListItem> */}
        </List>
      </>
    );
  });

  //총합계
  const totalPrice = option.reduce((acc, item) => {
    const count = countMap[item.random] || 1;
    return acc + (item.itemPrice * count);
  }, 0);

  //장바구니 초기화
  const deleteAll=()=>{
    fetch(BASE_URL+"/cart/deleteall",{
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    }).then(res=>res.json())
    .then(res=>{
      console.log(res) //true 
      if(res){
        if(window.confirm("초기화?")){
          window.location.reload();
        }
        
       
      }else{
        alert("삭제할 항목이 없습니다. ")
      }  
    })
  }

/*   if (res) {
    const updatedInform = option.filter(
      (item) => item.itemName !== target.itemName
    );
    setOption(updatedInform); */
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
        {optionMap}
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
        총합계:{totalPrice}
       
      </div>
      <button style={{position:'fixed',right:'0'}}>결제하기</button>
      <button style={{position:'fixed',left:'0'}}   onClick={() => {
                
                  deleteAll();
             
              }}>메뉴 전체 삭제</button>

    </div>
    
  );
};
export default Cart;