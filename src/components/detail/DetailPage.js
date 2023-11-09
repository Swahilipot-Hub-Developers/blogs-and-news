import Link from 'next/link'
import React from 'react'

const DetailPage = ({title, disabled}) => {
  return (
    <div className='signUp'>
        <h1>{title}</h1>
       <div className='signUpSect'>
         <label>Name:</label>
         <input type='text' placeholder='Enter your username'/>
         <label>Password:</label>
         <input type='password' placeholder='Enter password'/>

         <p>Entering your details you consent to <strong>Terms and Conditions</strong> as well as the <strong>Privacy Policy</strong>
         
         </p>
         {!disabled?(
            <p>Already have an account? <Link href="/login"><strong style={{cursor:"pointer", color:"blue"}}>Login</strong></Link></p>
         ):('')}
         

         <button>{title}</button>

       </div>
         
    </div>
  )
}

export default DetailPage