$(document).ready(function () {

    /*VARIABLES*/
    const myCanvas = $("#pixelCanvas");
    const colorPicker = $("#colorPicker");
    const cell = $("td");
    let selectedColor = $("#colorPicker").val();
    const submitButton = $("#submitButton");
    const clearCanvas = $("#clearButton");
    const deleteCanvas = $("#deleteCanvasButton");
    const instructions = $("#instButton");
    const bucket = $("#paintCanvas");
    const hashtag = $("#toggleLinesButton");
    const canvasBkg = $("#canvasBkgColor");
    const downloadBtn = $("#downloadButton");
    const body = $("body");


    /*FUNCTIONS*/

    // function to make canvas
    function makeGrid() {
        //store values height and width
        let width = $("#canvasWidth").val();
        let height = $("#canvasHeight").val();
        // If value is >100, alert
        if (width <= 0 || width > 50 || height <= 0 || height > 50) {
            alert("Please insert values between 5 and 50!");
            return true;
        }
        //remove any previous canvas
        myCanvas.children().remove();
        //Create canvas : a table is created by iterrating over its rows and (nested for loop) columns
        for (var r = 0; r < height; r++) {
            myCanvas.append("<tr></tr>");
            for (var c = 0; c < width; c++) {
                myCanvas.children().last().append("<td></td>")
            }
        }
    }

    //function to fill cell with color
    function draw() {
        let selectedColor = $("#colorPicker").val();
        $(cell).css("background-color", selectedColor);
    }
    //function to remove color from cell
    function erase() {
        let selectedColor = $("#colorPicker").val();
        $(cell).css("background-color", "");
    }


    /*EVENT LISTENERS*/

    /*dropdown*/

    //Toggle open/close dropdown button -> instructions
    instructions.on("click", function (e) {
        e.preventDefault();
        $(".dropdown").stop().slideToggle(750);
    });

    //Toggle open/close canvasMenu (dropdown button -> left bar)
    $("#canvasMenuButton").on("click", function (e) {
        e.preventDefault();
        $(".barHiddenL").stop().slideToggle(750);
    });

    //Toggle open/close colorMenu (dropdown button -> right bar)
    $("#colorMenuButton").on("click", function (e) {
        e.preventDefault();
        $(".barHiddenR").stop().slideToggle(750);
    });
    /*hover*/
    //On hover show descriptions of the action bar buttons
    //draw
    $("#drawButton").hover(function (e) {
        e.preventDefault();
        $(".hiddenD").stop().slideToggle();
    });
    //erase
    $("#eraserButton").hover(function (e) {
        e.preventDefault();
        $(".hiddenE").stop().slideToggle();
    });
    //paint canvas
    bucket.hover(function (e) {
        e.preventDefault();
        $(".hiddenPC").stop().slideToggle();
    });
    //toggle background
    $("#canvasBkgColor").hover(function (e) {
        e.preventDefault();
        $(".hiddenPC").stop().slideToggle();
    });
    //clearCanvas
    clearCanvas.hover(function (e) {
        e.preventDefault();
        $(".hiddenCC").stop().slideToggle();
    });
    //pick cell size
    $(".cellSize").hover(function (e) {
        e.preventDefault();
        $(".hiddenCS").stop().slideToggle();
    });

    //show/hide grid lines
    hashtag.hover(function (e) {
        e.preventDefault();
        $(".hiddenTL").stop().slideToggle();
    });
    //paint canvas
    $("#paintCanvas").hover(function (e) {
        e.preventDefault();
        $(".hiddenPC").stop().slideToggle();
    });
    //delete canvas
    deleteCanvas.hover(function (e) {
        e.preventDefault();
        $(".hiddenDel").stop().slideToggle();
    });
    //download
    downloadBtn.hover(function (e) {
        e.preventDefault();
        $(".hiddenDown").stop().slideToggle();
    });



    /*submit-> create canvas*/

    //Event listener-> on click on submit button -> create canvas
    submitButton.click(function (e) {
        e.preventDefault();
        makeGrid();
    });

    /*left bar*/
    /*left bar*/

    /*-------------drawing options-------------------*/
    //Event listener-> on click -> draw

    //Event listener-> on click -> erase


    //Event listener-> on click paint whole canvas
    bucket.on("click", function () {
        let selectedColor = $("#colorPicker").val();
        myCanvas.attr('style', 'background-color: ' + selectedColor + ';');
    });

    /*------------canvas view options--------------------*/
    //Event listener-> set cell size
    // small
    $(".cellS").on("click", function () {
        $("tr").css("height", "10px");
        $("td").css("width", "10px");
    });

    // medium
    $(".cellM").on("click", function () {
        $("tr").css("height", "15px");
        $("td").css("width", "15px");
    });

    //  big
    $(".cellL").on("click", function () {
        $("tr").css("height", "20px");
        $("td").css("width", "20px");
    });

    //Event listener-> on click show/hide lines
    hashtag.on("click", function () {
        $("td").toggleClass("hiddenLines");
    });

    //Event listener-> on click on table color button button -> toggle white/transparent
    canvasBkg.on("click", function () {
        $("tr").removeAttr("style");
    });

    //Event listener-> on click on clear button -> remove drawing 
    clearCanvas.click(function () {
        $('td').each(function () {
            $("td").css("background-color", "");
        });
    });

    /*-------------actions-------------------*/

    //Event listener-> on click on delete button -> remove canvas
    deleteCanvas.click(function () {
        $("#canvasHeight, #canvasWidth").val("");
        myCanvas.empty();
    });

    //Event listener-> on click save masterpiece!
    /*  --not working yet ----
     $("#downloadButton").on("click", function () {
          var doc = new jsPDF();
          var specialElementHandlers = {
              '#editor': function (element, renderer) {
                  return true;
              }
          };

          $('#cmd').click(function () {
              doc.fromHTML($('.printableCanvas').html(), 15, 15, {
                  'width': 170,
                  'elementHandlers': specialElementHandlers
              });
              doc.save('masterpiece.pdf');
          });
      });
    */

    //Event listener-> on click save masterpiece!
    /*
                $("#downloadButton").click(function () {
                    html2canvas(document.querySelector("#pixelCanvas")).then(canvas => {

                        let link = document.createElement('a');
                        link.download = "Masterpiece.png";
                        link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                        link.click();
                    });

    */
    /*right bar*/
    //swatches

    /*hidden features*/
    //Event listener-> fill the cell with the selected color
    myCanvas.on("click", "td", function () {
        $(this).css("background-color", selectedColor);
    });

    //Event listener-> on double-click remove the filled color from the cell
    myCanvas.on("dblclick", "td", function () {
        $(this).css("background-color", "");
    });


    //Event listener-> stroke drawing with mousedown & mousemove combo 


    $("#pixelCanvas").on("mousemove", "td", function (event) {
        event.preventDefault();
        let selectedColor = $("#colorPicker").val();
        $(this).css("background-color", selectedColor);
        if (event.which == 3) {
            $(this).css("background-color", "");
        }
    });

    $("#pixelCanvas").on('mouseover', "td", function (event) {
        if (event.buttons == 1) {
            let selectedColor = $("#colorPicker").val();
            $(this).css("background-color", selectedColor);
        } else if (event.buttons == 2) {
            $(this).css("background-color", "");
            myCanvas.css
        }

    });

    $("#pixelCanvas").on('dragstart', function (event) {
        event.preventDefault();
    });

    // Event Handler  -> prevent right-click menu
    $(document).bind("contextmenu", function (e) {
        return false;
    });


}); //jQ closing 


