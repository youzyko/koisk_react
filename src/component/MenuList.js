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

import { useNavigate } from "react-router-dom";


const MenuList = ({ props }) => {
  const BASE_URL = "http://localhost:8080/api";
  /*    http://localhost:8080/api/item/1,2,3,.... */
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //전체정보
  const [menuList, setMenuList] = useState({ items: [] });

  const [groupImg, setGroupImg] = useState([]); //이미지 저장

  let menuId = useParams();
  // console.log("useParam",menuId)
  const[menuname,setMenuname] =useState();
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

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

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
  const navigate = useNavigate();

  const optionButton = () => {
    // pass the updated values of 'here' and 'hot' to the '/cart' route
    navigate('/cart', { state: { here, hot,menuname} });
  };



  //옵션
  const [here,setHere]=useState();
  const [hot,setHot]=useState();

  // onchange
  const HereChange =(e)=>{
    setHere({[e.target.name]: e.target.value})
  }
  console.log(here)
  console.log(menuname)

  const HotChange =(e)=>{
    setHot({[e.target.name]: e.target.value})
  }
  console.log(hot)

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
            <Button onClick={()=>{setMenuname(item.itemName); console.log(menuname);
              handleOpen()}}>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {menuname}
              </Typography>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <FormControl>
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
                <br/>
                <FormControl>
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
                <br/>
            
              </Typography>
              <button
                onClick={optionButton
                 /*  if (window.confirm("장바구니로 이동하시겠습니까?")) {
                    optionButton();
                  } */
                }
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
