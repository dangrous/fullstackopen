import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('loading')
  const [born, setBorn] = useState('')

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    editBirthyear({ variables: { name, born } })
  }

  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const editForm = () => {
    return (
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name{' '}
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((a) => (
                <option value={a.name} key={`option ${a.name}`}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born{' '}
            <input
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
        {props.token ? editForm : null}
      </table>
    </div>
  )
}

export default Authors
