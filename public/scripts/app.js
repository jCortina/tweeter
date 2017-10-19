/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
    // Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json

$( function()   {
    
  // listen for submit tweet requests and interrupt, send ajax request
  $( 'form' ).on('submit', function(ev) {

    ev.preventDefault();
    
    jQuery.ajax({
      type: "POST",
      url: "/tweets",
      dataType: "text",
      data: $( 'tweetext' ).text(),
      beforeSend: function( xhr ) {
        //go check for errors -err returned true, return false from here to cancel POST req
        return findErrs() ? false : true
      },
      success: function (text)  {
        //remove (and hide) error message text, clear textarea
        $( '#errMsg' ).text("");
        $( '#errMsg' ).css("visibility", "hidden");
        $( 'textarea' ).text("");
      }
    })
    .done(function(result) {
      console.log("posted tweet");
    });

  });
  
  // check for errors when submit requested
  function findErrs()  {
    let error = false;
    let errmsg = null;
    // check to see is tweet string is empty or null
    if ($('textarea').text().length <= 0) {
      error = true;
      errmsg = "Nothing entered: message cannot be empty";
    //check to see whether message is greater than max 140 chars
    } else if ($(' textarea ').text().length > 140) {
      error = true;
      errmsg = "Message more than 140 characers";
    }
    //when error flagged, set the error message and make it visible
    if (error)  {
      $( '#errMsg' ).text(errMsg);
      $( '#errMsg' ).css("visibility", "visible");
      return true;
    } else  {
      return false;
    }
  }

  function createTweetElement(data)   {
    let tweetHTML = `
    <article class="tweet">
      <header>
        <img src="${data.user.avatars.small}">
        <span>${data.user.name}</span>
        <span>${data.user.handle}</span>
      </header>
      <p>${data.content.text}</p>
      <footer><hr></hr>
        <span>${data.created_at}</span>
      </footer>
    </article>
      `;
    return tweetHTML;
    }

    // iterate through the tweets database, for each obj, format as HTML string
    // and append to tweets container
    function loadTweets()  {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (tweets) {
          console.log('Success: ', tweets);
        }
      });
    } 
    loadTweets();  
});
