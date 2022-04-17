import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axiosLinks from '../../axiosLinks';
import axiosInstance from '../utils/axiosInstance';
import './PostProperties.css';

export default function PostProperties() {

  const [keys,setKeys] = useState({})

  return (
        <div className="post-properties">
            <Link to = "post-land">Post Land</Link>
            <Link to = "post-house">Post House</Link>
        </div>
  )
}
