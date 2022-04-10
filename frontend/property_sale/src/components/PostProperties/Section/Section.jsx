import React, { useRef } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';


export default function Section({className , title, onChange,i, children}) {

  const h1 = useRef(null);
  const div = useRef(null);

  function expandListener(){
      console.log('transition ended')
      div.current.style.height = "auto";
  }

  const toggle = () => {
    if(div.current.getAttribute('aria-expanded') === 'false'){
      div.current.setAttribute('aria-expanded',"true")
    }else{
      div.current.setAttribute('aria-expanded',"false")
    }
    if(div.current.getAttribute('aria-expanded') === 'false'){
      div.current.style.height = 0;
      div.current.style.margin = " 0";
      div.current.parentElement.style.margin = "0";
      div.current.parentElement.style.padding = "0";
      div.current.removeEventListener('transitionend',expandListener)
    }else{
      div.current.style.height = div.current.scrollHeight + 'px';

      div.current.addEventListener('transitionend',expandListener) 
      div.current.style.margin = "1em 0";
      // div.current.parentElement.parentElement.style.gap = "1em";
      div.current.parentElement.style.margin = "1em 0";
      div.current.parentElement.style.padding = "1em 0";
      const totalSections = Array.from(div.current.parentElement.parentElement.children);
      const index = totalSections.forEach((section,index) => {
          if(section === div.current.parentElement) return index;
        }
      )
    }
  }
  function getIcon(){
    return i
  }

  return (
      <div className={className}>
          <div className="header" onClick = {toggle}>
              {
                  console.log(i)

              }
            {/* <FontAwesomeIcon icon = {} /> */}
            <h1 ref = {h1} >{title}</h1>
          </div>
          <div ref = {div} aria-expanded = "false">
            {children}
          </div>
          <div className="arrow">
              <FontAwesomeIcon icon = {solid('chevron-down')} />
          </div>
      </div>
  )
}
