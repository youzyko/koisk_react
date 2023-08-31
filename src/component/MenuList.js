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
import Sidebar from "./Sidebar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
//리액트 context
import {API_BASE_URL} from "../config/host-config";
const MenuList = ({updateCart}) => {
  const sidebarStyle = {
    position: "fixed",
    top: 300,
    right: 0,
    width: "200px",
    height: "100%",
    backgroundColor: "#f2f2f2",
    padding: "20px",
  };
  const BASE_URL = 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com:8080/api';
  //const BASE_URL = `${API_BASE_URL}/api`;
  /*    http://localhost:8080/api/item/1,2,3,.... */
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const LOGIN_ID = localStorage.getItem("LOGIN_ID");
  console.log("LOGIN_ID",LOGIN_ID)
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
  const [selectedToppings, setSelectedToppings] = useState([]);
  // const [selectedToppingsJson, setselectedToppingsJson] = useState([]);
 const [option, setOption] = useState([]);
 
/*   function onOptionButtonClicked(){
    console.log("onOptionButtonClicked실행 된다")
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
  } */

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
  const [tf,setTf]=useState(true)

  

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
      selectedToppingsJson: JSON.stringify(selectedToppings),
      //selectedToppings:selectedToppings  //[{d:d,sd:sd}]...배열 형태
    };
    console.log(param);
    //if param 값이 없으면 오류

    fetch(BASE_URL + "/cart/incart", {
      method: "post",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        "Content-type": "application/json",
      },
      body: JSON.stringify(param),
    }).then((res) => {
      if (res.status === 400) {
        alert("이미 장바구니에 추가된 메뉴입니다.");
        setOpen(false); //모달 닫기
      } else if (res.status === 500) { 
       // setOpen(true); //modal창 열기
        Swal.fire({
          icon: 'error',
          title: '필수항목을 체크해주세요',
        }).then(() => {
          setOpen(true); // Set the 'open' state back to true after the Swal is closed
        });
 
        //modal
       // alert("필수항목을 체크해주세요.");
       
      } else if (res.status === 200) {
        
        Swal.fire({
         // position: 'top-end',
          icon: 'success',
          title: '장바구니 담기 완료',
          showConfirmButton: false,
          timer: 1500
        })
        // alert("장바구니 추가 완료")
       // param = null;
        setTf(false)
        //param = null
        return res.json(); // Assuming the response contains JSON data
        
      } 
    })

/*     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    }) */
 /*    .then((res)=>{
      console.log(res) //true
    //  updateCart() 
     
     
    
    }) */
    setTf(true)
  };
console.log("장바구니 추가 완료tf",tf)

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
  }, [tf]); 
  console.log("OPTION",option)

const [imgside,setImgside]=useState([])

  useEffect(() => {
    Promise.all(
      option.map((item) => {
        return fetch(BASE_URL + `/cart/${item.random}`, {
          method: "get",
          headers: {
            Authorization: "Bearer " + ACCESS_TOKEN,
          },
        })
          .then((res) => res.blob())
          .then((data) => window.URL.createObjectURL(data));
      })
    ).then((url) => {
      setImgside(url);
    });
  }, [option]);

  const imgBunchSide = imgside.map((item) => {
    return <img style={{ width: "100%", height: "100%" }} src={item}></img>;
  });

  const showshow=option.map((item)=>{
    return item.itemName
  })

  
  console.log("showshow",showshow);


    //삭제 버튼
    const remove = (target) => {
      console.log(target.random);
      fetch(BASE_URL + `/cart/${target.random}`, {
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
              (item) => item.random !== target.random
            );
            setOption(updatedInform);
          }
        });
    };
    const removeHandler = (item) => {
      console.log(item.random);
      remove(item);
console.log("메뉴리스트")   
    };


//=============================================================================

//개수
const [countMap, setCountMap] = useState([]);

