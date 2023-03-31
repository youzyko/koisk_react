import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Link,
  } from "@mui/material"; 
const Join=()=>{    
    const BASE_URL = "http://localhost:8080/api";

      // 상태변수 validate내부값이 모두 true인지 확인
  const isValid = () => {
    for (let key in validate) {
      if (!validate[key]) return false;
    }
    return true;
  };

    const [user, setUser] = useState({
        id: "",
        pwd: "",
      });
    
      // 검증 완료 여부 상태관리
      const [validate, setValidate] = useState({
        pwd: false,
        id: false,
      });
      // 검증 메시지 상태관리
      const [msg, setMsg] = useState({
        pwd: "",
        id: "",
      });

    const idHandler = (e) => {
        let message;
        const idRegex = /^[a-zA-Z\s]{2,8}$/; //영문 +띄어쓰기 가능
        if (!e.target.value) {
          message = "아이디는 필수값입니다.";
          setValidate({ ...validate, id: false });
        } else if (!idRegex.test(e.target.value)) {
          message = "2글자에서 8글자 사이의 영어로 입력해주세요.";
          setValidate({ ...validate, id: false });
        } else {
          message = "사용 가능한 이름입니다.";
          setValidate({ ...validate, id: true });
        }
        setMsg({ ...msg, id: message });
        setUser({ ...user, id: e.target.value });
      };

      const passwordHandler = (e) => {
        const pwRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    
        let message;
        if (!e.target.value) {
          message = "비밀번호는 필수값입니다!";
          setValidate({ ...validate, pwd: false });
        } else if (!pwRegex.test(e.target.value)) {
          message = "8자리 이상의 글자,특수문자, 숫자를 포함해주세요!";
          setValidate({ ...validate, pwd: false });
        } else {
          message = "사용할 수 있는 비밀번호입니다!";
          setValidate({ ...validate, pwd: true });
        }
        setMsg({ ...msg, pwd: message });
    
        setUser({ ...user, pwd: e.target.value });
      };

        //회원 가입 처리 이벤트
  const joinHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      const userFormData = new FormData();
      const userBlob = new Blob([JSON.stringify(user)], {
        type: "application/json",
      });

      userFormData.append("userInfo", userBlob);
      

      fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: userFormData,
      }).then((res) => {
        if (res.status === 200) {
          alert("회원가입 축하합니다");
          window.location.href = "/login";
        } else {
          alert("다시 시도해주세요");
        }
      });
    } //if_end
    else {
      alert("입력란 다시 확인");
    }
  };

    return(
        <Container component="main" maxWidth="xs" style={{ marginTop: "180px" }}>
        <form noValidate onSubmit={joinHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
  
              {/*  <Grid item xs={12}>
           <div className="thumbnail-box" onClick={fileClickHandler}>
                <img
                  src={
                    imgFile ? imgFile : require("./assets/img/image-add.png")
                  }
                  alt="프로필 썸네일"
                />
              </div>

            <label className="signup-img-label" htmlFor="profileImg">
                프로필 이미지 추가
              </label> 
  
              <input
                id="profileImg"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={showImageHandler}
                ref={$fileInput}
              />
            </Grid>*/}
  
            {/*username...고경진  */}
           {/*  <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="유저 이름"
                autoFocus
                onChange={nameHandler}
              />
              <span
                style={validate.username ? { color: "green" } : { color: "red" }}
              >
                {msg.username}
              </span>
            </Grid> */}
  
            {/*  아이디... gogo */}
            <Grid item xs={12}>
              <TextField
                autoComplete="id"
                name="id"
                variant="outlined"
                required
                fullWidth
                id="id"
                label="아이디"
                autoFocus
                onChange={idHandler}
              />
              <span style={validate.id ? { color: "green" } : { color: "red" }}>
                {msg.id}
              </span>
            </Grid>
  
           {/*  <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                onChange={emailHandler}
              />
              <span
                style={validate.email ? { color: "green" } : { color: "red" }}
              >
                {msg.email}
              </span> 
            </Grid>*/}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pwd"
                label="패스워드"
                type="password"
                id="pwd"
                autoComplete="current-password"
                onChange={passwordHandler}
              />
              <span style={validate.pwd ? { color: "green" } : { color: "red" }}>
                {msg.pwd}
              </span>
            </Grid>


            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                계정 생성
              </Button>
            </Grid>


          </Grid>


          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 계정이 있습니까? 로그인 하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
}
export default Join;
