import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
 //<<<<<<<<<<<<<<<<메뉴선택 밀크티/스무디/차이디...>>>>>>>>>>>>>>>>>>>>


const MenuList =({props})=>{
    const BASE_URL = "http://localhost:8080/api";
 /*    http://localhost:8080/api/item/1,2,3,.... */
    const [menuList, setMenuList] = useState({items:[]});
    const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

    let menuId = useParams();
    /* console.log("현재param 값"+{menuId}) */

    useEffect(()=>{
        fetch(BASE_URL+"/item"+`/${menuId.menuId}`,{
            method:"GET",
            headers: {
                Authorization: "Bearer " + ACCESS_TOKEN,
              },
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setMenuList(json)
        })
    },[menuId])
    console.log(menuList)

    const list=menuList.items.map((item)=>{
        return(
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                margin: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.2s ease",
                cursor: "pointer",
                }}>
                <Link to={`/api/option/${item.itemId}`} style={{ textDecoration: "none", color: "#333" }}>
                  {item.itemName}
                </Link>
              </div>
        )
       /*  <div>{item.itemName}</div> */
    })
/*     console.log(list) */

/*    const list=menuList.items.map((item)=>{
        return <div>{item.menuName}</div>
    })
 console.log(list) 
 */
  

/*    const optionListAll=optionList.coffeeOptions.map((e)=>{
        return (
            <div>
                {e.menuName}
                <br/>
                {e.countNum}
                <br/>
                {e.hereTogo}
                <br/>
                {e.hotCold}
                <br/>
                {e.coffeeTopping}
                <br/>
                {e.shotPrice}
            </div>
        )

    }) 
 */

    return(
        <div>
            <h1 style={{ 

textDecorationLine: "underline",
  fontFamily: "Arial, sans-serif",
  fontSize: "32px",
  color: "#333",
  textAlign: "center"
}}>Menu List
</h1>

<div style={{
  width: "1300px",
  height:"700px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
  margin: "0 auto",   /* Set left and right margin to auto */
  position: "absolute", /* Position the box absolutely */
  top: "57%",           /* Set top to 50% */
  left: "50%",          /* Set left to 50% */
  transform: "translate(-50%, -50%)" /* Translate the box back -50% horizontally and -50% vertically */
}}>
  {list}
</div>

{/* <div>
    {this.items.map((item,index)=>{
        return <MenuList>{item.menuName}</MenuList>
    })}
</div> */}

{/*  {list.toString()} */} 
{/* <div>
{list.map(item=>{
    <div>{item.menuName}</div>
})}
</div> */}
{/* <div>
    {menuList && menuList.items.map((item)=>{
        return(
            <MenuList>
                {item.menuName}
            </MenuList>
        )
    })}
</div> */}
{/* {list} */}
        </div>
    );
}
export default MenuList;