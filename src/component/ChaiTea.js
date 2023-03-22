import React, {useState, useEffect} from 'react'; 
import { API_BASE_URL } from "/kkj_data/kiosk/frontend/src/config/host-config";

const ChaiTea=()=>{

const [chaiTea,setChaiTea]=useState({items:[]});  //차이티

    useEffect(()=>{
        fetch(`${API_BASE_URL}/api/item/3`,{
            method:"GET"
        }).then(res=>res.json())
        .then(res=>{
            setChaiTea(res);
        })
    },[])
    
    useEffect(() => {
        console.log(chaiTea);
      }, [chaiTea]);
     

    return(
        <div>
        {chaiTea.items.length}개의 메뉴 
    {chaiTea.items.map(item => (
      <div key={item.itemName} style={{border:"1px solid black"}}>
        <h2>{item.itemName}</h2>
        <p>{item.itemPrice}</p>
        <p style={{border:"1px solid green",width:"200px",height:"50px"}}>{item.itemDetail}</p>
        <p style={{border:"1px solid red",width:"100px",height:"100px"}}>{item.itemImg}</p>
      </div>
    ))}
  </div>
    );

}
export default ChaiTea;