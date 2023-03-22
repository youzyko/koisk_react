
import React, {useState, useEffect} from 'react'; 
import { API_BASE_URL } from "/kkj_data/kiosk/frontend/src/config/host-config";

/* `${API_BASE_URL}/auth/signin` */
const Coffee=()=>{ 

    const [coffee,setCoffee]=useState({items:[]});  //밀크티메뉴만
    
    useEffect(()=>{
        fetch(`${API_BASE_URL}/api/item/5`,{
            method:"GET"
        }).then(res=>res.json())
        .then(res=>{
            setCoffee(res);
        })
    },[])
    
    useEffect(() => {
        console.log(coffee);
      }, [coffee]);
    


    
  
    return (
        <div>
            {coffee.items.length}개의 메뉴 
        {coffee.items.map(item => (
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
export default Coffee;