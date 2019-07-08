document.addEventListener('DOMContentLoaded', () => {

  getImage()

})

//variables defined
let imageId = 2965 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const picture = document.getElementById('image')
const h4Name = document.getElementById('name')
const likesSpan = document.getElementById('likes')
const likeBtn = document.getElementById('like_button')
const comntUl = document.getElementById('comments')
const form = document.querySelector("form")
form.addEventListener("submit" , () => addComment(form.comment_input.value))


//Gets Image
function getImage() {

    fetch(imageURL)
    .then(response => response.json())
    .then(image => renderImage(image))
}


//Renders Image to the DOM
function renderImage(image) {
  picture.src = image.url
  h4Name.innerText = image.name
  likesSpan.innerHTML = `${image.like_count}`
  likeBtn.addEventListener("click", () => addLike(image))

  //note: I did not render the comments to the form; I just spaced on that.
}

//Add Likes to an Image

function addLike(like) {

  let likes = like.like_count += 1
  likesSpan.innerHTML = `${likes}`
  fetch(likeURL , {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
      image_id: like.id
    })
  })
  .then(response => response.json())
  .then(like => console.log(like))
}

function addComment(comment) {
  event.preventDefault();
  let li = document.createElement('li')
  li.innerText = comment
  comntUl.appendChild(li)

  fetch(commentsURL , {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
  .then(response => response.json())
  .then(comment => console.log(comment))
  form.reset()
}
