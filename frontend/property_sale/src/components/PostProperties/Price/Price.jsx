import React,{useState} from 'react'
import CustomChooseInput from '../CustomChooseInput/CustomChooseInput'
import Input from '../Input/Input'
import Select from '../Select/Select'

export default function Price({formDispatch,postUrl,isRent}) {

  const [data,setData] = useState({
    price_in_number : "",
    price_in_words : "",
    price_negotiable : ""
  })

  const clickHandler = (e) => {
    e.preventDefault();
    formDispatch({type : "set",data:data})
  }

  const onChangeHandler = (e) => {
    if(e.target.name === "per" && e.target.value === "0"){
      setData(prev => {
        delete prev[e.target.name]
        return prev
      })
    }else{
      setData(prev => {
        return{
          ...prev,
          [e.target.name] : e.target.value
        }
      })
    }
  }

  const checkboxHandler = (e) => {
    console.log(e.target.checked)
    if(e.target.checked){
      onChangeHandler(e)
    }else{
      setData(prev => {
        delete prev[e.target.name]
        return prev
      })
    }
  }
  return (
      <div>
          <Input
            label = "price in number"
            
          > 
            <input type="text" name = "price_in_number" onChange = {onChangeHandler}/>
          </Input>
          <Input
            label = "price in words"
            
          > 
            <input type="text" name = "price_in_words" onChange = {onChangeHandler}/>
          </Input>

          
              <Select
              options = {
                ["month","year"]
              }
              name = "per"
              onChange = {onChangeHandler}
            >
            </Select>
          
          <Input
            label = "price negotiable"
          >
            <input type="checkbox" value = "Yes" name = "price_negotiable" onChange = {checkboxHandler}/>
          </Input>
          <button className = "confirm" onClick={clickHandler}>confirm price</button>
      </div>
    )
}
