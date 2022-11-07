let gameIsActive = false;
let gameTimerIntervalId;
let result;
let dropID;
let seconds;
let minutes;

// Result button

$("#resultBtn").on("click", function () {
  checkResult();
  if (result) {
    return showPopUp("Woohoo, well done, you did it!.");
  } else {
    $(".pop").css("display", "flex");
    $("#confirmBtn").show();
    $(".message").html(
      `You still have time, you sure? (${$("#seconds").html()} seconds.)`
    );
  }
});

// Confirm button

$("#confirmBtn").on("click", function () {
  checkResult();
  if (result) {
    return showPopUp("Woohoo, well done, you did it!.");
  } else {
    gameIsActive = false;
    return showPopUp("It's a pity, but you lost.");
  }
});

//Check result

function checkResult() {
  result = true;
  $.each($(".img-place"), function (index, value) {
    if (
      $(value).attr("id") - index != 1 ||
      $("#right").children().length < 16
    ) {
      result = false;
    }
    if (index === 15 && result) {
      gameIsActive = false;
      return result = true;
    }
    if (index === 15 && !result) {
    }
  });
}

// Start button

$("#startBtn").on("click", function () {
  seconds = 0;
  minutes = 1;
  $("#startBtn").prop("disabled", true);
  $("#resultBtn").prop("disabled", false);
  gameIsActive = true;
  startGame();
});

updateTime = (value) => (value < 10 ? "0" + value : value);

// Close message window

$("#closeBtn").on("click", function () {
  $(".pop").css("display", "none");
});

// Reset and prepare new Game

$("#newGameBtn").on("click", function () {
  $("#right").empty();
  $("#left").empty();
  for (let i = 0; i < 16; i++) {
    $("#left").append('<div class="image_part" draggable="true"></div>');
    $("#right").append('<div class="img-place"></div>');
  }
  let partArray = [];
  result = true;
  gameIsActive = false;
  dragAndDropOportunity();
  clearInterval(gameTimerIntervalId);
  while (partArray.length < 16) {
    let numberId = Math.floor(Math.random() * (17 - 1) + 1);
    if (!partArray.includes(numberId)) {
      partArray.push(numberId);
    }
  }

  $.each($(".image_part"), function (index, value) {
    $(value).css(
      "background-image",
      `url('images/image_part_${partArray[index]}.jpg')`
    );
    $(value).css("background-size", `cover`);
    $(value).attr("id", `${partArray[index]}`);
    $("value").append($("#left"));
  });

  $("#startBtn").prop("disabled", false);
  $("#resultBtn").prop("disabled", true);
  $("#seconds").html(updateTime(00));
  $("#minutes").html(updateTime(01));
});

// Timer function

function startGame() {
  gameTimerIntervalId = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes < 0) {
      gameIsActive = false;
      clearInterval(gameTimerIntervalId);
      $("#confirmBtn").trigger("click");
      return false;
    }
    if (!gameIsActive) {
      $("#seconds").html(updateTime(00));
      $("#minutes").html(updateTime(01));
      $("#startBtn").prop("disabled", true);
      $("#resultBtn").prop("disabled", true);
      clearInterval(gameTimerIntervalId);
    }
    $("#seconds").html(updateTime(seconds));
    $("#minutes").html(updateTime(minutes));
  }, 1000);
}

// Show message window

function showPopUp(text) {
  $(".pop").css("display", "flex");
  $(".message").text(`${text}`);
  $("#confirmBtn").hide();
  $("#startBtn").prop("disabled", true);
  $("#resultBtn").prop("disabled", true);
}

// Drop & Drag function with sortable

function dragAndDropOportunity() {
  $(".image_part").draggable({
    containment: ".available-zone",
    start: function (event) {
      dropID = event.target.id;
    },
  });

  $(".img-place").droppable({
    accept: ".image_part",
    drop: function () {
      if (!gameIsActive) {
        $("#startBtn").trigger("click");
      }
      if ($(this).css("background-image") === "none") {
        let background = $(`#${dropID}`).css("background");
        $(this).css("background", background);
        $(this).attr("id", dropID);
        $(`#${dropID}`).remove();
      }
    },
  });

  $("#right").sortable({
    containment: "#right",
    tolerance: "pointer",
  });
}

// Start programm

$("#newGameBtn").trigger("click");

function list(a, b, ...arg) {
  console.log(arg);
}
list(1, 2, 3, 4, 5);
