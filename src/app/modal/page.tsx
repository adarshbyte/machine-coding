'use client'
import Modal from "./Modal";
import React from 'react';

const Page = ()=>{
    const [openModal,setOpenModal]=React.useState(false);
    
    return <div style={{position:"relative"}}>
        {openModal && <Modal/>}
    </div>
}

export default Page;