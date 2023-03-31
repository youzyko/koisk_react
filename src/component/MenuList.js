import React, { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
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
            <div>
                <Link to={`/api/option/${item.itemId}`}>{item.itemName}</Link>
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
     <h1>Menu Items</h1>

     <div style={{border:"1px solid black"}} >
       
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