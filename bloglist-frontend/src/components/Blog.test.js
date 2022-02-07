import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component', () => {
  let component

  const addMockLike = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'This is a blog title',
      author: 'Testing Author',
      url: 'http://www.example.com',
      likes: 69420,
      user: { username: 'tester' }
    }

    component = render(
      <Blog
        blog={blog}
        username='tester'
        updateBlog={addMockLike}
        removeBlog={() => 0}
      />
    )
  })

  test('renders author and title but not url or likes by default', () => {
    expect(component.container).toHaveTextContent('This is a blog title')
    expect(component.container).toHaveTextContent('Testing Author')
    expect(component.container).not.toHaveTextContent('http://www.example.com')
    expect(component.container).not.toHaveTextContent('69420')
  })

  test('clicking the view button shows url and likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('This is a blog title')
    expect(component.container).toHaveTextContent('Testing Author')
    expect(component.container).toHaveTextContent('http://www.example.com')
    expect(component.container).toHaveTextContent('69420')
  })

  test('clicking the like button increases the like count each time', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    expect(addMockLike.mock.calls).toHaveLength(1)

    fireEvent.click(likeButton)
    expect(addMockLike.mock.calls).toHaveLength(2)
  })
})