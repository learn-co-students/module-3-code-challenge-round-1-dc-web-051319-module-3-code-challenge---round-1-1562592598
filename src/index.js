document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2952

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage()

////////////////////////////GETTING HTML///////////////////////////////
function getUl(){
  return document.getElementById('comments')
}

function getImgName(){
  return document.getElementById('name')
}

function getImgLikes(){
  return document.getElementById('likes')
}

function getImg(){
  return document.getElementById("image")
}

function getImage(){
  fetch(imageURL)
    .then(resp => resp.json())
    .then(data => retrieveImg(data))
}

////////////////////////////GETTING ORIGINAL IMAGE///////////////////////////////
function getImage(){
  fetch(imageURL)
    .then(resp => resp.json())
    .then(data => retrieveImg(data))
}

function retrieveImg(pic){
  let img = getImg()
  let name = getImgName()
  let likes = getImgLikes()
  let ul = getUl()

  img.src = pic.url
  name.innerText = pic.name
  likes.innerText = pic.like_count
  getComments(pic, ul)

  likeButton()

  commentSubmit()
  
}

///////////////////GETTING COMMENTS FROM IMAGE//////////////////////////
function getComments(pic, ul){
  let li = document.createElement('li')
  for(let i = 0; i < pic.comments.length; i++){
    let li = document.createElement('li')
    li.innerText = pic.comments[i].content
    ul.appendChild(li)  
  }
 return ul
}


//////////////////////GETTING LIKE BUTTON W/ EVENT LISTENER//////////////////////
function likeButton(){
 let likeBtn = document.getElementById('like_button')
 likeBtn.addEventListener('click', (e) => increaseLikes(e))
}


/////////////////////NEW LIKE TO DOM///////////////////////////////////
function increaseLikes(e){
  e.preventDefault()
  let likes = getImgLikes()
  nuLike = parseInt(likes.innerText)
  nuLike = nuLike + 1
  sendLikeToDom(nuLike)
  return likes.innerText = nuLike
  
}


////////////////////////NEW LIKE TO DATABASE//////////////////////////
function sendLikeToDom(nuLike){
  fetch(likeURL, {
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




//////////////////////////NEW COMMENTS TO DOM//////////////////////////
function commentSubmit(){
  let commentForm = document.getElementById('comment_form')
  return commentForm.addEventListener('submit', (e) => addCommentToDom(e, commentForm))
  
}

function addCommentToDom(e, commentForm){
  e.preventDefault()
  let ul = document.getElementById('comments')
  let li = document.createElement('li')
  let content = e.target.children[0].value
  li.innerText = content
  ul.appendChild(li)
  postComment(content)
  e.target.children[0].value = ''
  return ul
}


/////////////////////NEW COMMENT TO DATABASE////////////////////////////////
function postComment(content){
  fetch(commentsURL,{
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