import { useRef, useState, useEffect } from "react";
const BackgroundImgadd = () =>{
    return(
        <>
        <input
        id="backgroundImg"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
       /*  onChange={showImageHandler}
        ref={$fileInput} */
      />
        </>
    )
}
export default BackgroundImgadd;