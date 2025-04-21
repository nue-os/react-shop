import React, { useState } from 'react'
import css from './DetailTabInfo.module.css'

const DetailTabInfo = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabTitles = ['Description', 'Additional Information', 'Reviews']
  return (
    <>
      <div className={css.tabBtn}>
        {tabTitles.map((title, idx) => (
          <button
            key={idx}
            className={activeTab === idx ? css.active : ''}
            onClick={() => setActiveTab(idx)}
          >
            {title}
          </button>
        ))}
      </div>
      {activeTab === 0 && (
        <div className={`${css.tabContent} ${activeTab === 0 ? css.visible : ''}`}>
          <h3>제목1</h3>
          <p>내용</p>
          <p>내용</p>
          <p>내용</p>
        </div>
      )}
      {activeTab === 1 && (
        <div className={`${css.tabContent} ${activeTab === 1 ? css.visible : ''}`}>
          <h3>제목2</h3>
          <p>내용</p>
          <p>내용</p>
          <p>내용</p>
        </div>
      )}
      {activeTab === 2 && (
        <div className={`${css.tabContent} ${activeTab === 2 ? css.visible : ''}`}>
          <h3>제목3</h3>
        </div>
      )}
    </>
  )
}

export default React.memo(DetailTabInfo)
