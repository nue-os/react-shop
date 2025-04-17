import React, { Suspense } from 'react'
import Header from '@/organism/Header'
import { Outlet } from 'react-router-dom'
import Footer from '@/organism/Footer'
import Loading from '../components/Loading'

const Default = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>

      <Footer />
    </>
  )
}

export default Default
