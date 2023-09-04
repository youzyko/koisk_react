import React, { useEffect, useState } from "react";
import { json, Link, useParams, useHistory } from "react-router-dom";
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
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { API_BASE_URL } from "config/host-config";
const Cart = () => {
 // const BASE_URL = "http://localhost:8080/api";
  const BASE_URL = `${API_BASE_URL}/api`;
 //const BASE_URL = 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com:8080/api';
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  //전체정보 받아오기
  const [option, setOption] = useState([]);

  //이미지
  const [img, setImg] = useState([]);

  //개수
  const [countMap, setCountMap] = useState([]);

  //이름 모음집
  const [payment, setPayment] = useState([]);

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
  console.log("option: ", option);

  //이미지
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
      setImg(url);
    });
  }, [option]);

  const imgBunch = img.map((item) => {
    return <img style={{ width: "100%", height: "100%" }} src={item}></img>;
  });

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
  };

  //수량 +

  const plus = (target) => {
    const selectedItem = target;
    const updatedCountMap = {
      ...countMap,
      [selectedItem]: (countMap[selectedItem] || 1) + 1,
    };

    setCountMap(updatedCountMap);
  };

  //-
  const minus = (target) => {
    const selectedItem = target;
    const updatedCountMap = {
      ...countMap,
      [selectedItem]: (countMap[selectedItem] || 1) - 1,
    };
    setCountMap(updatedCountMap);
  };

  //console.log("countMap: ", countMap);

  //토핑이름.가격
  const toppingMap = option.map((item) => {
    return item.selectedToppings;
  });
  console.log(toppingMap);

  //토핑의 이름만 출력
  const toppingName = option.map((item) => {
    return item.selectedToppingsJson;
  });
  console.log(toppingName);

  //카트에 담긴 메뉴이름
  const cartmenuName = option.map((item) => {
    return item.itemName;
  });
  console.log(cartmenuName);

  const optionMap = option.map((item, index) => {
    const count = countMap[item.random] || 1;
    if (countMap[item.random] <= 0) {
      alert("수량은 최소 1개");
      countMap[item.random] = 1;
    }
    /*   localStorage.setItem("itemName", item.itemName);  */
    return (
      <>
        <ListItemAvatar>
          <Avatar> {imgBunch[index]}</Avatar>
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
              if (window.confirm("진짜로 삭제하시겠습니까?")) {
                removeHandler(item);
              }
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

  //장바구니 초기화
  /*  const deleteAll = () => {
    fetch(BASE_URL + "/cart/deleteall", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //true
        if (res) {
         window.confirm("초기화?")
        } else {
          alert("삭제할 항목이 없습니다. ");
        }
      });
  }; */

  const deleteAll = () => {
    if (window.confirm("초기화?")) {
      //만약 true면
      fetch(BASE_URL + "/cart/deleteall", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setOption([]);
          }
        });
    }
  };

  //결제하기
  const payClick = () => {
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("cartmenuName", cartmenuName);
    window.location.href = "/payment";
  };
  //totalprice 저장 후 /payment로 넘겨주기
  /*  const payClick = () => {
    const item = {
      totalPrice:totalPrice,
      orderNameJson:JSON.stringify(cartmenuName),
      orderTopping:""
    };
    console.log(item.orderNameJson);
  
    fetch(BASE_URL + "/payment", {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: JSON.stringify(item),
      
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
      
        console.log(res);
     
        setPayment(res);

        window.location.href = "/payment";
      })
      .catch(error => {
        console.error(error);
      });
      
  };
  console.log(payment) //true */

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
          height: "calc(100vh - 150px)", // Adjust the height as needed
          overflowY: "auto",
        }}
      >
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
        총합계:{totalPrice}
      </div>
   {/*     <div style={{,position:'fixed'}}></div> */}
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
          width:'246px'
        }}
        class="blink"
        onClick={payClick}
      >
        결제하기
      </button>

      {/*  <button
        style={{
          position: "fixed",
          left: "0",
          padding: "10px 20px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          backgroundColor: "#fff",
          border: "2px solid #333",
          borderRadius: "4px",
        }}
        onClick={() => {
          deleteAll();
        }}
      >
        메뉴 전체 삭제
      </button>  */}
    </div>
    </div>
  );
};
export default Cart;
