import React from 'react'
import './DropZone.css';

export default function DropZone({name,onDropHandler}) {
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
        </div>
    )
}
