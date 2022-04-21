import React from 'react'
import { Link } from 'react-router-dom'
import Select from './Select'

export default function HouseItem({info}) {


    const onChangeHandler = (e) => {
        
    }


  return (
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
                onChangeHandler = {onChangeHandler}
            />
        </td>
    </tr>
  )
}
