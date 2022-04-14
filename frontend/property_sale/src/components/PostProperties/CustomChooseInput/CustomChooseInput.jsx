import React,{useState} from 'react'
import { useEffect } from 'react';
import CustomCheckBox from '../CustomCheckbox/CustomCheckBox'
import './CustomChooseInput.css';

export default function CustomChooseInput({name,options,setFacilityItems}) {

    const [items,setItems] = useState([])

    const addItem = (name) => {
        console.log('added item',name)
        setItems(prev => {
            return[
                ...prev,
                name
            ]
        })
        setFacilityItems(prev => {
            return items;
        })
    }

    const removeItem = (name) => {
         console.log('removed item',name)   
         setItems(prev => {
            delete prev[name]
            return prev
        })
        setFacilityItems(prev => {
            return items;
        })
    }

    return (
        <div className = {`${name}s`}>
            <h1>{name}</h1>
            {
                options ?
                    options.map((option,index) => {

                        return <CustomCheckBox 
                                name = {option} 
                                index = {index}  
                                addItem = {addItem}
                                removeItem = {removeItem}
                                />
                    }):null
            }
        </div>
    )
}
