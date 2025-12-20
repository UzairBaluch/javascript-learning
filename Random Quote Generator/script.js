// Array of quote objects - each has quote text and author
let quotes = [
  {
    quote:
      "It isn’t normal to know what we want. It is a rare and difficult psychological achievement.",
    author: "Abraham Maslow",
  },
  {
    quote:
      "Death is not the greatest loss in life. The greatest loss is what dies inside us while we live.",
    author: "Norman Cousins",
  },
  {
    quote: "Liberty means responsibility. That is why most people dread it.",
    author: "George Bernard Shaw",
  },
  {
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
  },
  {
    quote:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
  },
  {
    quote: "Happiness depends upon ourselves.",
    author: "Aristotle",
  },
  {
    quote: "What we think, we become.",
    author: "Buddha",
  },
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    quote:
      "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    author: "Epictetus",
  },
  {
    quote: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
  },
  {
    quote:
      "Life can only be understood backwards; but it must be lived forwards.",
    author: "Søren Kierkegaard",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
  },
]; // ... (all your quotes)

// Select HTML elements to display quotes
let quoteElem = document.getElementById("quote");
let authorElem = document.getElementById("author");
let quoteElemBtn = document.getElementById("newQuoteBtn");

// Function to display a random quote
function updateQuote() {
  // Generate random index based on array length
  let randomNumber = Math.floor(Math.random() * quotes.length);
  // Get random quote object from array
  let getQoute = quotes[randomNumber];
  // Display quote text and author
  quoteElem.textContent = getQoute.quote;
  authorElem.textContent = getQoute.author;
}
// Show initial quote on page load
updateQuote();
// Add event listener to button for new quotes
quoteElemBtn.addEventListener("click", updateQuote);
