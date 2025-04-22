import React from 'react'
import css from './Pagination.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Pagination = ({ products }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('_page') || 1)

  const { first, last, prev, next, pages } = products

  const handlePageChange = page => {
    const params = new URLSearchParams(searchParams)
    params.set('_page', page)
    navigate(`/shop/?${params}`)
  }

  // 페이지 번호 계산 함수
  const getPageNumbers = () => {
    // 한번에 보여줄 최대 페이지 번호 수
    const maxPageNumber = 10

    // 전체 페이지기가 최대 페이지보다 작으면 전체 페이지 번호 표시
    if (pages <= maxPageNumber) {
      return Array.from({ length: maxPageNumber }, (_, i) => i + 1)
    }

    // 페이지가 많을 경우 현재 페이지 번호를 기준으로 주변 번호 생성
    // ex) 현재 페이지: 15 => 11 ~ 20까지 보여줌
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumber / 2) + 1)
    let endPage = Math.min(pages, startPage + maxPageNumber - 1)

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getPageNumbers()
  console.log(pageNumbers)

  return (
    <div className={css.paginationArea}>
      <button onClick={() => handlePageChange(first)} disabled={currentPage === first}>
        처음으로
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
        끝으로
      </button>
    </div>
  )
}

export default Pagination
