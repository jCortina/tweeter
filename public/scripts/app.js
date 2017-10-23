/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
    // Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from tweets.json
function composeTweet() {
    $( '.new-tweet' ).slideToggle("slow");
}

$( function()   {
  
  let tweetMsg = "";
  let errmsg = "";

  $( '#newTweet' ).on('submit', (e) => {
    e.preventDefault();

    tweetMsg = $( '#tweetext' ).val();

    // check for errors
    if (findErrs()) {
      //errors found, exit - do not send ajax post
      return;
    }
    //sendTweet($('#tweetext').text());

    $.ajax({
      url: '/tweets',      
      method: 'POST',
      data: $( '#newTweet' ).serialize()
    })
    .done( (result) => {
      //remove (and hide) error message text, clear textarea
      $( '#errMsg' ).html("");
      $( '#errMsg' ).css("visibility", "hidden");
      $( '#tweetext' ).val("");
      $( 'span.counter' ).text('140');
      //call function to load this tweet to tweets list
      loadTweets();
    });
  });
  
  // Get tweets database, for each obj, format as HTML string
  // and append to tweets container
  function loadTweets()  {
    //first clear the container containing the tweets
    $( 'section.tweets' ).empty();

    $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (tweets) => {
      extractTweets(tweets);
    }
    })
    .done( (result) =>   {
    });
  }
  
  // check for errors when submit requested
  function findErrs()  {
    let error = false;
    // check to see is tweet string is empty or null
    if (tweetMsg.length <= 0) {
      error = true;
      errmsg = "Nothing entered: message cannot be empty";
    //check to see whether message is greater than max 140 chars
    } else if (tweetMsg.length > 140) {
      error = true;
      errmsg = "Message more than 140 characers";
    }
    //when error flagged, set the error message and make it visible
    if (error)  {
      $( '#errMsg' ).html(errmsg);
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
        <span class="user">${data.user.name}</span>
        <span class="handle">${data.user.handle}</span>
      </header>
      <p class="tweetmsg">${data.content.text}</p>
      <footer><hr></hr>
        <span class="date">${data.created_at}</span>
      </footer>
    </article>
      `;
    return tweetHTML;
    }
    // extract each tweet object from tweets database, create 
    function extractTweets(tweets)  {
      for (let tweet of tweets) {
        //add element to container with append
        $( '.tweets' ).append(createTweetElement(tweet));
      }
    }

    loadTweets();    
  });
