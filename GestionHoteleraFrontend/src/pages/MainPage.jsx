import React from 'react'

import { Outlet } from 'react-router-dom'
import { NavigationNav } from '../components/NavigateNav'


export const Home = () => {
  return (
    <>
    <NavigationNav/>
      <div>
    <Outlet/>
    </div>

    
    </>
  )
}