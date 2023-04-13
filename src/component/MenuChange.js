import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { json } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "@mui/material/Avatar";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";

const MenuChange = () => {
  /*   <<<<<<<<List check>>>>>>*/

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //http://localhost:8080/api/name
  const BASE_URL = "http://localhost:8080/api/name";
  const [menuId, setMenuId] = useState({
    items: [
      {
        menuId: "",
        menuName: "",
      },
    ],
  });
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

  useEffect(() => {
    fetch(BASE_URL, {
      method: "get",
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        setMenuId(json);
      });
  }, []);
  console.log(menuId);

  /* const numrepeat =menuId.items.map((item)=>{
    return item.menuId
})
console.log(numrepeat); */

  const repeat = menuId.items.map((item) => {
    return (
      <>
        <div>{item.menuId}{item.menuName}</div>
     
      </>
    );
  });

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

      {repeat}

      {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {menuId.items.map((value) => {
       const repeat = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': repeat }}
                />
              </ListItemIcon>
              <ListItemText id={repeat} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}

    </List> */}

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="MenuId"
            placeholder="MenuId"
            MenuId
            maxRows={4}
          />
          <TextField
            id="outlined-textarea"
            label="MenuName"
            placeholder="MenuName"
            MenuName
          />
        </div>
      </Box>

      <Stack direction="row" spacing={2}>
        {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button> */}
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
    </>
  );
};
export default MenuChange;
