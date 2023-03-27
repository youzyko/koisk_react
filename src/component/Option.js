import React, { useEffect, useState } from "react";
import { json, useParams, useLocation } from "react-router-dom";
const Option = ({ props }) => {
  const BASE_URL = "http://localhost:8080/api";
  const [optionList, setOptionList] = useState({});
  const [number, setNumber] = useState(0); //갯슈
  const [checkedList, setCheckedList] = useState([]); //체크박스

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== item));
    }
  };
  const onRemove = item => {
    setCheckedList(checkedList.filter(el => el !== item));
  };
  



  const onIncrease = () => {
    setNumber(number + 1);
  };
  const onDecrease = () => {
    setNumber(number - 1);
  };
  let menuId = useParams();
  /* console.log(itemId) */

  useEffect(() => {
    fetch(BASE_URL + "/option" + `/${menuId.menuId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setOptionList(json);
      });
  }, [menuId]);
  console.log(optionList);

  /*    let optionAll=optionList; */

  /*  for (var key in optionAll){
    console.log("key==="+key)
    console.log("vaklu==="+optionAll[key])
   } */

  /*   let optionAll;
  for(let key in optionList)
     optionAll = optionList[key].map(options=>{
        return(
            <div>
                {options.menuName}
            </div>
        )
    })  */

  /*    const location = useLocation();

    useEffect(() => {
      console.log(location);
    }, [ location ]) */

  /*     const BASE_URL="http://localhost:8080/api/option"
    
    fetch(BASE_URL+`/${menuId.menuId}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
        setOptionList(json)
    })
 */
  const onChange = (e) => {
    setOptionList(e.target.value);
  };
  return (
    <div>
      옵션페이지입니다
      <div>
        {/* <input onChange={onChange}></input> */}
        {/* {JSON.stringify(optionList)} */}
        {Object.values(optionList).map((options) => (
          <div key={options.menuId}>
            {options.menuName}
            <br />
            <>
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
              <button onClick={onIncrease}>+1</button>
              <button onClick={onDecrease}>-1</button>
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
