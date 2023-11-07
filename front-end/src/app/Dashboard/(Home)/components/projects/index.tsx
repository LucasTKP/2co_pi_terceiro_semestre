'use client'
import React, { useState } from 'react'
import TopBarProjects from './topBarProjects'
import ShowProjects from './showProjects'

function Projects() {
  const [textSearch, setTextSearch] = useState('')
  return (
    <div className='mt-[50px] px-[50px]'>
      <TopBarProjects setTextSearch={setTextSearch} />
      <ShowProjects textSearch={textSearch}/>
    </div>
  )
}

export default Projects