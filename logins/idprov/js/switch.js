$(document).ready(function(){
  $("#blue").click(
    function() {
      $("wrap").removeClass("red || purple").addClass("blue");
    }
  );

  $("#red").click(
    function() {
      $("wrap").removeClass("blue || purple").addClass("red");
    }
  );

  $("#purple").click(
    function() {
      $("wrap").removeClass("red || blue").addClass("purple");
    }
  );
})
