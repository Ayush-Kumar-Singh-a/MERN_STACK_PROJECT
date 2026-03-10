import { useState } from 'react'

import './App.css'
import { SignInButton , SignOutButton, UserButton } from '@clerk/react'

function App() {

  return (
    <>
    <h1>Welcome to the app</h1>

    <SignInButton >
      <button>
        Login
      </button>
    </SignInButton>
    <SignOutButton />
    <UserButton />
    </>
  );
}

export default App
