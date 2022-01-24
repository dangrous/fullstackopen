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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}