import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useAuth } from '../../Hooks';
import { FullScreenLoading } from '../shared';
import axiosInstance from '../utils/axiosInstance';
import HouseItem from './HouseItem';
import LandItem from './LandItem';
import axiosLinks from '../../axiosLinks';

import './MyProperties.css';

export default function MyProperties() {
  const [houses,setHouses] = useState([])
  const [lands,setLands] = useState([])
  const [isLoading,setIsLoading] = useState(0);

  const {checkAndRemoveToken} = useAuth();

  useEffect(() => {
    // checkAndRemoveToken();
    setIsLoading(1);
    (
      async function(){
        try{
          let res = await axiosInstance.get(axiosLinks.getMyHouse);
          console.log(res)
          setHouses(prev => {
            return res.data;
          })
          res = await axiosInstance.get(axiosLinks.getMyLand);
          console.log(res);
          setLands(prev => res.data)
          setIsLoading(0);
        }catch(err){
          console.log(err);
          setIsLoading(0);
        }
      }
    )()
    
  },[])



  if(isLoading) return <FullScreenLoading />

  return (
    <div className='properties-list table-container'> 
      {
        console.log(houses)
      }
      <table>
        <thead>
          <tr>
            <th>property name</th>
            <th>published status</th>
            <th>property status</th>
          </tr>
        </thead>
        <tbody>
            {
              houses?.map(house => {
                return <HouseItem 
                  info = {house}
                />
              })
            }
            {
              lands?.map(land => {
                return <LandItem 
                  info = {land}
                />
              })
            }
        </tbody>
      </table>
    </div>
  )
}
