var initMessages = null;
var socket = io();
var myUserName = null;

// validate user name, make sure there is no != .... only have abc 123
function validateUserName(username) {
  let regex = /\w+/g;
  return regex.test(username);
}

$(document).ready(function () {
  // make modal button was initial disabled and cannot click esc to go to another page

  $("#usernameModal").modal({
    show: true,
    keyboard: false,
    backdrop: "static",
  });

  $("#enterRoomBtn").prop("disabled", true);

  //hide chat room
  $("#chatroom").hide();

  $("#usernameModalInput").on("input", function (e) {
    let input = e.target.value.trim;
    if (validateUserName(input)) {
      $("#enterRoomBtn").attr("disabled", false);
      myUserName = input;
    } else {
      $("#enterRoomBtn").attr("disabled", true);
      myUserName = null;
    }
  });

  $("#enterRoomBtn").on("click", function () {
    $("#usernameModal").modal("hide");
    $("#chatroom").show();
    //auto stay at the bottom once open this page
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Load recent messages from server to chat room
  socket.on("initMessages", function (messages) {
    console.log(messages);
  });
});
