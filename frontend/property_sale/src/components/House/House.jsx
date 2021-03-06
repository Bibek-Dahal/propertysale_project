import React from 'react'
import { useEffect,useState,useRef } from 'react';
import { useParams } from 'react-router-dom'
// import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import GoBack from './GoBack';
import impLinks from '../../impLinks';
import './House.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Nav from '../Nav/Nav';
import { text } from '@fortawesome/fontawesome-svg-core';
import Map from './Map';
import HtmlReactParser from 'html-react-parser';
import useAxios from '../../Hooks/useAxios';
import PgNotFound from '../page_not_found/PgNotFound';

export default function House() {
    const axiosInstance = useAxios();
    const description = useRef(null);
    const {id} = useParams();
    const [house,setHouse] = useState({});
    const [active,setActive] = useState("overview");
    const [seller,setSeller] = useState({});
    const [views,setViews] = useState(0);
    const [kycStatus,setKycStatus] = useState("");
    const [notfound,setNotFound] = useState(false);

    const infoToggler = (e) => {
        setActive(e.target.dataset.info);
    }

    useEffect(() => {
        let ws;
        ws = new WebSocket(`${axiosLinks.noOfViewsHouse}${id}/`);
        ws.onopen = () => {
            console.log('connnected')
        }
        ws.onmessage = (msg) => {
            console.log(msg.data)
            setViews(JSON.parse(msg.data).message);
            //    console.log(msg)
        //    showPopup(`Your kyc is ${JSON.parse(msg.data).message}`)
        }
        ws.onclose = (msg) => {
            console.log('connection closed')
        }

        (
            async function(){
                console.log('getting house')
                try{
                    console.log(window.location.pathname == `/my-properties/house/${id}`);
                    if(window.location.pathname == `/my-properties/house/${id}`){
                        let res = await axiosInstance.get(`${axiosLinks.retUserHouse}${id}/`);
                        console.log('house = ',res);
                        setHouse(prev => res.data);
                        const house = res.data;
                        // res = await axiosInstance.get(`${axiosLinks.retriveUser}/${res.data.seller}/`);
                        // setSeller(res.data);
                        res = await axiosInstance.get(`${axiosLinks.retriveUserById}${house.seller}`);
                        console.log('seller = ',res)
                        setSeller(res.data);
                        
                        res = await axiosInstance.get(`${axiosLinks.retriveKyc}`);
                        console.log('kyc = ',res)
                        setKycStatus(res.data.status);
                    }else{
                        let res = await axiosInstance.get(`${axiosLinks.getHouse}${id}`);
                        console.log('house = ',res);
                        setHouse(prev => res.data);
                        const house = res.data;
                        // res = await axiosInstance.get(`${axiosLinks.retriveUser}/${res.data.seller}/`);
                        // setSeller(res.data);
                        res = await axiosInstance.get(`${axiosLinks.retriveUserById}${house.seller}`);
                        console.log('seller = ',res)
                        setSeller(res.data);
                        
                        res = await axiosInstance.get(`${axiosLinks.retriveKyc}`);
                        console.log('kyc = ',res)
                        setKycStatus(res.data.status);
                    }
                    
                    
                }catch(err){
                    console.log('catch called');
                    console.log(err);
                    setNotFound(true);
                }      
            }
        )()
       
       
        return () => {
            ws.close()
        }


    },[])

    function toHtml(string){
        const parser = new DOMParser();
        const div = document.createElement('div');
        div.innerHTML = parser.parseFromString(string,'text/html');
        // description?.current.append(div)
        description.current.innerHTML = parser.parseFromString(string,'text/html').body.innerHTML;
    }



    return (
        <>{
            notfound?<PgNotFound/>:<div className="propertyDetail house">
            <Nav />
            {/* <GoBack currentPage = {house.title} /> */}
            {/* <DetailHeader /> */}
            <div className="detail wrapper">
                <div className="top">
                    <div className="images">
                        <div className="main_image">
                            <img src={`${impLinks}${house.main_image}`} alt="" />
                        </div>
                        <div className="other-images">
                            {
                            house?.images?.map((img,index)=> {
                                if(index > 3) return;
                                return   <div key = {img.id} className="image">
                                                <img  src = {`${impLinks}${img.image}`} />
                                            </div>
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="right">
                        <div className={`title ${house?.property_type?.split(' ').join('')}`}>
                            {house.title}
                        </div>
                        <div className="price">
                            <div className="figure">
                                NRs. {house.price_in_number}
                            </div>
                            {
                                house?.price_negotiable && 
                                    <span className="btn negotiable">
                                        negotiable
                                    </span>
                            }
                        </div>
                        <div className="view">
                            <span>
                                <FontAwesomeIcon  icon = {solid('eye')} />
                            </span>
                            <span className='figure'>
                                {views}
                            </span>
                        </div>
                        <div className={`btn listing-type ${(house?.listing_type)?.split(" ").join("-")}`}>
                            {house.listing_type}
                        </div>
                        <div className={`btn condition ${(house?.condition)?.split(" ").join('-')}`}>
                            {house.condition}
                        </div>
                        <div className="location">
                            <FontAwesomeIcon icon = {solid('location-pin')} />
                            <div className="info">
                                <span>
                                    {house?.district}
                                </span>
                            </div>
                        </div>
                </div>
                <div className="other-info">
                        <div className="titles">
                            <div onClick = {infoToggler} data-info = "overview" className={`title ${active === 'overview' ? "active" : ""}`}>
                                overview
                            </div>
                            <div onClick = {infoToggler} data-info = "details" className={`title ${active === 'details' ? "active" : ""}`}>
                                details
                            </div>
                            <div onClick = {infoToggler} data-info = "contact" className={`title ${active === 'contact' ? "active" : ""}`}>
                                contact
                            </div>
                            <div onClick = {infoToggler} data-info = "facility" className={`title ${active === 'facility' ? "active" : ""}`}>
                                facilities
                            </div>
                        </div>
                        <div>
                        <div className="description">
                            {
                                active === 'overview' &&
                                <div className="overview-description">
                                    <div className="desc">
                                        <h4>description</h4>
                                        {
                                            typeof house.description === 'string'
                                            && <p ref = {description}>
                                                {
                                                    HtmlReactParser(house.description)
                                                }
                                        </p>
                                        }
                                    </div>
                                </div>
                            }
                            {
                                active === 'details' &&
                                <div className="details-description">
                                    <div className="counts">
                                                <div className="count-item floors">
                                                    <FontAwesomeIcon  icon = {solid('building')} />
                                                    <span>
                                                        <p>floors</p>
                                                        <p>{house.floors}</p>
                                                    </span>
                                                </div>
                                            <div className="count-item beds">
                                                <FontAwesomeIcon  icon = {solid('bed')} />
                                                <span>
                                                    <p>beds</p>
                                                    <p>{house.beds}</p>
                                                </span>
                                            </div>
                                            <div className="count-item face-towards">
                                                <FontAwesomeIcon  icon = {solid('compass')} />
                                                <span>
                                                    <p>face towards</p>
                                                    <p>{house.face_towards}</p>
                                                </span>
                                            </div>
                                            <div className="count-item bath">
                                                <FontAwesomeIcon  icon = {solid('bath')} />
                                                <span>
                                                    <p>bath</p>
                                                    <p>{house.bath}</p>
                                                </span>
                                            </div>

                                            <div className="count-item kitchen">
                                                <FontAwesomeIcon  icon = {solid('kitchen-set')} />
                                                <span>
                                                    <p>kitchen</p>
                                                    <p>{house.kitchen}</p>
                                                </span>
                                            </div>
                                            
                                            <div className="count-item living">
                                                <FontAwesomeIcon  icon = {solid('couch')} />
                                                <span>
                                                    <p>living</p>
                                                    <p>{house.living}</p>
                                                </span>
                                            </div>
                                           
                                            {/* ///////////////// */}
                                            <div className="count-item parking">
                                                <FontAwesomeIcon  icon = {solid('car')} />
                                                <span>
                                                    <p>Parking</p>
                                                    <p>{house.parking}</p>
                                                </span>
                                            </div>
                                            <div className={`count-item furnishing`}>
                                                <FontAwesomeIcon  icon = {solid('check')} />
                                                <span>
                                                    <p>{house.furnishing}</p>
                                                </span>
                                            </div>
                                            
                                    </div>
                                    {/* <div className="miscelleneous-details">
                                            <div className={`furnishing`}>
                                                <FontAwesomeIcon  icon = {solid('check')} />
                                                <span>
                                                    <p>{house.furnishing}</p>
                                                </span>
                                            </div>
                                    </div> */}
                                    <div className="locations">
                                        <div className="location-item">
                                            <span>zone</span>
                                            <span>{house.zone}</span>
                                        </div>
                                        <div className="location-item">
                                            <span>district</span>
                                            <span>{house.district}</span>
                                        </div>
                                        <div className="location-item">
                                            <span>province</span>
                                            <span>{house.province}</span>
                                        </div>
                                        <div className="location-item">
                                            <span>landmark</span>
                                            <span>{house.landmark}</span>
                                        </div>
                                        <div className="location-item">
                                            <span>house type</span>
                                            <span>{house.house_type}</span>
                                        </div>
                                        <div className="location-item">
                                            <span>road to property</span>
                                            <span>{house.road_to_property}</span>
                                        </div>
                                        <div className="location-item url">
                                            <span>youtube url</span>
                                            <a href={house.url} target = "_blank">
                                                {house.url}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                active === 'contact' &&
                                <div className="contact-description">
                                    {
                                        kycStatus === "verified" ? (
                                                seller &&
                                                    <div>
                                                        <div className="name">
                                                            <div>
                                                                name
                                                            </div>
                                                            <div>
                                                                    {seller.first_name} {seller.last_name}
                                                            </div>
                                                        </div>
                                                        <ul className="phone">
                                                            <div>Phone</div>
                                                            <div>
                                                            {
                                                                seller.contact_num?.map(phone => {
                                                                    return <li>{phone.mobile_num}</li>
                                                                })
                                                            }
                                                            </div>
                                                        </ul>
                                                        <div className="email">
                                                            <span>email</span>
                                                            <span>{seller.email}</span>
                                                        </div>
                                                    </div>
                                        ):(
                                            <div className = "kycError">
                                                kyc not verified. <br/> Wait for it to see this contact info.
                                            </div>
                                        )
                                       
                                    }
                                </div>
                            }
                            {
                                active === 'facility' &&
                                <div className="facility-description">
                                    {
                                        house?.facility.map(f => {
                                            return (
                                                <div className='facility'>
                                                    <FontAwesomeIcon icon = {solid('circle-check')}/>
                                                    <span>{f}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        </div>
                </div>
                <div className="map">
                        <Map lat = {house.latitude} lng = {house.longitude} />
                        {
                            console.log(`lat = ${house.latitude}`)
                        }
                </div>
            </div>
        </div>
        }
    </>
  )
}
