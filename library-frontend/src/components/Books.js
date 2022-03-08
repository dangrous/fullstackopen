import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState([])

  const { loading, data } = useQuery(ALL_BOOKS, {
    skip: !props.show,
    variables: { genre: filter },
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  let books = data.allBooks

  books.map((b) => {
    b.genres.map((g) => {
      if (!genres.includes(g)) {
        setGenres([...genres, g])
      }
      return 0
    })
    return 0
  })

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{filter ? filter : 'all'}</strong>
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
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
