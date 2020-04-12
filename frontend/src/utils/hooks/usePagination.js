import { useState } from 'react'

const usePagination = ({ limit, categoryIds = [], totalProducts = 0 }) => {
  const [offset, setOffset] = useState(0)

  const filter = JSON.stringify({ limit, offset, relations: { categories: { id: categoryIds } } })

  const setPage = (page) => setOffset(page * limit - limit)

  const pageCount = Math.ceil(totalProducts / limit)
  const hasPagination = totalProducts > limit

  return { filter, setPage, pageCount, hasPagination }
}

export default usePagination
