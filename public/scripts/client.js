/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escape function encodes a string passed in as an argument

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Returns html with inserted tweet data

const createTweetElement = function(data) {
  let $tweet = `<article class="tweet">
    <header>
    <span class="pic-and-name">
      <div class="avatar"><img src=${data.user.avatars}></div>
      <div class="username">${data.user.name}</div>
    </span>
      <div class="handle">${(data.user.handle)}</div>
    </header>
    <div class="message">${escape(data.content.text)}</div>
    <footer>
      <div>${timeago.format(data.created_at)}</div>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

// Renders tweets' html data into tweet container

const renderTweets = function(data) {
  $('.tweets-container').empty();
  for (let tweet of data)
    $('.tweets-container').prepend(createTweetElement(tweet));
};

// Loads in all stored tweets

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(getTweets) {
      renderTweets(getTweets);
      console.log(`- success, tweets loaded!`);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// Runs previous loadTweets function to load most up-to-date feed of tweets

loadTweets();

// Function confirms document is ready, then sends a tweet to the server after it receives a form submission.

$(document).ready(function() {
  console.log("- client.js is active");
  // Checks for submission from tweet form
  $('.tweet-form').on("submit", (event) => {
    const $tweetform = $('.tweet-form');
    // Prevent default form submission, to apply our conditions
    event.preventDefault();
    // A "fade in" and "fade out" effect for error messages
    let errorFade = $("error").fadeIn(300).delay(1500).fadeOut(400);
    // Error handling
    if ($('#tweet-text').val().length === 0) {
      $('error').text("Please enter tweet");
      errorFade;
      throw Error("User entered a tweet with no characters");
    }
    if ($('#tweet-text').val().length > 140) {
      $('error').text("Tweet is too long");
      errorFade;
      throw Error("User entered a tweet that exceeds character limit.");
    }
    // Clears error text if no current errors detected
    $('error').text("");
    // Serialize tweet form data
    const formData = ($tweetform.serialize());
    console.log("tweet currently being sent to server from current user: ", formData);
    // Sends tweet to .post in tweets.js, catches any errors
    $.post('/tweets', formData)
      .then((response) => {
        loadTweets();
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    // Clears tweet text area and resets counter after tweet is sent
    $('#tweet-text').val("");
    $('.counter').text(140);
  });
});
