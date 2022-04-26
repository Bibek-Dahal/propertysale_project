import React from 'react'
import { Link } from 'react-router-dom'
import Select from './Select'
import axiosLinks from '../../axiosLinks';
import axiosInstance from '../utils/axiosInstance';

export default function LandItem({info}) {

    const onChangeHandler = (e) => {
        console.log(e.target.value);
        (   
            async function(){
                try{
                    console.log('inside rty')
                    const res = await axiosInstance.put(`${axiosLinks.updateHouseStatus}${info.id}`,e.target.value);
                    console.log(res);
                }catch(err){
                    console.log(err)
                }
            }
        )()
    }


  return (
    <>
        <tr className="item item-house">
        <td className="title">
            <Link to = {`${info.id}`}>{info.title}</Link>
        </td>
        <td className={`is_active `}>
            <div className = {`status ${info.is_active ? "published" : "pending"}`}>
                {info.is_active ? "published" : "pending"}
            </div>
        </td>
        <td className="change_status" width = "10%">
            <Select 
                name = "status"
                options = {["Up","Down"]}
                value = {info.status}
                onChange = {onChangeHandler}
            />
        </td>
    </tr>
    </>
    )
}
