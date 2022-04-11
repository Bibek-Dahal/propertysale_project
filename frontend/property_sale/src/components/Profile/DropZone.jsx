import React from 'react'
import './DropZone.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'


export default function DropZone({name,onDropHandler,placeholder}) {
    function DragEnterHandler(e){
        e.preventDefault();
        console.log('drag entered')
    }
    function DropHandler(e){
        e.preventDefault();
        console.log('drop entered')
        console.log(e.dataTransfer.files[0])
        onDropHandler(e,name)
    }
    function DragleaveHandler(e){
        console.log('drag leave')
        e.target.classList.remove('hover');

    }
    function DragOverHandler(e){
        e.preventDefault();
        console.log('dragged over')
        e.target.classList.add('hover');
    }

    return (
        <div 
            className="dropzone" 
            onDragEnter = {DragEnterHandler}
            onDrop = {DropHandler}
            onDragLeave = {DragleaveHandler}
            onDragOver = {DragOverHandler}
        >
            <div className="placeholder">
                <FontAwesomeIcon icon = {solid('cloud-arrow-up')}/>
                <p>{placeholder}</p>
            </div>
        </div>
    )
}
