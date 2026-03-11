import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <button className='btn btn-primary' onClick={() => toast.success("YES SIRR!!!")}>Get Started</button>
      <SignInButton>SignIn</SignInButton>
    </div>
  )
}

export default HomePage
