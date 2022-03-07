import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_FAVORITE_GENRE } from '../queries'

const Recommendations = (props) => {
  const genreQuery = useQuery(GET_FAVORITE_GENRE, {
    skip: !props.show,
  })

  const result = useQuery(ALL_BOOKS, {
    skip: !props.show,
  })

  if (!props.show) {
    return null
  }

  if (genreQuery.loading || result.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = genreQuery.data.me.favoriteGenre

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => b.genres.includes(favoriteGenre))
            .map((b) => (
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
