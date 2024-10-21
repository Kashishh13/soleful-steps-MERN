import React from 'react'
import './Home.css'

import { BsCartCheckFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { VscStarEmpty } from "react-icons/vsc";
import { FaPercent } from "react-icons/fa";

import ImageSwiper from './ImageSwiper'
import Menu from '../Menu/Menu.jsx'
const Home = () => {
  

  return (
    <>
 
    <div className='ban'>

      <ImageSwiper/>
      <Menu/>

      <div className='three'>
      <h1>Why Choose Us?</h1>
      <div className='ef'>
        <BsCartCheckFill className='th' />
        <h4 className='eo'>Easy To Order</h4>
      </div>
      <div className='ef'>
        <TbTruckDelivery className='th' />
        <h4 className='eo'>Fastest Delivery</h4>
      </div>
      <div className='ef'>
        <VscStarEmpty className='th' />
        <h4 className='eo'>Best Quality</h4>
      </div>
      <div className='ef'>
        <FaPercent className='th' />
        <h4 className='eo'>Great Offers</h4>
      </div>
    </div>
    
   
   
    </div>
    
    </>
  )
}

export default Home