import React from 'react'
import { Link } from 'react-router-dom'
import NLink from '../Nav/NLink/NLink'

export default function Profile() {
  return (
    <div>
        <h1>Profile </h1>
        <NLink to="/user/kyc">
            Fill Kyc
        </NLink>
    </div>
  )
}
