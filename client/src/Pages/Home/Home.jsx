import React from 'react'
import Layout from './components/Layout.jsx'
import Nav from './components/Nav.jsx'

export default function Home() {
  return (
    <>
      <div className='bg-gray-200 h-full'>
        <Nav />
        <Layout />
      </div>

    </>
  )
}
