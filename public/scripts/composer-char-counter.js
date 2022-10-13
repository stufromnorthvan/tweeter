// Script for character counter

$(document).ready(function() {
  console.log("- character counter is active.");
  $('#tweet-text').on('input', function() {
    const $counter = $('.counter');
    let textLength = $(this).val().length;
    let diff = 140 - textLength;
    $counter.text(diff);
     if (diff < 0) {
      $counter.addClass('max-reached');
      $(".button-container button").addClass("max-button");
    } else {
      $counter.removeClass('max-reached');
      $(".button-container button").removeClass("max-button");
    }
  });
});