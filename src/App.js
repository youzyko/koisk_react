import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "./config/host-config";
import MenuList from "./component/MenuList";
import { json } from "react-router-dom";



function App() { //첫페이지
/*   const BASE_URL = "http://localhost:8080/api/item";
  const [menuList, setMenuList] = useState({ items: [] });

  const menuId=menuList.items.map((item)=>{
    return <div>{item.itemId}</div>
  })

  useEffect(()=>{
    fetch(BASE_URL /* +`${menuId}` ,{
      method:"GET"
    })
    .then(res=>res.json())
    .then(json=>{
      setMenuList(json)
    })
  },[])
console.log(menuList)

const lists=menuList.items.map(item=>{
  <MenuList key={item.menuName}>{item.menuName}</MenuList>
})

 */
  return (
    <div>
app.js
    </div>
   
  );
}

export default App;
