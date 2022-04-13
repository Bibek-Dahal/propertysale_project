import React,{useEffect, useState} from 'react'

export default function Timer({length,removeTimer}) {
    const [time,setTime] = useState(+length);

    useEffect(() => {
        let interval = setInterval(() => {
            if(time > 0) decreaseTime()
            else {
                removeTimer();
                clearInterval(interval)
            };
        },1000);
        return () => clearInterval(interval);
    },[time])
    
    const decreaseTime = () => {
        console.log('inside decreaseTime function')
        setTime(prev => prev - 1)
    }

    return (
        <div className='timer'>
            Re-try in {time} sec 
        </div>
  )
}
