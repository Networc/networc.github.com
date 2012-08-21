jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("http://api.github.com/users/" + username + "/repos?callback=?", callback);
}
