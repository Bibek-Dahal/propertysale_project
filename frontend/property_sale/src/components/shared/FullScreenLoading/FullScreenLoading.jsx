import React from 'react'
import './FullScreenLoading.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function FullScreenLoading() {
  return (
    <div id = "full-screen-loading">
        <FontAwesomeIcon  icon = {solid('circle-notch')} className = "fa-spin" />
        <p>Work in progress. Please wait..</p>
    </div>
  )
}
