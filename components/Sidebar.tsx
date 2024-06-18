import React from 'react'
import Navlinks from './Navlinks'
import SidebarHeader from './SidebarHeader'
import MemberProfile from './MemberProfile'

const Sidebar = () => {
  return (
    <div className='px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto, 1fr, auto]'>
        <SidebarHeader/>
        <Navlinks/>
        <MemberProfile/>
    </div>
  )
}

export default Sidebar