/*-------------Snippets: tryin' to make it work :E-----------------*/
//Event listener-> on click on openInstructions -> show hidden bar
/*
    $("#openInstructions").on("click", function open() {
        $(".instructions").css("grid-column", "1/3");
        $(".instructions").css("height", "auto");
        $(".instructions").css("display", "block");
        $(".canvasSetUp").css("grid-column", "3/6");
    });

    //Event listener-> on click on closeInstructions -> hide bar
    $("#closeInstructions").on("click", function close() {
        $(".instructions").css("grid-column", "0");
        $(".instructions").css("height", "0");
        $(".instructions").css("display", "none");
        $(".canvasSetUp").css("grid-column", "1/6");
    });
*/

/* 
    
//dropdown functions -> toggle show/hide dropdown sections
   
     function toggleShowHide(){
     if($(".dropdown").hasClass('show')=== false) {
			 $(".dropdown").addClass("show");
          $(".dropdown").removeClass("hide");
			event.preventDefault();
		}else{
        $(".dropdown").addClass("hide");
          $(".dropdown").removeClass("show");
        }
     }
     */
//DOWNLOAD---------------------------------------------------------
/*
    //Event listener-> on click save masterpiece!
    $("#downloadButton").on("click", function () {
        var doc = new jsPDF();
        var specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        $('#cmd').click(function () {
            doc.fromHTML($('.printableCanvas').html(), 15, 15, {
                'width': 170,
                'elementHandlers': specialElementHandlers
            });
            doc.save('masterpiece.pdf');
        });
    });
  */
