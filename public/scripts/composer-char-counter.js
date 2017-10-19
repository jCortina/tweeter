/* Tweeter character counter script */
$( document ).ready(function() {
    
    let counterColorBlack = true;
    $( 'span.counter' ).css("color", "black");    

    $( '#tweetext' ).on("keydown", function(e) {
        //retrieve the current count element
        let charCount = Number($( 'span.counter' ).text());
        const key = e.which;
        //decrease count if regular key pressed, else if del || backspace add to counter
        if (key == 8 || key == 46)  {
          charCount++;
        } else {
          charCount--;
        }
        let newCountStr = charCount.toString();        
        $( 'span.counter' ).text(newCountStr);
        //when count < change color to red
        if (charCount > -1 && !counterColorBlack)  {
          $( 'span.counter' ).css("color", "black");
          counterColorBlack = true;
        } else if (charCount < 0 && counterColorBlack) {
          $( 'span.counter' ).css("color", "red");
          counterColorBlack = false;
        }
    });
});