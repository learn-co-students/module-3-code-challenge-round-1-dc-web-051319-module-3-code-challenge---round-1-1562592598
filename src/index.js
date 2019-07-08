document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2952

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()

  likeButton()

  commentSubmit()

function getImage(){
  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(data => retrieveImg(data))
}

function retrieveImg(pic){
  let img = document.getElementById("image")
  let name = document.getElementById('name')
  let likes = document.getElementById('likes')
  let ul = document.getElementById('comments')

  img.src = pic.url
  name.innerText = pic.name
  likes.innerText = pic.like_count
  getComments(pic, ul)

  
}


function getComments(pic, ul){
  let li = document.createElement('li')
  for(let i = 0; i < pic.comments.length; i++){
    let li = document.createElement('li')
    li.innerText = pic.comments[i].content
    ul.appendChild(li)  
  }
 return ul
}

function likeButton(){
 let likeBtn = document.getElementById('like_button')
 likeBtn.addEventListener('click', (e) => increaseLikes(e))
}

function increaseLikes(e){
  e.preventDefault()
  let likes = document.getElementById('likes')
  nuLike = parseInt(likes.innerText)
  nuLike = nuLike + 1
  sendLikeToDom(nuLike)
  return likes.innerText = nuLike
  
}

function sendLikeToDom(nuLike){
  fetch(`https://randopic.herokuapp.com/likes/`, {
    method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
    .then(resp => resp.json())
    .then(data => console.log(data))
}


function commentSubmit(){
  let commentForm = document.getElementById('comment_form')
  return commentForm.addEventListener('submit',  addCommentToDom)
}

function addCommentToDom(e){
  e.preventDefault()
  let ul = document.getElementById('comments')
  let li = document.createElement('li')
  let content = e.target.children[0].value
  li.innerText = content
  ul.appendChild(li)
  postComment(content)
  return ul
}


function postComment(content){
  
  fetch( `https://randopic.herokuapp.com/comments/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      content: content,
      image_id: imageId
    })
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}

})