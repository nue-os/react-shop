import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import css from './Header.module.css'
import Logo from '../components/Logo'
import { debounce } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/store/themeSlice'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [isOn, setIsOn] = useState(false)

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

  /* 다크 모드 */
  // 1. useState 활용
  // const [isDarkmode, setIsDarkMode] = useState(false)

  // // 처음 마운트될 때 로컬 스토리지에 저장된 모드가 있으면 바꾸기
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme')
  //   if (savedTheme !== null) {
  //     const parsedTheme = JSON.parse(savedTheme)
  //     setIsDarkMode(parsedTheme)
  //     document.body.classList.toggle('dark-mode', parsedTheme) // 두 번째 매개변수의 true, false 의해 클래스 조작
  //   }
  // }, [])
  // const handleThemeToggle = () => {
  //   const newTheme = !isDarkmode
  //   setIsDarkMode(newTheme)
  //   localStorage.setItem('theme', JSON.stringify(newTheme))
  //   document.body.classList.toggle('dark-mode', newTheme)
  // }

  // 2. Redux 활용
  const { isDarkmode } = useSelector(state => state.theme)

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkmode))

    if (isDarkmode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkmode])

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
            <CustomNavLink to="/todos" label="todo" />
          </nav>
          <div className={css.icon}>
            <CustomIconLink to="/cart" icon="bi-cart" />
            <CustomIconLink to="/search" icon="bi-search" />
            <CustomIconLink to="/mypage" icon="bi-person" />
            <i
              className={`p-2 bi ${isDarkmode ? 'bi-moon' : 'bi-sun'}`}
              style={{ cursor: 'pointer' }}
              onClick={handleThemeToggle}
            ></i>
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
