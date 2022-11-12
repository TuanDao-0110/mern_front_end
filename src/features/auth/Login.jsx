import React from 'react'
import { store } from '../../app/store'

export default function Login() {
  console.log(store.getState())
  return (
    <h1>
        Login 
    </h1>
  )
}
