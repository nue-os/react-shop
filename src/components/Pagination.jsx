import React from 'react'
import css from './Pagination.module.css'

const Pagination = () => {
  return (
    <div className={css.paginationArea}>
      <button>
        <i className="bi bi-chevron-left"></i>
      </button>
      <button>1</button>
      <button className={css.active}>2</button>
      <button>3</button>
      <button>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}

export default Pagination
