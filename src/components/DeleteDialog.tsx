import React from 'react'
import { createPortal } from 'react-dom';
import { Close } from '@icon-park/react';

/*
    This file is used for creating a modal
*/

interface DeleteDialogProps{
    isOpen: boolean,
    handleDelete: () => void,
    close: () => void
}

const DeleteDialog = ({isOpen, handleDelete, close}:DeleteDialogProps) => {
    
    if (!isOpen) return null;

    return createPortal(
        <div className='flex items-center justify-center fixed z-[2] w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] p-4 text-black]' onClick={close}>
            <span className='bg-white w-96 rounded-md p-4 ring-2 ring-gray-300 flex flex-col gap-8'>
                <span className='flex items-center justify-between'>Are you sure you want to delete <Close className=' cursor-pointer' theme="outline" size="20" fill="#aaaaaa" strokeLinecap="square" onClick={close}/></span> 
                <span className='flex justify-end gap-2'>
                    <button className='px-4 py-1 ring-1 ring-gray-300 rounded-md' onClick={close}>Cancel</button>
                    <button className='px-4 py-1 ring-1 ring-gray-300 rounded-md bg-[#fc4903] text-white' onClick={(e) => { e.stopPropagation(); handleDelete()}}>Delete</button>
                </span> 
            </span>
        </div>,
        document.getElementById('modal')!
    );
}

export default DeleteDialog