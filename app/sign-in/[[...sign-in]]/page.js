import React from 'react'
import { SignIn } from '@clerk/nextjs'
const SigninPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'> 
        <SignIn/>
    </div>
  )
}

export default SigninPage