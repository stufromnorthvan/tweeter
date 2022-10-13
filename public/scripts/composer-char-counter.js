// Script for character counter

$(document).ready(function() {
  console.log("- character counter is active.");
  const $counter = $('.counter');
  const $textarea = $('#tweet-text');
  $textarea.on('input', () => {
    let textLength = $textarea.val().length;
    let diff = 140 - textLength;
    $counter.text(diff);
    if (diff < 0) {
      $counter.addClass('max-reached');
      $(".button-container button").attr("disabled", true);
      $(".button-container button").addClass("max-button");
    } else {
      $counter.removeClass('max-reached');
      $(".button-container button").attr("disabled", false);
      $(".button-container button").removeClass("max-button");
    }
  });
});