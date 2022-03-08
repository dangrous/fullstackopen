import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_FAVORITE_GENRE } from '../queries'
import { useState, useEffect } from 'react'

const Recommendations = (props) => {
  const [filter, setFilter] = useState(null)

  const bookResult = useQuery(ALL_BOOKS, {
    skip: !props.show,
    variables: { genre: filter },
  })

  const genreResult = useQuery(GET_FAVORITE_GENRE, {
    skip: !props.show,
  })

  useEffect(() => {
    if (genreResult.data) {
      setFilter(genreResult.data.me.favoriteGenre)
    }
  }, [genreResult])

  if (!props.show) {
    return null
  }

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  let books = bookResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{filter}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
