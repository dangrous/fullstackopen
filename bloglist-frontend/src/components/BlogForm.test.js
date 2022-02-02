import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm /> component', () => {
  test('sends a blog post from the form properly', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing a title here' }
    })
    fireEvent.change(author, {
      target: { value: 'testing author' }
    })
    fireEvent.change(url, {
      target: { value: 'http://example.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a title here')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('http://example.com')
  })
})