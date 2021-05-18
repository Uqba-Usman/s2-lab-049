$(function () {
  loadRecipies();
  $("#albums").on("click", ".btn-warning", handleUpdate);
  $("#users").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/albums/" + id,
      data: { title },
      method: "PUT",
      success: function (response) {
        console.log("Res, ", response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function addRecipe() {
  var title = $("#title").val();
  var userId = $("#userId").val();
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums",
    method: "POST",
    data: { title, userId },
    success: function (response) {
      console.log(response);
      $("#title").val("");
      $("#userId").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".user");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}

function handleUpdate() {
  console.log("UPDATE");
  var btn = $(this);
  var parentDiv = btn.closest(".album");
  let id = parentDiv.attr("data-id");
  console.log("ID", id);
  $.get(
    "https://jsonplaceholder.typicode.com/albums/" + id,
    function (response) {
      $("#updateId").val(response.id);
      $("#updateTitle").val(response.title);
      $("#updateUserId").val(response.userId);
      $("#updateModal").modal("show");
    }
  );
}

function GetParameterValues(param) {
  var url = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < url.length; i++) {
    var urlparam = url[i].split("=");
    if (urlparam[0] == param) {
      return urlparam[1];
    }
  }
}

function loadRecipies() {
  var id = GetParameterValues("id");
  console.log("Paramid", id);

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/albums/",
    method: "GET",
    success: function (response) {
      console.log(response);
      var users = $("#albums");
      users.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        if (rec.userId == id) {
          users.append(
            "<div class='album' data-id='" +
              rec.id +
              "' ><p> Title: " +
              rec.title +
              "<button class='btn btn-danger btn-sm float-right'>delete</button><button   class='btn btn-warning btn-sm float-right'>Update</button>" +
              "</div>"
          );
        }
      }
    },
  });
}
