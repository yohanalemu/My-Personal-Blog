const navbar = document.querySelector('.navbar');
//FADE SCROLL BAR
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  let opacity = Math.max(1 - scrollTop / 300, 0);

  navbar.style.opacity = opacity;
});

//HAMBURGER MENU
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    const offScreenMenu = document.querySelector('.off-screen-menu');
  
    // Open the menu
    hamburgerMenu.addEventListener('click', () => {
     hamburgerMenu.classList.toggle('active');
      offScreenMenu.classList.toggle('active');
     
    });
  
    // Close the menu
    const closeMenuBtn = document.getElementById('close-menu');
    closeMenuBtn.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
      offScreenMenu.classList.remove('active');
    });
    
  });

//SLIDER
let currentSlideIndex = 0;
const cardsPerView = 2; 

function showSlide(sliderId) {
    const sliderContainer = document.querySelector(`.slider-container-s[data-slider="${sliderId}"] .card-slider-s`);
    const cards = sliderContainer.querySelectorAll('.card-s');
    const cardWidth = cards[0].offsetWidth;
    const totalCards = cards.length;
    
    // Calculate the max index based on the cards per view
    const maxSlideIndex = totalCards - cardsPerView;

    // Ensure currentSlideIndex is within the range
    currentSlideIndex = Math.max(0, Math.min(currentSlideIndex, maxSlideIndex));

    // Move the slider by adjusting the transform property
    sliderContainer.style.transform = `translateX(-${currentSlideIndex * cardWidth}px)`;
}

function nextSlide(sliderId) {
    currentSlideIndex++;
    showSlide(sliderId);
}

function prevSlide(sliderId) {
    currentSlideIndex--;
    showSlide(sliderId);
}


window.addEventListener('load', () => {
    showSlide(1);
});


//LOAD MORE
const loadMoreButton = document.getElementById('loadMore');
const cards = document.querySelectorAll('section.flex-container .card'); 
const hiddenCards = Array.from(cards).slice(4); 

loadMoreButton.addEventListener('click', () => {
  hiddenCards.forEach(card => {
    card.style.display = 'block'; 
  });
  //hide load button after all cards displayed
  loadMoreButton.style.display = 'none';
});
  
// SUGGESTED POSTS 
function showSuggestedPosts() {
  const container = document.getElementById("suggested-posts-container-2");
  let suggestedHTML = "";

// select random posts
  const suggestedPosts = blogPosts.sort(() => 0.5 - Math.random()).slice(0, 3);

  suggestedPosts.forEach(post => {
      suggestedHTML += `
          <div class="post-card">
              <a href="${post.link}">
                  <img src="${post.image}" alt="${post.title}">
                  <h3>${post.title}</h3>
              </a>
          </div>`;
  });

  container.innerHTML = suggestedHTML;
}

showSuggestedPosts();

//COMMMENT SECTION
window.onload = function() {
  loadComments();
};

function postComment() {
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const commentInput = document.getElementById('comment-input');
  const commentList = document.getElementById('comment-list');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const commentText = commentInput.value.trim();

  if (name === '' || email === '' || commentText === '') {
      alert('Please fill out your name, email, and comment.');
      return;
  }

  if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
  }

  // Create a comment object
  const comment = {
      name: name,
      text: commentText,
      timestamp: new Date().toLocaleString()
  };

  // Save comment to local storage
  saveCommentToLocalStorage(comment);

  // Display the comment
  addCommentToDOM(comment);

  // Clear inputs after posting
  nameInput.value = '';
  emailInput.value = '';
  commentInput.value = '';
}

// validate email format
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// save comment to local storage
function saveCommentToLocalStorage(comment) {
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// load comments from local storage
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(addCommentToDOM);
}

// display comment in DOM
function addCommentToDOM(comment) {
  const commentList = document.getElementById('comment-list');

  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.innerHTML = `
      <div class="comment-meta">
          ${comment.name} <span style="font-size: 0.8em; color: #999;">${comment.timestamp}</span>
      </div>
      <p>${comment.text}</p>
  `;
  commentList.appendChild(commentDiv);
}

