import React from 'react'
import qs from 'query-string'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

const LIMIT_OPTIONS = [
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
]

const fetchArtists = async ({ queryKey }) => {
  const [_, options] = queryKey
  const url = `${import.meta.env.VITE_API_URL}/?${qs.stringify(options)}`
  const res = await fetch(url)
  return await res.json()
}

function ViewArtists() {
  const history = useHistory()
  const location = useLocation()

  const { limit = LIMIT_OPTIONS[0].value, page = 1 } = qs.parse(location.search)

  const { isLoading, error, data } = useQuery(
    ['artists', { limit, page }],
    fetchArtists,
  )

  const handleLimitChange = (e) => {
    history.push({ search: qs.stringify({ limit: e.target.value, page: 1 }) })
  }

  const handlePageChange = (e) => {
    history.push({ search: qs.stringify({ limit, page: e.target.value }) })
  }

  if (isLoading) {
    return <span>Loading ...</span>
  }

  if (error) {
    return <span>Error...</span>
  }

  return (
    <div>
      <div className='flex py-4 space-x-6'>
        <div>
          Limit:
          <select onChange={handleLimitChange} value={limit}>
            {LIMIT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          Page:
          <select onChange={handlePageChange} value={page}>
            {Array(data.totalPages || 0)
              .fill(0)
              .map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='my-6 bg-white rounded shadow-md'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr>
              <th className='px-6 py-4 text-sm font-bold text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
                ID
              </th>
              <th className='px-6 py-4 text-sm font-bold text-gray-500 uppercase bg-gray-100 border-b border-gray-200'>
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((datum) => (
              <tr key={datum.ArtistId} className='hover:bg-gray-100'>
                <td className='px-6 py-4 border-b border-gray-200'>
                  {datum.ArtistId}
                </td>
                <td className='px-6 py-4 border-b border-gray-200'>
                  {datum.Name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewArtists
