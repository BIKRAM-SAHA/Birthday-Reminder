import React from 'react'

function ListComponent({ person, displayDOB=false }) {
  const dob= new Date(person.dob)
  const Age= Math.abs((new Date(Date.now() - dob.getTime())).getUTCFullYear()- 1970)

  return (
    <div className='card-row'>
      <img src={person.image} alt='profile' className='card-img'
      height='90px'
      width='90px'/>
      <div className='info'>
        <h3>{person.name}</h3>
        <p>{Age} yo</p>
        {displayDOB && <p>{person.dob}</p>}
      </div>
    </div>
  )
}

export default ListComponent