import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/* BASIC SELECT */
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
/* UPLOAD BUTTON */
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
/* SEND BUTTON */
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
/* import Stack from '@mui/material/Stack'; */
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import {API_BASE_URL} from "../config/host-config";

const AdminTopping = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  //const BASE_URL = "http://localhost:8080/api";
  const BASE_URL = `${API_BASE_URL}/api`;
  

  // 검증 완료 여부 상태관리
  const [validate, setValidate] = useState({
    menuId: false,
    toppingName: false,
    toppingPrice: false,
  });

  //파일
  const $fileInput = useRef();
  //파일
  const fileClickHandler = (e) => {
    // const $fileInput = document.getElementById('profileImg');
    $fileInput.current.click();
  };

  //상품이미지
  const [imgFile, setImgFile] = useState(null);

  //저장할 데이터
  const [toppingdata, setToppingdata] = useState({
    menuId: "",
    toppingName: "",
    toppingPrice: "",
  });
  console.log(toppingdata)

  //이미지 썸네일
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
      setImgFile(reader.result);
    };
  };

  
  //menuId(논커피/커피)
  const menuIdhandleChange = (e) => {
    if (!e.target.value) {
        setValidate({ ...validate, menuId: false });
      } else {
        setValidate({ ...validate, menuId: true });
      }
    setToppingdata({ ...toppingdata, menuId: e.target.value });
  };
  
  //toppingName 
  const toppingNameHandler=(e)=>{
    if (!e.target.value) {
        setValidate({ ...validate, toppingName: false });
      } else {
        setValidate({ ...validate, toppingName: true });
      }
    setToppingdata({ ...toppingdata, toppingName: e.target.value });
  }

  //toppingPriceHandler
  const toppingPriceHandler=(e)=>{
    if (!e.target.value) {
        setValidate({ ...validate, toppingPrice: false });
      } else {
        setValidate({ ...validate, toppingPrice: true });
      }

      if(e.target.value<0){ //가격<0 불가
        Swal.fire({
          icon: 'error',
          title: '가격은 0보다 작을 수 없습니다.',
         // text: 'Something went wrong!',
         // footer: '<a href="">Why do I have this issue?</a>'
        })
        setToppingdata({ ...toppingdata, toppingPrice: 0 });
      }else{
        setToppingdata({ ...toppingdata, toppingPrice: e.target.value });
      }

      

  /*   setToppingdata({ ...toppingdata, toppingPrice: e.target.value }); */
  }

  // 상태변수 validate내부값이 모두 true인지 확인
  const isValid = () => {
    for (let key in validate) {
      if (!validate[key]) return false;
    }
    return true;
  };

  //등록 버튼 
  const addClickSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      const userFormData = new FormData();
      const userBlob = new Blob([JSON.stringify(toppingdata)], {
        type: "application/json",
      });
  
      userFormData.append("toppingInfo", userBlob);
      userFormData.append("toppingImg", $fileInput.current.files[0]);
  
      fetch(BASE_URL + "/topping/register", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
        body: userFormData,
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '정상적으로 상품등록을 완료했습니다.',
          }).then(() => {
            // Redirect to "/topping" after the user clicks "확인" (OK) on the success message
            window.location.href = "/topping";
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '중복된 이름이 존재합니다',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '입력란을 다시 확인하세요',
      });
    }
  };

  //진짜 return
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 5, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={addClickSubmit} 
        >
          <div onClick={fileClickHandler}>
            <img
              alt="이미지 업로드"
              src={imgFile ? imgFile : require("../assets/img/image-add.png")}
              style={{
                maxWidth: "150px",
                maxHeight: "200px",
                /*    border: "1px solid black", */
                marginLeft: "2em",
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

          {/* 토핑 아이디(커피/논커피) */}
         <Box sx={{ minWidth: 150, width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">토핑 코드</InputLabel>
              <Select
                labelId="menuId"
                id="menuId"
                value={toppingdata.menuId}
                label="토핑 코드"
                onChange={menuIdhandleChange}
                required
              >
                  <MenuItem value={"논커피"}>논커피</MenuItem>
              <MenuItem value={"커피"}>커피</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/*토핑 이름*/}
          <div>
            <TextField
              id="outlined-basic"
              label="토핑 이름"
              variant="outlined"
              placeholder="토핑 이름"
              required
              name="toppingName"
              value={toppingdata.toppingName}
              onChange={toppingNameHandler}
            />
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="토핑 가격"
              variant="outlined"
              placeholder="토핑 가격"
              required
              name="toppingPrice"
              type="number"
              value={toppingdata.toppingPrice}
              onChange={toppingPriceHandler}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" /* onClick={backhome} */
          >
            상품 추가
          </Button>

        </Box>
      </div>
    </>
  );
};
export default AdminTopping;
