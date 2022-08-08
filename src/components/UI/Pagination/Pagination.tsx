import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

interface IPaginationProps {
  totalPage: number
}

const Pagination: React.FC<IPaginationProps> = ({ totalPage }) => {
  const handlePageClick = (data: { selected: number }) => {
    console.log(data.selected + 1)
  }

  return (
    <div className={styles.pagination}>
      <ReactPaginate
        pageCount={totalPage}
        previousLabel={'<'}
        nextLabel={'>'}
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        containerClassName={styles.pagination__container}
        pageClassName={styles.pagination__item}
        pageLinkClassName={styles.pagination__link}
        previousClassName={styles.pagination__item}
        previousLinkClassName={styles.pagination__link}
        nextClassName={styles.pagination__item}
        nextLinkClassName={styles.pagination__link}
        breakClassName={styles.pagination__item}
        breakLinkClassName={styles.pagination__link}
        activeClassName={styles.pagination__active}
      />
    </div>
  )
}

export default Pagination
