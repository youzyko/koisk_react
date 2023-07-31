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

/* SEND BUTTON */

/* import Stack from '@mui/material/Stack'; */

import Swal from "sweetalert2";
const AdminItem = () => {
  //관리자페이지 전체조회
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const BASE_URL = "http://localhost:8080/api/item";

  const [id, setId] = useState([]); //ownImgId만 가져오기
  const [Img, setImg] = useState([]); //ownImgId에 해당하는 이미지주소
  const [allinform, setAllInform] = useState([]); //전체 상세 메뉴 정보가 들어가있음

  useEffect(() => {
    //사진을 가져오기위한 ownImgId 가져오기
    fetch(BASE_URL + "/bringownImgId", {
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
  //console.log(id);
  //["5da15029-0c1d-4a2e-839d-4a155817f507", '77041901-ab22-45e4-bf7]
  /* const arrayId=id;
for(let i=0;i<arrayId.length;i++){
  console.log(arrayId[i])
} */
  const bunch = [];
  id.forEach((item) => {
    bunch.push(item);
    // console.log(item)
  });
  // console.log(bunch)

  useEffect(() => {
    /*  bunch.map((Item) => {
      fetch(BASE_URL + "/ownImgId" + `/${Item}`, {
        method: "get",
      })
        .then((res) => res.blob())
        .then((imgData) => {
          const imgUrl = window.URL.createObjectURL(imgData);
         console.log(Item)
         setImg(Img=>[...Img, imgUrl]); 
        });
    });  */
    Promise.all(
      id.map((item) => {
        return fetch(BASE_URL + "/ownImgId" + `/${item}`, {
          method: "get",
        })
          .then((res) => res.blob())
          .then((imgData) => window.URL.createObjectURL(imgData));
      })
    ).then((urls) => {
      setImg(urls);
    });
  }, [id]);
  //  console.log(Img);

  /* id 설정 순서대로 받아옴
 const example=id.map((item)=>{
  return(
   console.log(item)
  )
}) */

  useEffect(() => {
    fetch(BASE_URL + "/allItemInform", {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllInform(res);
      });
  }, []);
  console.log(allinform); //모든 상품불러오기

  const ImgBunch = Img.map((item) => {
    return <img src={item} style={{ width: "50px", height: "50px" }}></img>;
  });

  const modal = (e) => {
    window.location.href = "/itemchange";
  };

  const deleinform = allinform.map((item) => {
    return item.ownImgId;
  });
  console.log(deleinform);

  const remove = (target) => {
    console.log(target.ownImgId);
    fetch(BASE_URL + "/ownImgId" + `/${target.ownImgId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //true
        if (res) {
          const updatedInform = allinform.filter(
            (item) => item.ownImgId !== target.ownImgId
          );
          setAllInform(updatedInform);
        }
      });
  };

  //삭제버튼 클릭
  const removeHandler = (item) => {
    console.log(item.ownImgId);
    remove(item);
  };

  const allItembunch = allinform.map((item, index) => {
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
             
                    Swal.fire({
                      title: "진짜로 삭제하시겠습니까?",
                      //text: "",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "지우기",
                      cancelButtonText: "취소",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          removeHandler(item),
                          "삭제완료!",
                        //  "Your file has been deleted.",
                          //"success"
                        );
                      }
                    })
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar> {ImgBunch[index]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`상품 코드: ${item.itemId} - 상품 이름: ${item.itemName} - 상품 가격: ${item.itemPrice}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
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
        상품 등록 / 삭제 페이지
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
            <Button variant="contained" onClick={modal}>
              상세메뉴 등록하기
            </Button>
          </Stack>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        ></div>
        <div>{allItembunch}</div>
      </div>
    </>
  );
};
export default AdminItem;
