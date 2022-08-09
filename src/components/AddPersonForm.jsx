import '../styles/Form.css'
import React, { useRef, useState } from 'react'
import { getImageUrl, writeData } from '../utils/firebase'
import { Link } from 'react-router-dom'


function AddPersonForm() {
    const [name, setName]= useState('')
    const [dob, setDob]= useState('')

    const fileRef=useRef('')

    const handleSubmit= ()=>{
        if(name&&dob&&fileRef.current){
            getImageUrl(
                fileRef.current.files[0], 
                fileRef.current.files[0].name, 
                (url)=>{
                    writeData(name, dob, url)
                    alert("Data Added")
                }
            )
        }
    }

  return (
    <div className='container'>
        <div className='card'>
        <div className='item'>
            <label htmlFor="name">NAME</label>
            <input id='name' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
        <div className='item'>
            <label htmlFor="dob">DOB</label>
            <input id='dob' type='date' value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
        </div>
        <div className='item'>
            <input id='image' ref={fileRef} type='file' />
        </div>
        <div className='item buttons'>
            <button type='submit' onClick={handleSubmit}>Submit</button>
                <Link to='/' className='back'>
                    <button>B'days Today</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default AddPersonForm