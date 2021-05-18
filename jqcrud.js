$(function () {
  loadRecipies();
  $("#users").on("click", ".btn-warning", handleUpdate);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var username = $("#updateUsername").val();
    var email = $("#updateEmail").val();
    console.log("id, usernam, email: ", id, username, email);

    $(".error").hide();
    var hasError = false;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    var emailaddressVal = $("#updateEmail").val();
    if (emailaddressVal == "") {
      $("#updateEmail").after(
        '<span class="error">Please enter your email address.</span>'
      );
      hasError = true;
    } else if (!emailReg.test(emailaddressVal)) {
      $("#updateEmail").after(
        '<span class="error">Enter a valid email address.</span>'
      );
      hasError = true;
    }

    if (hasError == true) {
      return false;
    }

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      data: { username, email },
      method: "PUT",
      success: function (response) {
        console.log("Res, ", response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function handleUpdate() {
  console.log("UPDATE");
  var btn = $(this);
  var parentDiv = btn.closest(".user");
  let id = parentDiv.attr("data-id");
  console.log("ID", id);
  $.get(
    "https://jsonplaceholder.typicode.com/users/" + id,
    function (response) {
      $("#updateId").val(response.id);
      $("#updateUsername").val(response.title);
      $("#updateEmail").val(response.body);
      $("#updateModal").modal("show");
    }
  );
}

function loadRecipies() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    success: function (response) {
      console.log(response);
      var users = $("#users");
      users.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        // recipes.append(
        //   `<div class="recipe"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button> ${rec.body}</p></div>`
        // );
        users.append(
          "<div class='user' data-id='" +
            rec.id +
            "' ><p><a href='./album.html?id=" +
            rec.id +
            "'> UserName: " +
            rec.username +
            "</a></p><button type='button' data-toggle='modal' data-target='#addModal' class='btn btn-warning btn-sm float-right'>Update</button><p>Email: " +
            rec.email +
            "</p></div>"
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }

      // users.append(
      //   "<div><p>UserName: " +
      //     response.username +
      //     "</p><p>Email: " +
      //     response.email +
      //     "</p></div>"
      // );
    },
  });
}
