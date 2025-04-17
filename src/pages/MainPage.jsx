import React, { lazy, Suspense } from 'react'
import LatestList from '../organism/LatestList'
import Loading from '../components/Loading'

const HeroSlider = lazy(() => import('@/organism/HeroSlider.jsx'))

const MainPage = () => {
  return (
    <main>
      <h2 hidden>MainPage</h2>
      <Suspense fallback={<Loading />}>
        <HeroSlider />
        <LatestList />
      </Suspense>
    </main>
  )
}

export default MainPage
