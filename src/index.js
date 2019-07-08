document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2961 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL)

})


// FETCH IMAGEID
function fetchImage(imageURL){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => renderImage(image))
}
// RENDER THE IMAGE
function renderImage(image){
// console.log(image)
  // IMAGE TITLE
  let nameh4 = document.getElementById('name')
  nameh4.innerText = image.name
  // IMAGE SRC
  let img = document.getElementById('image')
  img.src = image.url
  img.dataset.imgId = image.id
  // LIKES
  let likes = document.getElementById('likes')
  likes.innerText = image.like_count
  liking(image)
  // COMMENTS
  let comments = image.comments
  comments.forEach(comment => renderComments(comment))
}
// RENDER COMMENTS
function renderComments(comment){
  let li = document.createElement('li')
  li.dataset.Id = comment.id
  li.innerText = comment.content

  let ul = document.getElementById('comments')
  ul.appendChild(li)
}

// LIKE EVENT
function liking(image){
  let likeBtn = document.getElementById('like_button')
  likeBtn.addEventListener('click', function(){

    let like = document.getElementById('likes')
    let number = parseInt(image.like_count)
    number ++
    like.innerText = number 
    // console.log(image.like_count)
  })

  fetch('https://randopic.herokuapp.com/likes/',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: 2961
    })
  })

}