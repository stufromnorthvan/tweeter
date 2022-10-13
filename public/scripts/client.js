/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  for (let tweet of data)
    $('.tweets-container').append(createTweetElement(tweet));
};

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

renderTweets(data);

$(document).ready(function() {
  console.log("client.js is active");
  //grab form
  const $tweetform = $('.tweet-form');
  //listen for event
  $tweetform.on("submit", (event) => {
    event.preventDefault();
    console.log("event prevented, form submitted");
    const formData = ($tweetform.serialize());
    console.log("tweet being sent to server from current user: ", formData);
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