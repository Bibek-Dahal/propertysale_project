import React,{useEffect,useState,useRef} from 'react'
// import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import impLinks from '../../impLinks';
import { Nav } from '..';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import Map from '../House/Map';
import { useParams } from 'react-router-dom';
import HtmlReactParser from 'html-react-parser';
import useAxios from '../../Hooks/useAxios';
import PgNotFound from '../page_not_found/PgNotFound';

export default function Land() {
    const axiosInstance = useAxios();
  const description = useRef(null);
  const {id} = useParams();
  const [land,setLand] = useState([])
  const [views,setViews] = useState(0)
  const [active,setActive] = useState("overview");
  const [notfound,setNotFound] = useState(false);
  const infoToggler = (e) => {
    setActive(e.target.dataset.info);
}
  useEffect(() => {
    let ws;
    ws = new WebSocket(`${axiosLinks.noOfViewsLand}${id}/`);
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
            try{
                if(window.location.pathname == `/my-properties/land/${id}`){
                    let res = await axiosInstance.get(`${axiosLinks.retUserLand}${id}`);
                    console.log(res);
                    setLand(prev => res.data);
                    
                }else{
                    let res = await axiosInstance.get(`${axiosLinks.getLand}${id}`);
                    console.log(res);
                    setLand(prev => res.data);
                    // res = await axiosInstance.get(`${axiosLinks.retriveUser}/${res.data.seller}/`);
                    // setSeller(res.data);
                    // res = await axiosInstance.get(``)
                }
                
            }catch(err){
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
    <>
        {notfound?<PgNotFound/>:<div className="propertyDetail land">
        <Nav />
        {/* <GoBack currentPage = {house.title} /> */}
        {/* <DetailHeader /> */}
        <div className="detail wrapper">
            <div className="top">
                <div className="images">
                    <div className="main_image">
                        <img src={`${impLinks}${land.main_image}`} alt="" />
                    </div>
                    <div className="other-images">
                        {
                        land?.images?.map((img,index)=> {
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
                    <div className={`title ${land?.property_type?.split(' ').join('')}`}>
                        {land.title}
                    </div>
                    <div className="price">
                        <div className="figure">
                            NRs. {land.price_in_number}
                        </div>
                        {
                            land?.price_negotiable && 
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
                    <div className={`btn listing-type ${(land?.listing_type)?.split(" ").join("-")}`}>
                        {land.listing_type}
                    </div>
                    <div className={`btn condition ${(land?.condition)?.split(" ").join('-')}`}>
                        {land.condition}
                    </div>
                    <div className="location">
                        <FontAwesomeIcon icon = {solid('location-pin')} />
                        <div className="info">
                            <span>
                                {land?.district}
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
                     
                    </div>
                    <div>
                    <div className="description">
                        {
                            active === 'overview' &&
                            <div className="overview-description">
                                <div className="desc">
                                    <h4>description</h4>
                                    {
                                        typeof land.description === 'string'
                                        && <p ref = {description}>
                                            {
                                                HtmlReactParser(land.description)
                                            }
                                    </p>
                                    }
                                </div>
                            </div>
                        }
                        {
                            active === 'details' &&
                            <div className="details-description">
                                {/* <div className="counts">
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
                                         */}
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
                                        <span>{land.zone}</span>
                                    </div>
                                    <div className="location-item">
                                        <span>district</span>
                                        <span>{land.district}</span>
                                    </div>
                                    <div className="location-item">
                                        <span>province</span>
                                        <span>{land.province}</span>
                                    </div>
                                    <div className="location-item">
                                        <span>landmark</span>
                                        <span>{land.landmark}</span>
                                    </div>
                                    {/* <div className="location-item">
                                        <span>land type</span>
                                        <span>{land.land}</span>
                                    </div> */}
                                    <div className="location-item">
                                        <span>road to property</span>
                                        <span>{land.road_to_property}</span>
                                    </div>
                                    <div className="location-item url">
                                        <span>youtube url</span>
                                        <a href={land.url} target = "_blank">
                                            {land.url}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            active === 'contact' &&
                            <div className="contact-description">
                                seller is of id {
                                    land?.seller
                                }
                            </div>
                        }
                        
                    </div>
                    </div>
            </div>
            <div className="map">
                    <Map lat = {land.latitude} lng = {land.longitude} />
                    {
                        console.log(`lat = ${land.latitude}`)
                    }
            </div>
        </div>
    </div>}
    </>
)
}

