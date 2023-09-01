import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { json, Link, useParams } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
//import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DataGrid } from "@mui/x-data-grid";

import TextField from "@mui/material/TextField";
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
import { API_BASE_URL } from "config/host-config";
const PaymentList = () => {
 const BASE_URL = `${API_BASE_URL}/api`;
//  const BASE_URL = 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com:8080/api';
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  // 현재 날짜/시간
  const today = new Date();

  // "/payment_get"
  const [payInform, setPayInform] = useState([]);
  // 특정 매출 조회하기
  const [searchpay, setSearchpay] = useState([]);
  // 검색한 승인번호
  const [ordercard, setOrdercard] = useState([]);
  // 승인번호로 출력한 승인번호
  const [oneordercard, setOneordercard] = useState([]);

  const [startdate, setSartdate] = useState(); // 시작날
  const [enddate, setEnddate] = useState(); // 끝날

  const containerStyle = {
    /* display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh", */
    marginLeft: "650px",
    border: "1px solid black",
  };

  useEffect(() => {
    fetch(BASE_URL + "/payment", {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => setPayInform(res));
  }, []);

  const [selectedDateRange, setSelectedDateRange] = useState([
    dayjs(today), // 시작날
    dayjs(today), // 끝날
  ]);

  const startChnage = (newDateRange) => {
    setSelectedDateRange(newDateRange);
  };
  const inputString = payInform.map((item)=>{
    return (item.orderTopping)
  })
  //const jsonArray = JSON.parse(inputString);
  console.log(inputString)
/*   const modifiedArray = jsonArray.map((item) => {
    const { toppingName, ...rest } = JSON.parse(item);
    return JSON.stringify({ '토핑이름': toppingName, ...rest });
  });
  const outputString = JSON.stringify(modifiedArray);
  
  console.log(outputString) */
  const searchButton = (e) => {
    e.preventDefault();
    const param = {
      startdate: selectedDateRange[0].format("YYYY-MM-DD"), // 시작
      enddate: selectedDateRange[1].format("YYYY-MM-DD"), // 끝
    };

    const startDateValue = param.startdate;
    const endDateValue = param.enddate;

    fetch(BASE_URL + "/payment" + `/${startDateValue}` + `/${endDateValue}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setSearchpay(res));
  };
  console.log(searchpay);

  //총합계 
const calculateTotalPrice = () => {
  let total = 0;

  // Iterate through the selected items in your searchpay state
  for (const item of searchpay) {
    total += item.totalPrice;
  }

  return total;
};
  
  const showpaylist = () => {

    const columns = [
      { field: "orderCard", headerName: "승인번호", width: 130 },
      { field: "orderNameJson", headerName: "주문 메뉴", width: 130 },
      { field: "totalPrice", headerName: "가격", width: 130 },
      { field: "date", headerName: "날짜", width: 170 },
      { field: "orderTopping", headerName: "토핑", width: 300 },
      { field: "orderId", headerName: "주문번호", width: 70 },
    ];
 
    const rows = searchpay.map((item, index) => ({
      id: index + 1,
      orderCard: item.orderCard,
      orderNameJson: item.orderNameJson.replace(/[\[\]"']/g, ""),
      totalPrice: item.totalPrice + "원",
      date: dayjs(item.date).format("YYYY-MM-DD HH:mm:ss"),
      orderTopping: item.orderTopping.replace(/[\[\]"'{}\\]/g, ""),
      orderId: item.orderId,
    }));

    return (
      <div style={{ height: 400, width: 1000 }}>
       
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        
      </div>
    );
  };

  const ordercardClick = (e) => {
    e.preventDefault();
    if (ordercard.length === 0) {
      Swal.fire({
        icon: "error",
        title: "승인번호를 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      fetch(BASE_URL + "/payment" + `/${ordercard}`, {
        method: "get",
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length === 0) {
            Swal.fire({
              icon: "error",
              title: "해당되는 승인번호가 존재하지 않습니다",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            setOneordercard(res);
          }
        });
    }
  };

  const ordercardOnchange = (e) => {
    setOrdercard(e.target.value);
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  //삭제 버튼
  const remove = (target) => {
    fetch(BASE_URL + `/payment/${target.orderCard}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res); //true
        if (res) {
          // If deletion is successful, set the oneordercard state to an empty array
          setOneordercard([]);
          // Optionally, you may also want to refresh the list of payments after deletion
          /*    fetch(BASE_URL + "/payment", {
              method: "get",
              headers: {
                Authorization: "Bearer " + ACCESS_TOKEN,
              },
            })
              .then((res) => res.json())
              .then((res) => setPayInform(res)); */
        }
      });
  };

  const removeHandler = (item) => {
    remove(item);
  };

  const selectedone = oneordercard.map((item) => {
    const orderName = item.orderNameJson.replace(
      /[\[\]"']/g,
      ""
    ); /* JSON형식 빈칸 수정 */
    return (
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <FormGroup row>
          <Grid item xs={12} md={6}>
            <List dense={dense}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                        Swal.fire({
                          title: "매출을 취소하시겠습니까?",
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
                              "삭제완료!"
                              //window.location.reload()
                            );
                          }
                        });
                      }}
                    />
                  </IconButton>
                }
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
                      승인 번호: {item.orderCard}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component="span"
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      style={{ textAlign: "center" }}
                    >
                      {`부가 정보: ${orderName}/ ${item.totalPrice}원/ ${dayjs(
                        item.date
                      ).format("YYYY-MM-DD HH:mm:ss")}`}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </FormGroup>
      </Box>
    );
  });

  //찐 return
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
        매출조회
      </h1>

      {/* 승인번호 검색하기 */}
      <div
        style={{
          fontSize: "32px",
          color: "#333",
          textAlign: "center",
        }}
      >
        <form>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="승인 번호"
              variant="outlined"
              placeholder="승인 번호"
              required
              name="orderCard"
              type="number"
              value={payInform.orderCard}
              onChange={ordercardOnchange}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }} //type="number" up&down arrow remove
            />
          </Box>

          <input
            type="submit"
            onClick={ordercardClick}
            value="승인번호 조회하기"
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        </form>
      </div>
      <div
        style={{
          marginLeft: "800px",
          //  border: '1px solid black',
          width: "500px",
          marginTop: "20px",
          // border:'2px solid black'
          // marginBottomp:'50px'
        }}
      >
        {selectedone}
      </div>

      <div>
        <form>
          <div style={{ marginLeft: "630px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangeCalendar
                defaultValue={[dayjs(today), dayjs(today)]}
                onChange={startChnage}
              />
            </LocalizationProvider>
          </div>

          <input
            type="submit"
            onClick={searchButton}
            value="기간 조회하기"
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
              marginLeft: "630px",
              marginBottom: "20px",
              // border:'1px solid black',
              marginLeft: "875px",
            }}
          />
          {/* <div>총합계: </div> */}
          <div style={{ width:'1000px',    marginLeft: "500px",}}>
        
            {showpaylist()}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
  Total Price: {calculateTotalPrice()}원
</div>
        </form>
      </div>
    </>
  );
};

export default PaymentList;
