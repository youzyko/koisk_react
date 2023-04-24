import React, { useEffect, useState, useRef } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
//delete
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Item from "antd/es/list/Item";

const AdminItem = () => {
    //관리자페이지 전체조회
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const BASE_URL = "http://localhost:8080/api/item";
  
    const [id,setId]=useState([]); //ownImgId만 가져오기
    const [Img, setImg] = useState([]); //ownImgId에 해당하는 이미지주소
    const [allinform,setAllInform]=useState([]);

   // const [ownImgId,setOwnImgId]=useState([])
 

    useEffect(()=>{  //사진을 가져오기위한 ownImgId 가져오기 
        fetch(BASE_URL+"/bringownImgId",{
            method: "get", 
            headers: {
              Authorization: "Bearer " + ACCESS_TOKEN,
            },
        })
        .then(res=>res.json())
        .then(res=>{
          setId(res)
        })
    },[])
    console.log(id) 
    //['69684a19-4f96-4bf2-8e74-22dc6831dc0d', '77041901-ab22-45e4-bf7]

    useEffect(()=>{
     id.map((Item)=>{
      fetch(BASE_URL+"/ownImgId"+`/${Item}`,{
        method:"get"
      })
      .then(res=>res.blob())
      .then(imgData=>{
        const imgUrl = window.URL.createObjectURL(imgData);
        setImg(Img=>[...Img,imgUrl])
      })
     })
    },[id])
 console.log(Img)


    useEffect(()=>{
      fetch(BASE_URL+"/allItemInform",{
        method:"get"
      })
      .then(res=>res.json())
      .then(res=>{
        setAllInform(res)
      })
    },[])
    console.log(allinform)  //모든 상품불러오기
    
    const bunch=[];
    
    Img.forEach((item)=>{
      bunch.push(<img src={item} style={{ width: '50px', height: '50px' }}></img>)
    })
console.log(bunch)

    const allItembunch = allinform.map((item, index) => {
      return (
        <>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem secondaryAction={<IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                <Avatar>
                {bunch[index]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`상품 코드: ${item.itemId} - 상품 이름: ${item.itemName} - 상품 가격: ${item.itemPrice}`} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      );
    });
   
/*    
  const bunch =Img.map((item)=>{
  return(
    <>
    <img src={item}></img>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
            <ListItem
       
              secondaryAction={ 
                  <IconButton edge="end" aria-label="delete" >
                    <DeleteIcon />
                  </IconButton>
                }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt="상품이미지"
                  src={item}
                  />
                </ListItemAvatar>
                <ListItemText  primary={`상품 코드: ${item.itemId} - 상품 이름: ${item.itemName}`} />
              </ListItemButton>
            </ListItem>
  
      </List>  
    </>
  )

    })  */




    return(
<>
 {allItembunch} 

 
{/*       {tdd} 
          */}
     
         
    </>
  
          
 
 

  
    )

}
export default AdminItem;