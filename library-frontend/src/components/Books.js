import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all')

  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  let genres = []

  books.map((b) => {
    b.genres.map((g) => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })

  if (filter !== 'all') {
    books = books.filter((b) => b.genres.includes(filter))
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{filter}</strong>
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
        <button onClick={() => setFilter('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
