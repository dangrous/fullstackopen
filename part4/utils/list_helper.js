const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((prev, cur) => prev + cur.likes, 0)
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  
  for (let blog of blogs) {
    if (favoriteBlog === null || blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  }

  return favoriteBlog 
}

const mostBlogs = (blogs) => {
  let authors = {}
  let maxAuthor = {
    author: null,
    blogs: 0
  }

  for (let blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }

    if (authors[blog.author] > maxAuthor.blogs) {
      maxAuthor.author = blog.author
      maxAuthor.blogs = authors[blog.author]
    }
  }

  return maxAuthor
}

const mostLikes = (blogs) => {
  let authors = {}
  let maxAuthor = {
    author: null,
    likes: 0
  }

  for (let blog of blogs) {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }

    if (authors[blog.author] > maxAuthor.likes) {
      maxAuthor.author = blog.author
      maxAuthor.likes = authors[blog.author]
    }
  }

  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}