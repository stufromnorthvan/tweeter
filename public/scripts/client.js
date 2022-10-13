/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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

const renderTweets = function(data) {
  for (let tweet of data)
    $('.tweets-container').prepend(createTweetElement(tweet));
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(getTweets) {
      renderTweets(getTweets);
      console.log(`- success, tweets loaded!`);
    });
};

loadTweets();

$(document).ready(function() {
  console.log("- client.js is active");
  //grab form
  // const $tweetform = $('.tweet-form');
  //listen for event
  $('.tweet-form').on("submit", (event) => {
    const $tweetform = $('.tweet-form');
    event.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      $('error').text("Please enter tweet.");
      throw Error("User entered a tweet with no characters");
    }
    if ($('#tweet-text').val().length > 140) {
      $('error').text("Tweet is too long.");
      throw Error("User entered a tweet that exceeds character limit.");
    }
    const formData = ($tweetform.serialize());
    console.log("tweet currently being sent to server from current user: ", formData);
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData
    })
      .then((response) => {
        console.log("response: ", response);
        loadTweets();
      })
      .catch((error) => {
        console.log("error: ", error);
        // alert(`🐦 An error has occured! ${error} 🐦`);
      });
  });
});
