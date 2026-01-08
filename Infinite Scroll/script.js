// Project #27: Infinite Scroll
// Uzair - January 8, 2026
const feed = document.getElementById("feed");
const loading = document.getElementById("loading");
// ===== VARIABLES =====
// Create variable to track the current post number (start at 0)
// Create variable to track if we're currently loading (boolean, start false)
// Create variable for how many posts to load each time (constant, value 10)
let currentPost = 0;
let isLoading = false;
const postsToLoad = 10;

// ===== FUNCTION: CREATE POST =====
// Function name: createPost
// Parameter: postNumber (the number of this post)

// Create a div with class 'post'
// Create a div with class 'post-header'
// Create a div with class 'avatar' - put the first letter of "User" + postNumber inside
// Create a div with class 'username' - put "User " + postNumber as text
// Create a div with class 'post-content' - put "This is post number " + postNumber as text
//
// Append avatar to post-header
// Append username to post-header
// Append post-header to post
// Append post-content to post
//
// Return the complete post element
function createPost(postNumber) {
  let post = document.createElement("div");
  post.classList.add("post");
  let postHeader = document.createElement("div");
  postHeader.classList.add("post-header");
  let avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = "U" + postNumber;
  let username = document.createElement("div");
  username.classList.add("username");
  username.textContent = "User" + postNumber;
  let postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postContent.textContent = "This is post number " + postNumber;
  postHeader.appendChild(avatar);
  postHeader.appendChild(username);
  post.appendChild(postHeader);
  post.appendChild(postContent);
  return post;
}

// ===== FUNCTION: LOAD POSTS =====
// Function name: loadPosts
//
// Set isLoading to true
// Get the loading element by id
// Add class 'show' to loading element
//
// Use setTimeout to simulate network delay (1000ms):
//   Inside setTimeout:
//     Loop 10 times (use the postsPerLoad variable):
//       Call createPost function with currentPostNumber
//       Get the feed element by id
//       Append the new post to feed
//       Increment currentPostNumber by 1
//
//     Remove 'show' class from loading element
//     Set isLoading to false
function loadPosts() {
  isLoading = true;
  loading.classList.add("show");
  setTimeout(() => {
    for (let i = 0; i < postsToLoad; i++) {
      let newPost = createPost(currentPost);
      feed.appendChild(newPost);
      currentPost++;
    }
    loading.classList.remove("show");
    isLoading = false;
    // Inside setTimeout, after isLoading = false:

    // Check if page is scrollable after loading
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      loadPosts(); // Not scrollable yet? Load more!
    }
  }, 1000);
}

// ===== FUNCTION: CHECK SCROLL POSITION =====
// Function name: checkScroll
//
// If isLoading is true, return (exit function - don't load if already loading)
//
// Get the scroll position (window.scrollY)
// Get the total page height (document.documentElement.scrollHeight)
// Get the window height (window.innerHeight)
//
// Calculate: scrollPosition + windowHeight
// If this is >= (totalHeight - 200):
//   Call loadPosts function
function checkScroll() {
  if (isLoading) {
    return;
  }
  let scrollPosition = window.scrollY;
  let pageHeight = document.documentElement.scrollHeight;
  let windowHeight = window.innerHeight;

  if (scrollPosition + windowHeight >= pageHeight - 200) {
    loadPosts();
  }
}

// ===== EVENT LISTENER =====
// Add scroll event listener to window
// Call checkScroll function when user scrolls
window.addEventListener("scroll", checkScroll);

// ===== INITIAL LOAD =====
// Call loadPosts function to load first 10 posts when page opens
loadPosts();
