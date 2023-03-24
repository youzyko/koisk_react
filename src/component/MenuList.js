import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
const MenuList =({props})=>{
    const BASE_URL = "http://localhost:8080/api/item";
 /*    http://localhost:8080/api/item/1,2,3,.... */
    const [menuList, setMenuList] = useState({items:[]});
    const [optionList,setOptionList]=useState({});
 

    let menuId = useParams();

    useEffect(()=>{
        fetch(BASE_URL+`/${menuId.menuId}`,{
            method:"GET"
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setMenuList(json)
        })
    },[menuId])
    console.log(menuList)

    const list=menuList.items.map((item)=>{
        return <div>{item.itemName}</div>
    })
/*     console.log(list) */

/*    const list=menuList.items.map((item)=>{
        return <div>{item.menuName}</div>
    })
 console.log(list) 
 */
    const menuClick=(e)=>{
        const BASE_URL="http://localhost:8080/api/option"
        fetch(BASE_URL+`/${menuId.menuId}`,{
            method:"GET"
        })
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setOptionList(json)
          
        })
    }


    return(
        <div>
     <h1>Menu Items</h1>

     <div style={{border:"1px solid black"}} onClick={menuClick}>
       
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