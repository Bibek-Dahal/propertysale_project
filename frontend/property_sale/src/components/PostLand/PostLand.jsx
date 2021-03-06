import React,{useState,useEffect} from 'react'
import Input from '../postProperties/Input/Input'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from '../postProperties/Select/Select';
// import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import Drop from '../postProperties/Drop';
import { useAuth, usePopup } from '../../Hooks';
import Maps from '../Map/Map';
import { useLoadScript } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom';
import { FullScreenLoading } from '../shared';
import { TextField } from '@mui/material';
import useAxios from '../../Hooks/useAxios';


export default function PostLand() {
    const axiosInstance = useAxios();

    const [isLand,setIsLand] = useState(1);
    const navigate = useNavigate();
    const [data,setData] = useState({
       
    })
    const [facility,setFacility] = useState([]);

    const {state} = useAuth();

    const [keys,setKeys] = useState({})

    const [posting,setPosting] = useState(0);
    const [errors,setErrors] = useState([]);
    const [errorKeys,setErrorKeys] = useState([]);
    const {showPopup} = usePopup();

    const temp = [1,2,3,4,5]
    const zone = [
        "bagmati",
        "bheri",
        "dhawalagiri",
        "gandaki",
        "janakpur",
        "karnali",
        "koshi",
        "lumbini",
        "mahakali",
        "mechi",
        "narayani",
        "rapti",
        "sagarmatha",
        "seti"
    ]
    const districts = [
        "achham",
    "arghakhanchi",
    "baglung",
    "baitadi",
    "bajhang",
    "bajura",
    "banke",
    "bara",
    "bardiya",
    "bhaktapur",
    "bhojpur",
    "chitwan",
    "dadeldhura",
    "dailekh",
    "dang deukhuri",
    "darchula",
    "dhading",
    "dhankuta",
    "dhanusa",
    "dholkha",
    "dolpa",
    "doti",
    "gorkha",
    "gulmi",
    "humla",
    "ilam",
    "jajarkot",
    "jhapa",
    "jumla",
    "kailali",
    "kalikot",
    "kanchanpur",
    "kapilvastu",
    "kaski",
    "kathmandu",
    "kavrepalanchok",
    "khotang",
    "lalitpur",
    "lamjung",
    "mahottari",
    "makwanpur",
    "manang",
    "morang",
    "mugu",
    "mustang",
    "myagdi",
    "nawalparasi",
    "nuwakot",
    "okhaldhunga",
    "palpa",
    "panchthar",
    "parbat",
    "parsa",
    "pyuthan",
    "ramechhap",
    "rasuwa",
    "rautahat",
    "rolpa",
    "rukum",
    "rupandehi",
    "salyan",
    "sankhuwasabha",
    "saptari",
    "sarlahi",
    "sindhuli",
    "sindhupalchok",
    "siraha",
    "solukhumbu",
    "sunsari",
    "surkhet",
    "syangja",
    "tanahu",
    "taplejung",
    "terhathum",
    "udayapur"
    ]
    const province = [1,2,3,4,5,6,7]
    
    const removeFromArray = (name,array) => {
        let toRemoveIndex;
        array.forEach((a,index) => {
            if(a === name){
                toRemoveIndex = index;
                array.splice(toRemoveIndex,1);
                return;
            }
        })
    }

    const facilityHandler = (e) => {
        console.log('setting facility = ',e.target.dataset.name)
        if(!facility.includes(e.target.dataset.name)){
            setFacility(prev => [...prev,e.target.dataset.name])
        }else{
            let temp = [...facility];
            removeFromArray(e.target.dataset.name,temp);
            console.log('after removing = ',temp)
            setFacility(temp);
        }
    }

    const isActive = (name) => {
        return facility.includes(name);
    }

    const onDescriptionChangeHandler = (event,editor) => {
        const data = editor.getData();
        setData(prev => {
            return{
            ...prev,
            description : data
            }
        })
    }
    const [isRent,setIsRent] = useState(0);
    const onTextChangeHandler = (e) => {
        setData(prev => {
            return{
                ...prev,
                title : e.target.value
            }
        })
    }

    const onMapChangeHandler = (location) => {
        console.log('setting',location)
        setData(prev => {
            return{
                ...prev,
                latitude : location.lat,
                longitude : location.lng
            }
        })
    }


    const onChangeHandler = (e,name) => {
        console.log(e);
        console.log(`${[e.target.name]} = ${e.target.value}`,name)
        if((e.target.name ? e.target.name : name) === 'property_type' && e.target.value === 'House for rent'){
            setIsRent(1);
        }
        if(e.target.name === 'property_type' && e.target.value === 'House for sale'){
            setIsRent(0);
            console.log('set is rent to 0')
        }
        setData(prev => {
            return{
                ...prev,
                [e.target.name ? e.target.name : name] : e.target.value
            }
        })
    }

    function checkboxHandler(e){
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

    useEffect(() => {
        console.log('inside pp');

        (
            async function(){
                try{
                    const res = await axiosInstance.get(axiosLinks.foreignKeys)
                    console.log(res)
                    setKeys(prev => {
                        return res.data
                    })
                }catch(err){
                    console.log(err)
                }
            }
        )()
            
        function checkIfLand(){
            if(location.pathname.split('/').pop() === 'post-house'){
                console.log('isPostLand');
                setIsLand(0);
            } 
        }

        checkIfLand();

    },[])

    const onChangeImages = (images,name) => {
        console.log(images,name)
        setData(prev => {
            return{
                ...prev,
                [name]:images
            }
        })
    }
    
    const validateForm = (data) => {
        console.log('validaing',data);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data);

        if(validateForm(data) === false){
            window.scroll(0,0);
            console.log('error occured');
            showPopup('some fields are empty','error')
            return;
        }

        const postUrl = isLand ? axiosLinks.postLand : axiosLinks.postHouse;
        console.log(data)
        const temp = {...data};
        console.log(temp)
        const certificate_image = temp["certificate_image"]
        const otherImages = temp["otherImages"];
        const main_image = temp["main_image"];

        console.log(`main-image = `,main_image)

        delete temp["certificate_image"];
        delete temp["otherImages"];
        delete temp["main_image"];

        console.log('deleted ',temp)

        let formData = new FormData();
        
        if(main_image){
            formData.append('main_image',main_image[0])
        }

        for(let d in temp){
            formData.append(d,temp[d]);
        }

        certificate_image?.forEach(img => {
            console.log('img = ',img)
            formData.append("certificate_image",img);
        })
        otherImages?.forEach(img => {
            formData.append(`additional_${isLand ? "land" : "house"}_image`,img);
        })
        formData.append('seller',state.user.user_id);
        formData.append('status','Down');
        // formData.append('main_image',main_image);
        facility.forEach(f => formData.append('facility',f))
        setPosting(1);
        (
            async function(){
                try{
                    const res = await axiosInstance.post(postUrl,formData);
                    console.log(res)
                    setPosting(0);
                    navigate('/user/my-properties')
                }catch(err){
                    console.log(err.response.data);
                    setErrors(Object.values(err.response.data))
                    setErrorKeys(Object.keys(err.response.data))
                    setPosting(0);
                    window.scroll(0,0)
                }
            }

        )()
    }

    return (
        <div className="post-container post-properties">
            
            <form onSubmit={submitHandler}>
                
                    <div className="title">
                        <div className="go-back" onClick = {() => {
                            navigate('/user/post-properties/')
                        }}>
                        <FontAwesomeIcon icon = {solid('arrow-left')} />
                        </div>
                        <p>{isLand ? "Land" : "House"}</p>
                    </div>
                    {
                        errors.length > 0 &&
                        <ul className="errors">
                            <div className="close" onClick={() => {setErrors([])}}>
                                <FontAwesomeIcon icon = {solid('times')}/>
                            </div>
                            {
                               errors.map((err,index) => {
                                   return(
                                       <li>
                                           <span className = "errorKey">{errorKeys[index]}</span>
                                            <span className = "errorValue">{err}</span>
                                        </li>
                                   )
                               })
                            }
                        </ul>
                    }
                    <div className="basic_details section">
                        <h1>Basic Details</h1>
                        <Input 
                                label = "title"
                        >
                        <input type="text" name = "title"  onChange={onTextChangeHandler}/>
                        </Input>

                        <Input 
                        label = "description"
                        // error = {error.description}
                        required
                        >
                            <div className="editor" id = "editor">
                            <CKEditor 
                                editor={ ClassicEditor }
                                // onReady={ editor => {
                                //     // You can store the "editor" and use when it is needed.
                                //     console.log( 'Editor is ready to use!', editor );
                                // } }
                                onChange={onDescriptionChangeHandler}
                                // onBlur={ ( event, editor ) => {
                                //     console.log( 'Blur.', editor );
                                // } }
                                // onFocus={ ( event, editor ) => {
                                //     console.log( 'Focus.', editor );
                                // } }
                            />
                            </div>
                        </Input>
                    </div>
                    
                    <div className="address section">
                        <h1>Address</h1>
                        <Select 
                            name = "province"
                            options = {province}
                            onChange = {onChangeHandler}
                            width = "20ch"
                        />
                        <Select 
                            name = "district"
                            options = {districts}
                            onChange = {onChangeHandler}
                            width = "20ch"
                        />
                        <Select 
                            name = "zone"
                            options = {zone}
                            onChange = {onChangeHandler}
                            width = "20ch"
                        />
                        <TextField 
                            name = "zip"
                            label = "zip"
                            onChange = {onChangeHandler}
                            width = "20ch"
                        />
                        <Input 
                            name = "landmark"
                            label = "Landmark"
                            onChange = {onChangeHandler}
                            width = "40ch"
                        />
                        
                    </div>

                    <div className="areaAndRoad section">
                        <h1>Area and Road</h1>
                        <Select
                            name = "face_towards"
                            onChange = {onChangeHandler}
                            options = {keys?.face_towards}
                        />
                        <div className="area">
                            <Select 
                                name = "area"
                                onChange = {onChangeHandler}
                                options = {keys?.area_type}
                            />
                            <Input 
                                name = "ropani"
                                label = "Ropani"
                                onChange = {onChangeHandler}
                                width = "15ch"
                            />
                            <Input 
                                name = "aana"
                                label = "aana"
                                onChange = {onChangeHandler}
                                width = "15ch"
                            />
                            <Input 
                                name = "paisa"
                                label = "paisa"
                                onChange = {onChangeHandler}
                                width = "15ch"
                            />
                            <Input 
                                name = "daam"
                                label = "daam"
                                onChange = {onChangeHandler}
                                width = "15ch"
                            />
                            
                        </div>
                        <Input 
                                name = "road_to_property"
                                label = "Road to property"
                                onChange = {onChangeHandler}
                                width = "40ch"
                            />
                         <Input 
                                name = "access_road"
                                label = "Access road"
                                onChange = {onChangeHandler}
                                width = "40ch"
                            />
                    </div>

                    <div className="additional-details section">
                        <h1>Additional details</h1>
                        {
                            !isLand && 
                                <Select 
                                    name = "property_type"
                                    options = {keys?.property_type }
                                    onChange = {onChangeHandler}
                                    />
                        }
                        {
                            !isLand && 
                                <Select 
                                    name = "house_type"
                                    options = {keys?.house_type }
                                    onChange = {onChangeHandler}
                                    />
                        }
                        {
                            !isLand && 
                                <Select 
                                    name = "condition"
                                    options = {keys?.listing_condition}
                                    onChange = {onChangeHandler}
                                />
                        }
                        {
                            !isLand && 
                                <Select 
                                    name = "furnishing"
                                    options = {keys?.furnishing_type}
                                    onChange = {onChangeHandler}
                                />  
                        }
                        {
                            !isLand && 
                                <div className="small-details">
                                    <Input 
                                        name = "floors"
                                        label = "floor"
                                        onChange = {onChangeHandler}
                                        width = "20ch"
                                    />
                                    <Input 
                                        name = "beds"
                                        label = "beds"
                                        onChange = {onChangeHandler}
                                        width = "20ch"
                                    />
                                     <Input 
                                        name = "kitchen"
                                        label = "kitchen"
                                        onChange = {onChangeHandler}
                                        width = "20ch"
                                    />
                                    <Input 
                                        name = "bath"
                                        label = "bath"
                                        onChange = {onChangeHandler}
                                        width = "20ch"
                                    />
                                     <Input 
                                        name = "parking"
                                        label = "parking"
                                        onChange = {onChangeHandler}
                                        width = "20ch"
                                    />
                                </div>
                        }
                       
                        <Select 
                            name = "listing_type"
                            options = {keys?.listing_type}
                            onChange = {onChangeHandler}
                            width = "40ch"
                        />
                        <Input
                            label = "youtube url"
                            name = "url"
                            onChange = {onChangeHandler}
                            width = "50ch"
                        />
                        {
                            !isLand &&
                            <div className="facilities">
                                <label htmlFor="">facilities</label>
                                <div className="contents">
                                    {
                                        keys?.facility?.map(f => {
                                            return (
                                                <div 
                                                    data-name = {f}
                                                    className={`facility ${f.split(" ").join("")} ${isActive(f) ? "active" : ""}`}
                                                    onClick = {facilityHandler}>
                                                        {f}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="section media">
{/* 
                        {
                            console.log('inside postLand',data)
                        } */}
                        <h1>Media</h1>
                        <Input 
                            label = "Main Image"
                        >
                        <Drop 
                            height = "100px"
                            name = "main_image"
                            multiple = {false}
                            placeholder = "Drop files or click to upload"
                            onChangeImages = {onChangeImages}
                        />
                        </Input>
                        <Input 
                        label = "Property images"
                        >
                        <Drop
                            height = "100px"
                            name = "otherImages"
                            multiple = {true}
                            placeholder="Drop files or Click to upload"
                            onChangeImages = {onChangeImages}
                        />
                        </Input>
            
                        <Input 
                            label = "Certificate images"
                        >
                        <Drop
                            height = "100px"
                            name = "certificate_image"
                            multiple = {true}
                            placeholder="Drop files or Click to upload"
                            onChangeImages = {onChangeImages}
                        />
                        </Input>
                    </div>
                    <div className="section price">
                        <h1>Price</h1>
                        <Input
                            label = "Price in number"
                            name = "price_in_number"
                            onChange = {onChangeHandler}
                            width = "20ch"
                        />
                         <Input
                            label = "Price in words"
                            name = "price_in_words"
                            onChange = {onChangeHandler}
                            width = "50ch"
                        />
                        {
                            isRent ?
                            <Select 
                                name = "per"
                                options = {
                                    ["month","year"]
                                }
                                onChange = {onChangeHandler}
                                width = "20ch"
                            />:
                            null
                        }
                        
                        <Input
                            label = "price negotiable"
                        >
                            <input style = {{
                                height:"15px",
                                width:"15px"
                            }}
                            type="checkbox" value = "Yes" name = "price_negotiable" onChange = {checkboxHandler}/>
                        </Input>
                    </div>
                    <div className="section map">
                        <div className="">
                            <Maps onChangeHandler={onMapChangeHandler} setData = {setData}/>
                        </div>
                    </div>
                    {
                        posting ? 
                        <FullScreenLoading />:
                        <button>submit</button>
                    }
            </form>
        </div>
     )
}
