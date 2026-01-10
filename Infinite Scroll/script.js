// ============================================
// INFINITE SCROLL
// ============================================

// DOM ELEMENTS - Get feed container and loading indicator
const feed = document.getElementById("feed");
const loading = document.getElementById("loading");

// STATE VARIABLES - Track current post number and loading state
let currentPost = 0;
let isLoading = false;
const postsToLoad = 10;

// CREATE POST - Generate a single post element
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
  username.textContent = "User " + postNumber;

  let postContent = document.createElement("div");
  postContent.classList.add("post-content");
  postContent.textContent = "This is post number " + postNumber;

  postHeader.appendChild(avatar);
  postHeader.appendChild(username);
  post.appendChild(postHeader);
  post.appendChild(postContent);

  return post;
}

// LOAD POSTS - Create and append multiple posts to feed
function loadPosts() {
  isLoading = true;
  loading.classList.add("show");

  // Simulate network delay
  setTimeout(() => {
    // Create 10 new posts
    for (let i = 0; i < postsToLoad; i++) {
      let newPost = createPost(currentPost);
      feed.appendChild(newPost);
      currentPost++;
    }

    loading.classList.remove("show");
    isLoading = false;

    // Auto-load more if page still not scrollable
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      loadPosts();
    }
  }, 1000);
}

// CHECK SCROLL - Detect when user scrolls near bottom
function checkScroll() {
  if (isLoading) return;

  let scrollPosition = window.scrollY;
  let pageHeight = document.documentElement.scrollHeight;
  let windowHeight = window.innerHeight;

  // Load more posts when within 200px of bottom
  if (scrollPosition + windowHeight >= pageHeight - 200) {
    loadPosts();
  }
}

// SCROLL EVENT LISTENER - Check scroll position on every scroll
window.addEventListener("scroll", checkScroll);

// INITIAL LOAD - Display first batch of posts on page load
loadPosts();
