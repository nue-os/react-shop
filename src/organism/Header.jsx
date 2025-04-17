import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import css from './Header.module.css'
import Logo from '../components/Logo'
import { debounce } from 'lodash'

const Header = () => {
  const [isOn, setIsOn] = useState(false)
  const location = useLocation()

  const addClassOn = () => {
    setIsOn(!isOn)
  }

  useEffect(() => {
    setIsOn(false)
  }, [location.pathname])

  // 디바운싱된 리사이즈 핸들러
  const debouncedResize = useMemo(
    () =>
      debounce(() => {
        if (window.innerWidth > 1100) {
          setIsOn(false)
        }
      }, 150),
    []
  )

  // const handleResize = throttle(() => {
  //   if (window.innerWidth > 1100) {
  //     setIsOn(false)
  //   }
  // }, 1000)

  useEffect(() => {
    window.addEventListener('resize', debouncedResize)

    if (isOn) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('resize', debouncedResize)
      debouncedResize.cancel() // 디바운싱 타이머 클리어
      document.body.style.overflow = ''
    }
  }, [debouncedResize, isOn])

  return (
    <header className={css.hd}>
      <div className={css.con}>
        <h1 className={css.logo}>
          <Link to={'/'}>
            <Logo />
          </Link>
        </h1>
        <div className={isOn ? `${css.gnb} ${css.on}` : css.gnb}>
          <nav>
            <CustomNavLink to="/shop" label="shop" />
            <CustomNavLink to="/blog" label="blog" />
            <CustomNavLink to="/about" label="about" />
          </nav>
          <div className={css.icon}>
            <CustomIconLink to="/cart" icon="bi-cart" />
            <CustomIconLink to="/search" icon="bi-search" />
            <CustomIconLink to="/mypage" icon="bi-person" />
          </div>
        </div>
        <i className={`${css.ham} bi bi-list`} title="전체 메뉴 보기 버튼" onClick={addClassOn}></i>
      </div>
    </header>
  )
}

const CustomNavLink = React.memo(({ to, label }) => (
  <NavLink className={({ isActive }) => (isActive ? `${css.active}` : '')} to={to}>
    {label}
  </NavLink>
))

const CustomIconLink = React.memo(({ to, icon }) => (
  <NavLink className={({ isActive }) => (isActive ? `${css.active}` : '')} to={to}>
    <i className={`bi ${icon}`}></i>
  </NavLink>
))

export default React.memo(Header)
