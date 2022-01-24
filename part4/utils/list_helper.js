const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((prev, cur) => prev + cur.likes, 0)
  return totalLikes
}

module.exports = {
  dummy,
  totalLikes
}