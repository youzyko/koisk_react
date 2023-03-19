import * as React from 'react';
/* import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; */
import logo from '../images/blackmilktea.jpg' 
const MilkTea=()=>{

    return(
       <div>
        밀크티 페이지 입니다~
        <img src={logo} alt={"logo"} /> 
        <img src={require('../images/blackmilktea.jpg')} alt="logo" className="brand-logo"/>
       </div>
    )

}
export default MilkTea;