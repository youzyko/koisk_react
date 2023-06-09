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

const ItemChange = () => {
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const BASE_URL = "http://localhost:8080/api/item";
  /* @PostMapping("/register") */

  // 검증 완료 여부 상태관리
  const [validate, setValidate] = useState({
    itemId: true,
    itemName: false,
    itemPrice: false,
    status: true,
  });

  // 상태변수 validate내부값이 모두 true인지 확인
  const isValid = () => {
    for (let key in validate) {
      if (!validate[key]) return false;
    }
    return true;
  };

  /* 파일 */
  const $fileInput = useRef();

  const [data, setData] = useState({
    itemId: "",
    itemName: "",
    itemPrice: "",
    status: "",
  }); //상품정보

  const addClickSubmit = (e) => {
    //업로드 처리 이벤트
    e.preventDefault();
    if (isValid()) {
      const userFormData = new FormData();
      const userBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      userFormData.append("itemInfo", userBlob);
      userFormData.append("itemImg", $fileInput.current.files[0]);

      fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
        body: userFormData,
      }).then((res) => {
        if (res.status === 200) {
          alert("정상적으로 상품등록을 완료했습니다");
          window.location.href = "/adminitem";
        } else {
          alert("입력란을 다시 확인하세요");
        }
      });
    } else {
      alert("서버 오류");
    }
    /*     const userFormData = new FormData();
    const userBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    userFormData.append("itemInfo", userBlob);
    userFormData.append("itemImg", $fileInput.current.files[0]);
    fetch(BASE_URL + "/register", {
      method: "POST",
    headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: userFormData,
    })
      .then((res) => /*  res.json() {
        if(res.status===200){
          return res.json();
        }else{
          alert("qlszks")
        }
      })
      .then((json) => {
        console.log(json);
      }); */
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
      setImgFile(reader.result);
    };
  };

  const fileClickHandler = (e) => {
    // const $fileInput = document.getElementById('profileImg');
    $fileInput.current.click();
  };

  const [imgFile, setImgFile] = useState(null); //상품이미지

  console.log(data);

  //get-only-menu-id
  const [onlyId, setOnlyId] = useState([]);
  useEffect(() => {
    fetch(BASE_URL + "/onlymenuId", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOnlyId(res);
      });
  }, []);
  console.log(onlyId);

  //forEach로 적용 안됨
  const getonlyId = onlyId.map((item) => {
    return item.menuId;
  });
  console.log(getonlyId);

  const itemIdHandler = (e) => {
    setData({ ...data, itemId: e.target.value });
  };

  const itemNameHandler = (e) => {
    //상품이름
    if (!e.target.value) {
      setValidate({ ...validate, itemName: false });
    } else {
      setValidate({ ...validate, itemName: true });
    }
    setData({ ...data, itemName: e.target.value });
  };

  const itemPriceHandler = (e) => {
    //상품가격
    if (!e.target.value) {
      setValidate({ ...validate, itemPrice: false });
    } else {
      setValidate({ ...validate, itemPrice: true });
    }

    setData({ ...data, itemPrice: e.target.value });
  };
  const statusHandler = (e) => {
    //재고상태
    setData({ ...data, status: e.target.value });
  };
  /* const backhome=(e)=>{
  window.location.href = "/adminitem";
} */

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

          {/*       <div>
      <TextField id="outlined-basic" label="상품코드" variant="outlined" placeholder="상품코드" required
         value={data.itemId}
       name="itemId"
       onChange={itemIdHandler}
      />
      </div>
    */}

          <Box sx={{ minWidth: 150, width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">상품 코드</InputLabel>
              <Select
                labelId="itemId"
                id="itemId"
                value={data.itemId}
                label="itemId"
                onChange={itemIdHandler}
                required
              >
                {getonlyId.map((menuId) => (
                  <MenuItem key={menuId} value={menuId}>
                    {menuId}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <div>
            <TextField
              id="outlined-basic"
              label="상품이름"
              variant="outlined"
              placeholder="상품이름"
              required
              name="itemName"
              value={data.itemName}
              onChange={itemNameHandler}
            />
          </div>

          <div>
            <TextField
              id="outlined-basic"
              label="상품가격"
              variant="outlined"
              placeholder="상품가격"
              required
              name="itemPrice"
              value={data.itemPrice}
              onChange={itemPriceHandler}
            />
          </div>

          <Box sx={{ minWidth: 150, width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">재고 상태</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={data.status}
                label="status"
                onChange={statusHandler}
                required
              >
                <MenuItem value={"true"}>판매중</MenuItem>
                <MenuItem value={"false"}>품절</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
export default ItemChange;
