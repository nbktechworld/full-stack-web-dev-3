document.getElementById('section-title').style.backgroundColor = 'yellow'

function addBorder() {
  document.getElementsByClassName('js-pet-image')[0].style.border = '3px solid black'
}

function bark() {
  document.querySelector('#pet-audio').play()
}

let currentImageIndex = 0
const images = [
  'https://www.rd.com/wp-content/uploads/2016/01/04-dog-breeds-dalmation.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg',
  "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg",
  'https://images.hdqwalls.com/wallpapers/colorful-parrot-bird.jpg'
]

function previousImage() {
  // todo: exercise
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length
  document.querySelector('.js-pet-image').src = images[currentImageIndex]
}
