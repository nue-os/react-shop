import React, { useEffect, useState } from 'react'
import css from './Pagination.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { throttle } from '@/utils/feature'

const Pagination = ({ products }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('_page') || 1)

  const { first, last, prev, next, pages } = products

  // 모바일 감지 상태
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지 로직 (throttle 적용)
  useEffect(() => {
    // 모바일 상태 확인 함수
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 초기 로드시 확인
    checkMobile()

    // throttle 적용한 리사이즈 이벤트 핸들러
    const handleResize = throttle(checkMobile, 200)

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams)
    params.set('_page', page)
    navigate(`/shop/?${params}`)
  }

  // 페이지 번호 계산 함수
  const getPageNumbers = () => {
    // 한번에 보여줄 최대 페이지 번호 수
    const maxPageNumber = isMobile ? 3 : 10

    // 전체 페이지기가 최대 페이지보다 작으면 전체 페이지 번호 표시
    if (pages <= maxPageNumber) {
      return Array.from({ length: pages }, (_, i) => i + 1)
    }

    // 현재 페이지를 기준으로 startPage 계산 (최소 1 이상)
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumber / 2))
    // 시작 페이지로부터 maxPageNumber만큼 범위를 잡되, 최대 페이지 수를 넘지 않게 제한
    let endPage = Math.min(pages, startPage + maxPageNumber - 1)
    // endPage 기준으로 다시 startPage 보정 (1 미만으로 내려가지 않게)
    startPage = Math.max(1, endPage - maxPageNumber + 1)

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getPageNumbers()
  console.log(pageNumbers)

  return (
    <div className={css.paginationArea}>
      <button onClick={() => handlePageChange(first)} disabled={currentPage === first}>
        <i className="bi bi-chevron-left"></i>
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        onClick={() => handlePageChange(prev)}
        disabled={prev === null || currentPage === first}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={num === currentPage ? css.active : ''}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(next)}
        disabled={next === null || currentPage === last}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
      <button onClick={() => handlePageChange(last)} disabled={currentPage === last}>
        <i className="bi bi-chevron-right"></i>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}

export default Pagination
