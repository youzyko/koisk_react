import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
//<<<<<<<<<<<<<<<<노랑밀크티,블랙밀크티(상세Item)...>>>>>>>>>>>>>>>>>>>>
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { AltRoute } from "@mui/icons-material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

//리액트 context

const MenuList = () => {
  const BASE_URL = "http://localhost:8080/api";
  /*    http://localhost:8080/api/item/1,2,3,.... */
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //전체정보
  const [menuList, setMenuList] = useState({ items: [] });

  //이미지정보
  const [groupImg, setGroupImg] = useState([]);

  let menuId = useParams();
  //전체정보에서 뽑아온 이름
  const [menuname, setMenuname] = useState();

  //전체정보에서 뽑아온 가격
  const [price, setPrice] = useState();

  //전체정보에서 뽑아온 ownImgId
  const [imgId, setImgid] = useState();

  //전체정보에서 뽑아온 img
  const [img, setImg] = useState();

  //itemid===3 커피
  const [itemid, setItemid] = useState();

  //modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //radio 옵션 값
  const [here, setHere] = useState();
  const [hot, setHot] = useState();
  const [ice, setIce] = useState();
  const [sweetness, setSweetness] = useState();

  //전체 토핑
  const [topping, setTopping] = useState([]);

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

  //토핑 이미지
  const [toppingImg, setToppingImg] = useState([]);
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
      setToppingImg(url);
    });
  }, [topping]);

  const toppingImgbunch = toppingImg.map((item) => {
    return <img style={{ width: "100%", height: "100%" }} src={item}></img>;
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //해당되는 상세메뉴 받아오기
  useEffect(() => {
    fetch(BASE_URL + "/item/itemId" + `/${menuId.menuId}`, {
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
        return fetch(BASE_URL + `/item/ownImgId/${item.ownImgId}`, {
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
    return <img src={item}></img>;
  });

  //장바구니 담기 버튼
  const optionButton = (e) => {
    const param = {
      here: here,
      hot: hot,
      ice: ice,
      itemName: menuname,
      itemPrice: price,
      ownImgId: imgId,
      itemImg: img,
      sweetness: sweetness,
      selectedToppingsJson: selectedToppings,
      //  selectedToppingsJson:selectedToppingsJson  //[{d:d,sd:sd}]...배열 형태
    };

    /* param.selectedToppings=param.selectedToppings.toString() */
    console.log(param);

    fetch(BASE_URL + "/cart/incart", {
      method: "post",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        "Content-type": "application/json",
      },
      body: JSON.stringify(param),
    }).then((res) => {
      console.log(res);
      if (res.status === 400) {
        alert("이미 장바구니에 추가된 메뉴입니다.");
        setOpen(false); //모달 닫기
      } else {
        alert("장바구니 추가 완료");
        // window.location.href = "/cart"; //취소시 페이지 유지
      }
    });
  };

  // radio 옵션값이 변경될 때 onchange
  const HereChange = (e) => {
    setHere(e.target.value);
  };
  console.log(here);

  const HotChange = (e) => {
    setHot(e.target.value);
  };
  console.log(hot);

  const IceChange = (e) => {
    setIce(e.target.value);
  };
  console.log(ice);

  const sweetChange = (e) => {
    setSweetness(e.target.value);
  };
  console.log(sweetness);

  /*   const toppingNameChange = (e) => {
    setToppingName(e.target.value);
  }; */

  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleListItemClick = (toppingName, toppingPrice) => {
    const newValue = { toppingName, toppingPrice };
    setSelectedToppings((prevState) => [...prevState, newValue]);
  };

  console.log("selectedToppings: ", selectedToppings);

  const toppingbumch = topping.map((item, index) => {
    return (
      <>
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem
            key={item.toppingName}
            secondaryAction={<Checkbox edge="end" />}
            disablePadding
            onChange={() =>
              handleListItemClick(item.toppingName, item.toppingPrice)
            }
          >
            <ListItemButton>
              {/*    토핑 사진   */}
              <ListItemAvatar>
                <Avatar>{toppingImgbunch[index]}</Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={`${item.toppingName} - ${item.toppingPrice}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  });

  //진짜 return
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
            <Button
              onClick={() => {
                setMenuname(item.itemName);
                setPrice(item.itemPrice);
                setImgid(item.ownImgId);
                setImg(item.itemImg);
                setItemid(item.itemId);

                //setChecked(item.toppingoption)
                handleOpen();
              }}
            >
              {/*    <Link to={`/api/option/${item.itemName}`} style={{ textDecoration: 'none' }}>   </Link>*/}
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
            </Button>
          </Grid>
        ))}
      </Grid>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {/*   <form
          onSubmit={submitHandler}></form> */}
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {menuname}/{price}원
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    매장/포장
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="포장"
                      control={<Radio />}
                      label="포장"
                      onChange={HereChange}
                    />
                    <FormControlLabel
                      value="매장"
                      control={<Radio />}
                      label="매장"
                      onChange={HereChange}
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    핫/아이스
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="핫"
                      control={<Radio />}
                      label="핫"
                      onChange={HotChange}
                    />
                    <FormControlLabel
                      value="아이스"
                      control={<Radio />}
                      label="아이스"
                      onChange={HotChange}
                    />
                  </RadioGroup>
                </FormControl>
                <br />

                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    얼음양
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="적게"
                      control={<Radio />}
                      label="적게"
                      onChange={IceChange}
                    />
                    <FormControlLabel
                      value="중간"
                      control={<Radio />}
                      label="중간"
                      onChange={IceChange}
                    />
                    <FormControlLabel
                      value="많이"
                      control={<Radio />}
                      label="많이"
                      onChange={IceChange}
                    />
                  </RadioGroup>
                </FormControl>
                <br />

                {/* 당도  커피id는 무조건 3*/}
                {itemid === 3 ? (
                  <FormControl disabled>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      당도
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="안달게"
                        control={<Radio />}
                        label="안달게"
                        onChange={sweetChange}
                      />
                      <FormControlLabel
                        value="중간"
                        control={<Radio />}
                        label="중간"
                        onChange={sweetChange}
                      />
                      <FormControlLabel
                        value="달게"
                        control={<Radio />}
                        label="달게"
                        onChange={sweetChange}
                      />
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <FormControl required>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      당도
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="안달게"
                        control={<Radio />}
                        label="안달게"
                        onChange={sweetChange}
                      />
                      <FormControlLabel
                        value="중간"
                        control={<Radio />}
                        label="중간"
                        onChange={sweetChange}
                      />
                      <FormControlLabel
                        value="달게"
                        control={<Radio />}
                        label="달게"
                        onChange={sweetChange}
                      />
                    </RadioGroup>
                  </FormControl>
                )}
                <br />

                <FormControl required>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    토핑
                  </FormLabel>
                  {toppingbumch}
                </FormControl>
              </Typography>

              <button
                onClick={() => {
                  /*  if(window.confirm(`장바구니로 이동하시겠습니까?`)){ } */
                  optionButton();
                }}
              >
                장바구니 담기
              </button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default MenuList;
