import React, { useEffect, useState } from "react";
import { json, useParams, useLocation } from "react-router-dom";
const Option = ({ props }) => {
  const BASE_URL = "http://localhost:8080/api";
  const [optionList, setOptionList] = useState({});
  const [coffeeTopping,setCoffeeTopping]=useState({});
  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
 /*  const [nonCoffeeTopping,setNonCoffeeTopping]=useState({nonCoffeeToppingDtos:[]});
  const [nonCoffeeToppingsFetched, setNonCoffeeToppingsFetched] = useState(false); */
/*   const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    setCheckedItems(prevState => {
      const newState = [...prevState];
      newState[index] = isChecked;
      return newState;
    });
  }; */

  let menuId = useParams(); 
   console.log(menuId) 

  useEffect(() => { //커피 옵션페이지
    fetch(BASE_URL + "/option" + `/${menuId.menuId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setOptionList(json);
      });
  }, [menuId]);
/*   console.log(optionList); */

  useEffect(()=>{ //커피 토핑
    fetch(BASE_URL+"/topping"+`/${menuId.menuId}`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ACCESS_TOKEN,
      },
    })
    .then(res=>res.json())
    .then((json)=>{
     /*  console.log(json) */
      setCoffeeTopping (json)
    })
  },[])
  console.log(coffeeTopping); 
  
  let toppingAll;
  for(let key in coffeeTopping){
    toppingAll=coffeeTopping[key].map(options=>{
      return(
        <div>
          <label>
        <input
          type="checkbox"
          
          /* onChange={handleCheckboxChange} */
        />
       토핑이름: {options.toppingNameNonCoffee}
          {options.toppingPriceNonCoffee}
      </label>
          
          
          {options.toppingNameCoffee}
          {options.toppingPriceCoffee}원
        </div>
      )
    })
  }
console.log(toppingAll)
  



  
  return (
    <div>
     옵션페이지 입니다/
   
      <div>
    
        {/* {JSON.stringify(optionList)} */}
        {Object.values(optionList).map((options) => (
          <div key={options.menuId}>
            {options.menuName}
            <br />
            <>
            <h2>매장/포장</h2>
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              매장
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              포장
            </>
            <br />
            <>
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              ICE
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              HOT
            </>
            <br />
            <div>
              <h2> 수량</h2>
              <h2>{options.countNum}</h2>
              <button /* onClick={onIncrease} */>+1</button>
              <button /* onClick={onDecrease} */>-1</button>
            </div>
            <br />

            <>
              <h2>얼음양</h2>
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              많이
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              중간
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              적게
            </>
            <br />

            <>
              <h2>당도</h2>
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              달게
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              기본
              <input
                id="Windows"
                value="Windows"
                name="platform"
                type="radio"
              />
              덜달게
            </>
            <br/>
            <h2>토핑</h2>
            {toppingAll}
           {/*  {options.hereTogo}
            {options.hotCold}
            {options.iceAmount}
            {options.sweetness}
            {options.topping}
            {options.toppingPrice}
            {options.coffeeTopping}
            {options.shotPrice} */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Option;
