import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import './GoBack.css';

export default function GoBack({currentPage}) {
  return (
    <div className='goBack'>
        <FontAwesomeIcon  icon = {solid('arrow-left')} />
        <h2>
            {currentPage}
        </h2>
    </div>
  )
}
