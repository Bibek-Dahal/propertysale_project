import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Icon from '../../Icons/Icon';

export default function GoogleLogin({client_id}) {
// https://accounts.google.com/o/oauth2/v2/auth?client_id=875590078894-k4ppsridi538d23bqoi9cr9nap05kc72.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:4000/oauth/google&response_type=code&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly

  return (
     <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=211100097274-8fkbk3jk57sfs0cvn5sd4u4s6vft353q.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/oauth/google&response_type=code&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly">
     <Icon icon="google" height = "23"/>
 </a>
  )
}
