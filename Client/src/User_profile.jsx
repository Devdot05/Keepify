import React from 'react'
import { useParams } from 'react-router-dom'

const User_profile = () => {
    let {id} = useParams()
    console.log(id);
    
  return (
    <div>User_profile: {id}</div>
  )
}

export default User_profile