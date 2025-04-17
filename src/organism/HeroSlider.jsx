import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import css from './HeroSlider.module.css'
import { Link } from 'react-router-dom'
import { getBannerData } from '../api/bannerApi'

const HeroSlider = () => {
  const [banner, setBanner] = useState([])
  const [loading, setLoading] = useState(false)

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  useEffect(() => {
    // 배너 데이터를 가져오기 전에 미리 첫 번째 이미지 프리로드
    const preloadFirstImage = () => {
      const img = new Image()
      img.src = '/public/vite.svg' // 첫 번째 이미지 경로를 알고 있다면 직접 지정
    }
    preloadFirstImage()

    const fetchBanner = async () => {
      try {
        setLoading(true) // 로딩 O
        const data = await getBannerData()

        await delay(1000) // 1초 지연

        setBanner(data)
        setLoading(false) // 로딩 X
      } catch (err) {
        console.log('[error]', err)
        setLoading(false) // 로딩 X
      }
    }
    fetchBanner()
  }, [])

  return (
    <section>
      <h2 hidden>Banner Event</h2>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} className={css.mainSlider}>
        {loading ? (
          <SwiperSlide>
            <div className={`${css.skeleton} ${css.imgWrap}`}></div>
          </SwiperSlide>
        ) : (
          banner.map(item => (
            <SwiperSlide key={item.id}>
              <div className={css.imgWrap}>
                <img src={item.img} alt={item.title} />
              </div>
              <div className={css.textWrap}>
                <p className={css.title}>{item.title}</p>
                <p className={css.desc}>{item.description}</p>
                <Link to={item.link} className={css.more}>
                  View Product
                </Link>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  )
}

export default HeroSlider