//+
const plus = (target) => {
  const selectedItem = target;
  const updatedCountMap = {
    ...countMap,
    [selectedItem]: (countMap[selectedItem] || 1) + 1,
  };
  setCountMap(updatedCountMap);
/*   localStorage.setItem("count",JSON.stringify(countMap));  */
};
console.log("countMap");
  //-
  const minus = (target) => {
    const selectedItem = target;
    const updatedCountMap = {
      ...countMap,
      [selectedItem]: (countMap[selectedItem] || 1) - 1,
    };
    setCountMap(updatedCountMap);
   
  };
  console.log(localStorage.getItem("count"))
  
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(countMap));
  }, [countMap]);

  const optionMap = option.map((item, index) => {
    const count = countMap[item.random] || 1;
    
    if (countMap[item.random] <= 0) {
      Swal.fire({
        icon: 'error',
        title: '수량은 최소 1개 이상입니다.',
      });
      countMap[item.random] = 1;
    } 
  
    return (
      <>
        <ListItemAvatar>
          <Avatar> {imgBunchSide[index]}</Avatar>
        </ListItemAvatar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddCircleOutlineIcon
            style={{ marginRight: "10px" }}
            onClick={() => plus(item.random)}
          />
      {count}
          <RemoveCircleOutlineIcon
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() => minus(item.random)}
          />
          <DeleteIcon
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
          />
        </div>
        <List dense sx={{ width: "250px" }} style={{ display: "flex" }}>
          <div
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography
                  component="span"
                  display="block"
                  variant="body1"
                  color="textPrimary"
                  style={{ textAlign: "center" }}
                >
                  상품 이름: {item.itemName}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    style={{ textAlign: "center" }}
                  >
                    {` 옵션:${item.here}/${item.hot}/${item.ice}/${item.sweetness} `}
                    <br />
                    토핑:
                    {item.selectedToppingsJson ? (
                      <span>
                        {(() => {
                          const topping = JSON.parse(item.selectedToppingsJson);
                          console.log(topping);

                          const toppingnameprice = topping.map((item) => {
                            return `[${item.toppingName}/가격:${item.toppingPrice}]`;
                          });
                          return <>{toppingnameprice}</>;
                        })()}
                      </span>
                    ) : (
                      <span>선택된 토핑 없음</span>
                    )}
                  </Typography>
                </React.Fragment>
              }
            />
          </div>
        </List>
      </>
    );
  });

   //총합계
  const totalPrice = option.reduce((acc, item) => {
    console.log(acc);

    const toppingP = JSON.parse(item.selectedToppingsJson);
    const onlyprice = toppingP.map((item) => {
      return item.toppingPrice;
    });

    console.log(onlyprice);
    const toppingPriceSum = onlyprice.reduce((toppingAcc, toppingPrice) => {
      return toppingAcc + parseInt(toppingPrice, 10);
    }, 0);
    const count = countMap[item.random] || 1;

    return acc + item.itemPrice * count + toppingPriceSum;
  }, 0);
  console.log(totalPrice); 

  //총합계를 통화로 표시하기
  const moneyNum=totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")



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

  const handleListItemClick = (toppingName, toppingPrice) => {
    const newValue = { toppingName, toppingPrice };

    setSelectedToppings((prevState) => {
      // Check if the value already exists in selectedToppings
      const existingIndex = prevState.findIndex(
        (topping) => topping.toppingName === toppingName
      );

      if (existingIndex !== -1) {
        // If the value exists, remove it from selectedToppings
        const updatedToppings = [...prevState];
        updatedToppings.splice(existingIndex, 1);
        return updatedToppings;
      } else {
        // If the value doesn't exist, add it to selectedToppings
        return [...prevState, newValue];
      }
    });
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
                primary={`${item.toppingName} /가격:${item.toppingPrice}원`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </>
    );
  });
   //카트에 담긴 메뉴이름
   const cartmenuName = option.map((item) => {
    return item.itemName;
  });
  console.log(cartmenuName);
  console.log("option",option)

    //결제하기
    const payClick = () => {
    
      if(option.length<1 ){    //장바구니가 비었을때 장치 
        //console.log("장바구니가 비어있습니다. 추가해주세요")
       // alert("장바구니가 비어있습니다. 추가해주세요")
       Swal.fire({
        icon: 'error',
        title: '장바구니가 비어있습니다. 추가해주세요',
       // text: 'Something went wrong!',
       // footer: '<a href="">Why do I have this issue?</a>'
       //timer: 150000
      }) 
       // localStorage.setItem("totalPrice", totalPrice); 
       // localStorage.setItem("cartmenuName", cartmenuName);
      }else if(LOGIN_ID== 'admin'){ //관리자 결제 권한 제한
        //alert("관리자는 결제 권한이 없습니다.")
        Swal.fire({
          icon: 'error',
          title: '관리자는 결제 권한이 없습니다.',
         // text: 'Something went wrong!',
         // footer: '<a href="">Why do I have this issue?</a>'
         //timer: 150000
        }) 
      }
      else{
           localStorage.setItem("totalPrice", totalPrice); 
     localStorage.setItem("cartmenuName", cartmenuName);
      window.location.href = "/payment";
      }
    
  //  localStorage.setItem("totalPrice", totalPrice); 
     // localStorage.setItem("cartmenuName", cartmenuName);
    //  window.location.href = "/payment";
  
    };
    

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
      <Grid container spacing={-30}>
        {menuList.items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
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


     <div style={sidebarStyle}>
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
          fontSize: "20px",
          position: "fixed",
          bottom: "60px",
          right: 0,
          marginRight: "50px",
        }}
      >
       총합계: {moneyNum} 원
      </div>

      <button
        style={{
          position: "fixed",
          bottom: "0",
          left: "87.5%",
          /*   transform: 'translateX(970%)', */
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "transparent",
          /*     border: "none", */
          /*       borderTop:'2px solid black', */
          height: "50px",
          width: "246px",
          cursor:'pointer'
        }}
        class="blink"
        onClick={payClick} 
  
      >
        결제하기
      </button>

      </div>


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
                style={{
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "8px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
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
                onClick={()=>{
                  optionButton()
                  handleClose();

                }

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