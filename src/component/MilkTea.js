
import React, {useState, useEffect } from 'react'; 
import { API_BASE_URL } from "/kkj_data/kiosk/frontend/src/config/host-config";

/* `${API_BASE_URL}/auth/signin`
API_BASE_URL= 'http://localhost:8080';
*/
const MilkTea=()=>{ 

    const [milk,setMilk]=useState({items:[]});  //밀크티메뉴만
    const [selectedItem, setSelectedItem] = useState("");
    
    useEffect(()=>{
        fetch(`${API_BASE_URL}/api/item/1`,{
            method:"GET"
        }).then(res=>res.json())
        .then(res=>{
            setMilk(res);
        })
    },[])
    
    useEffect(() => {
        console.log(milk);
      }, [milk]);
 
      const handleItemClick = (item) => {
        setSelectedItem(item);
      
      } 
   
      const handleCloseModal = () => { //닫기
        setSelectedItem(null);
      }

    
  
    return (
        <div>
            {milk.items.length}개의 메뉴 
        {milk.items.map(item => (
          <div key={item.itemName} style={{border:"1px solid black"}}  onClick={handleItemClick} >{/* ()=>handleItemClick(item) */}
            <h2>{item.itemName}</h2>
            <p>{item.itemPrice}</p>
            <p style={{border:"1px solid green",width:"200px",height:"50px"}}>{item.itemDetail}</p>
            <p style={{border:"1px solid red",width:"100px",height:"100px"}}>{item.itemImg}</p>
          </div>
        ))}

        {selectedItem && (
        <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", border: "1px solid black"}}>
          <h2>{selectedItem.itemName}</h2>
          <p>{selectedItem.itemPrice}</p>
          <p>{selectedItem.itemDetail}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )} 

      
    </div>
     
    );

}
export default MilkTea;