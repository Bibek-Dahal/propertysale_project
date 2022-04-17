import React,{useState,useEffect} from 'react'
import Input from '../postProperties/Input/Input'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from '../postProperties/Select/Select';
import axiosInstance from '../utils/axiosInstance';
import axiosLinks from '../../axiosLinks';
import Drop from '../postProperties/Drop';
import { useAuth } from '../../Hooks';
import Maps from '../Map/Map';
import { useLoadScript } from '@react-google-maps/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from 'react-router-dom';


export default function PostLand() {

    const [isLand,setIsLand] = useState(1);
    const navigate = useNavigate();
    const [data,setData] = useState({
       
    })
    const {state} = useAuth();

    const [keys,setKeys] = useState({})

    const temp = [1,2,3,4,5]
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
        setData(prev => {
            return{
                ...prev,
                latitude : location.lat,
                longitude : location.lng
            }
        })
    }


    const onChangeHandler = (e) => {
        console.log(e);
        console.log(`${[e.target.name]} = ${e.target.value}`)
        if(e.target.name === 'property_type' && e.target.value === 'House for rent'){
            setIsRent(1);
        } else if(e.target.name === 'property_type' && e.target.value === 'House for sale'){
            setIsRent(0);
        }
        setData(prev => {
            return{
            ...prev,
            [e.target.name] : e.target.value
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

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data);
        const postUrl = isLand ? axiosLinks.postLand : axiosLinks.postHouse;

        const temp = {...data};
        console.log('temp = ',temp)
        const certificate_image = temp["certificate_image"]
        const otherImages = temp["otherImages"];

        delete temp["certificate_image"]
        delete temp["otherImages"]

        let formData = new FormData();

        for(let d in temp){
            formData.append(d,temp[d]);
        }

        certificate_image?.forEach(img => {
            formData.append("certificate_image",img);
        })
        
        otherImages?.forEach(img => {
            formData.append(`additional_${isLand ? "land" : "house"}_image`,img);
        })
        formData.append('seller',state.user.user_id);
        formData.append('status','inactive');

        (
            async function(){
                try{
                    const res = await axiosInstance.post(postUrl,formData);
                    console.log(res)
                }catch(err){
                    console.log(err);
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
                            options = {temp}
                            onChange = {onChangeHandler}
                        />
                        <Select 
                            name = "district"
                            options = {temp}
                            onChange = {onChangeHandler}
                        />
                        <Select 
                            name = "zone"
                            options = {temp}
                            onChange = {onChangeHandler}
                        />
                        <Input
                            label = "zip"
                        >
                            <input type="text" name = "zip"onChange = {onChangeHandler}/>
                        </Input>
                        <Input
                            label = "landmark"
                        >
                            <input type="text" name = "landmark" onChange = {onChangeHandler} />
                        </Input>
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
                                label = "ropani"
                            >
                                <input name = "ropani" onChange = {onChangeHandler}/>
                            </Input>
                            <Input
                                label = "aana"
                            >
                                <input name = "aana" onChange = {onChangeHandler}/>
                            </Input>
                            <Input
                                label = "Paisa"
                            >
                                <input name = "paisa" onChange = {onChangeHandler}/>
                            </Input>
                            <Input
                                label = "daam"
                            >
                                <input name = "daam" onChange = {onChangeHandler}/>
                            </Input>
                        </div>
                        <Input
                            label = "road to property"
                        >
                            <input name = "road_to_property" onChange = {onChangeHandler}/>
                        </Input>
                        <Input
                            label = "access road"
                        >
                            <input name = "access_road" onChange = {onChangeHandler}/>
                        </Input>
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
                                        label = "Floors"
                                    >
                                        <input name = "floors" type="text" onChange = {onChangeHandler} />
                                    </Input>
                                    <Input 
                                        label = "Beds"
                                    >
                                        <input name = "beds" type="text" onChange = {onChangeHandler} />
                                    </Input>
                                    <Input 
                                        label = "Kitchen"
                                    >
                                        <input name = "kitchen" type="text" onChange = {onChangeHandler} />
                                    </Input>
                                    <Input 
                                        label = "Parking"
                                    >
                                        <input name = "parking" type="text" onChange = {onChangeHandler} />
                                    </Input>
                                    <Input 
                                        label = "Bath"
                                    >
                                        <input name = "bath" type="text" onChange = {onChangeHandler} />
                                    </Input>
                                </div>
                        }
                             
                                   
                        <Select 
                            name = "listing_type"
                            options = {keys?.listing_type}
                            onChange = {onChangeHandler}
                        />
                        <Input
                            label = "youtube url"
                        >
                            <input type="text" name = "url" onChange={onChangeHandler}/>
                        </Input>
                    </div>

                    <div className="section media">
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
                            label = "price in number"
w                        > 
                            <input type="text" name = "price_in_number" onChange = {onChangeHandler}/>
                        </Input>
                        <Input
                            label = "price in words"
                            
                        > 
                            <input type="text" name = "price_in_words" onChange = {onChangeHandler}/>
                        </Input>
                        {
                            isRent ?
                            <Select
                            options = {
                                ["month","year"]
                            }
                            name = "per"
                            onChange = {onChangeHandler}
                            >
                            </Select>:
                            null
                        }
                        
                        <Input
                            label = "price negotiable"
                        >
                            <input type="checkbox" value = "Yes" name = "price_negotiable" onChange = {checkboxHandler}/>
                        </Input>
                    </div>
                    <div className="section map">
                        <Maps onChangeHandler={onMapChangeHandler}/>
                    </div>
                    <button>submit</button>
            </form>
        </div>
     )
}
