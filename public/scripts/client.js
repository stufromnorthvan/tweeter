/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  let $tweet = `<article class="tweet">
    <header>
    <span class="pic-and-name">
      <div class="avatar"><img src=${data.user.avatars}></div>
      <div class="username">${data.user.name}</div>
    </span>
      <div class="handle">${data.user.handle}</div>
    </header>
    <div class = "message">${data.content.text}</div>
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
    $('.tweets-container').append(createTweetElement(tweet));
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(getTweets) {
      renderTweets(getTweets);
      console.log(`Success, tweets loaded!`);
    });
};

loadTweets();

$(document).ready(function() {
  console.log("client.js is active");
  //grab form
  const $tweetform = $('.tweet-form');
  //listen for event
  $tweetform.on("submit", (event) => {
    event.preventDefault();
    console.log("event prevented, form submitted");
    const formData = ($tweetform.serialize());
    console.log("tweet currently being sent to server from current user: ", formData);
    //sends form data to server
    $.ajax({
      method: 'POST',
      url: './tweets',
      data: formData
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  });
});
