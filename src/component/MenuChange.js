import React, { useEffect, useState,useRef} from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { json } from "react-router-dom";


const MenuChange = () => {
/*   const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false); */
  const BASE_URL = "http://localhost:8080/api/name";


  const [newMenu,setNewMenu]=useState({
    menuId:"",
    menuName:"" 
  }
  );  //새로 입력받은 메뉴id를 담는 공간


 
  const [menu, setMenu] = useState([
      {
        menuId: "",
        menuName: "",
      },
    ],
  );
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");




/* const onAdd=()=>{
  fetch(BASE_URL,{
    method:"post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
    body:JSON.stringify()
  })
  .then(res=>res.json())
  .then((json)=>{
    setNewMenu(json)
  })
}
console.log(newMenu)
 */


useEffect(() => { //메뉴리스트 가져오기
    fetch(BASE_URL, {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
       /*  setMenu(menu =>[...menu, json]); */
       setMenu(json.items); 
      });
  }, []);
  console.log(menu);


  const handleChangeState = (e) => {
    setNewMenu({
      ...newMenu,
      [e.target.name]: e.target.value,

    })
    
  };



  const addClickSubmit = (e) => {
   e.preventDefault();
    const { menuId, menuName } = newMenu;


    const wordRegex = /^[^\s]+$/; //빈칸빼고 모든 문자가능


    if (!wordRegex.test(menuId) || !wordRegex.test(menuName)) {
      alert("제목/내용은 필수 입력사항입니다.");
      return;
    }
 
    onAdd(newMenu);
    alert("저장완료");
   setMenu(menu=>[...menu, newMenu]);

   setNewMenu({
    menuId:"",
    menuName:"" 
   })


/*   setMenu(menu.concat(newMenu)) */


    /* let temp = [...menu];
    temp.push(newMenu);
    setMenu(temp); */
   


   // return state.replaceAll("<br>", "\r\n"); //엔터 클릭시 줄바꿈
  };


  //추가
  const onAdd = (diary) => {
    fetch(BASE_URL+"/addmenu",{
      method:"post",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
      body: JSON.stringify(diary)
    })
    .then(res=>res.json())
    .then(json=>{
      console.log(json)

     
    })
  }
  //삭제
  const onDelete=(targetId)=>{
    fetch(BASE_URL+ `/${targetId}`,{
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      }
    })
    .then((res) => res.json())
    .then(json=>{
      console.log(json)
      setMenu(json.items)
    })
  }


  const removeClick=(e,targetId)=>{
    e.preventDefault();
    onDelete(targetId)
  }



  const repeatmenu=menu.map((item)=>{
    return(
      // console.log("fsdfsdfsdf")
      <List>
      <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete"  onClick={(e) => removeClick(e, item.menuId)} >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>


                  <ListItemText
                    primary={`${item.menuId} - ${item.menuName}`}
                 /*    secondary={secondary ? 'Secondary text' : null} */
                  />
                </ListItem>
            </List>
           
    )
  })
/* console.log("MC리렌더") */
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
        메뉴 수정 페이지
      </h1>
      {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<메뉴 추가하기>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
  {/*   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width:... '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="메뉴코드를 입력해주세요"
                    placeholder="ex)0... 기존 숫자와 중복 불가"
                    multiline
                    maxRows={4}
                />
                <TextField
                    id="outlined-textarea"
                    label="메뉴를 입력해주세요"
                    placeholder="ex)밀크티"
                    multiline
                />
                 <Button variant="contained" endIcon={<SendIcon />} onClick={submitHandler}>
        Send
      </Button>
            </div>
           
        </Box>
    </div>  */}
 


<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  <form onSubmit={addClickSubmit} name="frm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', borderRadius: '10px' }}>
    <div style={{ width: '100%', margin: '10px 0' }}>
      <input
        name="menuId"
        value={newMenu.menuId || ""}
        onChange={handleChangeState}
        placeholder="메뉴아이디를 입력해주세요,,,"
        type="text"
        style={{ width: '940px', padding: '10px', fontSize: '18px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
    <div style={{ width: '950px', margin: '10px 0' }}>
      <textarea
        name="menuName"
        value={newMenu.menuName}
        onChange={handleChangeState}
        placeholder="메뉴이름을 적어주세요"
        type="text"
        style={{ display: 'block', width: '100%', height: '200px', padding: '10px', fontSize: '18px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
      />
    </div>
    <Button variant="contained" endIcon={<SendIcon />} onClick={addClickSubmit} style={{  borderRadius: '5px', padding: '10px', fontSize: '18px' }}>
      Send
    </Button>
  </form>
</div>
      {/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<메뉴 List>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
{repeatmenu}


    </>
  );
};
export default MenuChange;



