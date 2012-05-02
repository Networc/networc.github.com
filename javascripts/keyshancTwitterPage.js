   function fetchTweets(searchScreenName, password) {
         
         var urlScreenname = new String("http://twitter.com/statuses/user_timeline/" + searchScreenName + ".json?callback=?");
         $.ajax({  
            url : urlScreenname,  
            dataType : "json",  
            timeout:15000,  
  
            success : function(data)  
               {  
                  $('#data').html('');
                  for (i=0; i<data.length; i++)  
                     {  
                        $('#data').append("<hr /><p>" + data[i].text.linkify() + "</p>");
                        if ((data[i].text.indexOf('¥')) != -1)
                        {
                           data[i].text = Encoder.htmlDecode(data[i].text);
                           data[i].text = decryptKeyshancRT(data[i].text, password);
                           data[i].text = Encoder.htmlEncode(data[i].text, false);
                           $("#data").append("<p>" + data[i].text.linkify() + "</p>");
                        }
                        timeSince = relative_time(data[i].created_at);
                        $('#data').append("<p>" + timeSince + "</p>");  
                     }
                  twttr.anywhere(function (T) {
                     T.hovercards();
                  });
               },  
  
            error : function()  
               {  
                  alert("Failure!");  
               },  
         });
   }

   twttr.anywhere(function (T) {
     T.hovercards();
   });

   twttr.anywhere(function (T) {
      var currentUser,
          screenName,
          profileImage,
          profileImageTag,
          timeSince;

      if (T.isConnected()) {
         currentUser = T.currentUser;
         screenName = currentUser.data('screen_name');
         profileImage = currentUser.data('profile_image_url');
         profileImageTag = "<img src='" + profileImage + "'/>";
         $('#twitter-connect-placeholder').html("Logged in as " + profileImageTag + " @" + screenName + "<br />");
         $("#twitter-connect-placeholder").append('<button id="signout" type="button">Sign out of Twitter</button><br />');
         $("#signout").bind("click", function () {
            twttr.anywhere.signOut();
            location.reload();
         });
         $('#twitter-connect-placeholder').append("Twitter Username to Search:<br />");
         $('#twitter-connect-placeholder').append('@<input type="text" id="searchScreenName" /><br />');
         $('#twitter-connect-placeholder').append("Password to Decrypt with:<br />");
         $('#twitter-connect-placeholder').append('<input type="password" id="decryptPassword" /><br />');
         $("#twitter-connect-placeholder").append('<button id="fetchAndDecrypt" type="button">Fetch and Decrypt Tweets</button><br />');
         $("#fetchAndDecrypt").bind("click", function () {
            fetchTweets(document.getElementById('searchScreenName').value, document.getElementById('decryptPassword').value);
         });
      } else {
         T("#twitter-connect-placeholder").connectButton();
      };
   });



// Convert Twitter API Timestamp to "Time Ago"

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  var r = '';
  if (delta < 60) {
        r = 'a minute ago';
  } else if(delta < 120) {
        r = 'couple of minutes ago';
  } else if(delta < (45*60)) {
        r = (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (90*60)) {
        r = 'an hour ago';
  } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
        r = '1 day ago';
  } else {
        r = (parseInt(delta / 86400)).toString() + ' days ago';
  }
  return r;
}


// Create Usable Links

String.prototype.linkify = function() {
       return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
              return m.link(m);
      });
}
