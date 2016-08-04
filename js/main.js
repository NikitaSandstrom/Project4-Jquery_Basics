
//JQuery variables
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $("<p></p>");
var $nextBtn = $('<a href="#" class="btn next"></a>');
var $prevBtn = $('<a href="#" class="btn prev"></a>');
var $input = $('header').find('input[type=search]');
var $exit = $('<a href="#" class="exit-btn"><img src="Photos/overlay/exit_button.png" class="resize" ></a>');


//Append An image to overlay
$overlay.append($image);


//A caption to overlay
$overlay.append($caption);

//buttons on overlay
$overlay.append($nextBtn);
$overlay.append($prevBtn);
$overlay.append($exit)

//Add overlay
$("body").append($overlay);

//Capture the click event on a link to an image
$("#imageGallery a").click(function (event) {

    var container = $(this).closest('li');

    if (container.hasClass('off')==false) {
        var imageLocation = $(this).attr("href");
        //Update overlay with the image linked in the link
        $image.attr("src", imageLocation);

        //Show the overlay.
        $overlay.show();

        //Get child's alt attribute and set caption
        var captionText = $(this).children("img").attr("alt");
        $caption.text(captionText);

    }

    event.preventDefault();
});

//When overlay is clicked
$exit.click(function(){
  //Hide the overlay
  $overlay.hide();
});

//live search bar
$('#imageGallery img').each(function () {
    var title = $(this).attr('title').toLowerCase();
    $(this).attr('title', title);
})


$input.on('keyup', function () {
    var term = $(this).val().toLowerCase();
    console.log(term);


    if (term.length === 0) {
        $('#imageGallery li').removeClass('off');
    } else {
        $('#imageGallery li').removeAttr("href").addClass('off');

        $('#imageGallery img[title*="' + term + '"]').each(function () {
            $(this).closest('li').removeClass('off');
        })
    }
});



//next button
$($nextBtn).on('click', function (e) {
    //create a var that finds the current image on the overlay and get it's src attribute
    var currentImg = $overlay.find('img').attr('src');

    console.log(currentImg);

    //create another var that collects the current img's src in the image gallery, then finds the closest parent(currently "li" the img is in), finds the next "li", then finds the img in the next "li"
    //var nextImg = $('#imageGallery img[src="' + currentImg + '"]').closest('li').next('li').find('a img');

    var nextImg = $('#imageGallery a[href="' + currentImg + '"]').closest('li').nextAll('li:not(.off)');

    //variables that get the next images alt and src attributes
    var nextCaption = nextImg.find('img').attr('alt');
    var nextImgSrc = nextImg.find('a').attr('href');

    //log the caption to the console to make sure it works
    console.log(nextCaption);

    //find the image in the overlay and get the next image's src
    $overlay.children('img').attr('src', nextImgSrc);

    //find the "p" and place in the text of the next Caption variable
    $overlay.find('p').text(nextCaption);


    // prevent the default behavior of e(?)
    e.preventDefault();


});

//prev button
$($prevBtn).on('click', function (e) {
    //create a var that finds the current image on the overlay and get it's src attribute

    var currentImg = $overlay.find('img').attr('src');

    console.log(currentImg);

    //create another var that collects the current img's src in the image gallery, then finds the closest parent(currently "li" the img is in), finds the next "li", then finds the img in the next "li"
    //var nextImg = $('#imageGallery img[src="' + currentImg + '"]').closest('li').next('li').find('a img');

    var prevImg = $('#imageGallery a[href="' + currentImg + '"]').closest('li:not(.off)').prevAll("li").not(".off").first();

    //variables that get the next images alt and src attributes
    var prevCaption = prevImg.find('img').attr('alt');
    var prevImgSrc = prevImg.find('a').attr('href');

    //log the caption to the console to make sure it works
    console.log(prevCaption);

    //find the image in the overlay and get the next image's src
    $overlay.children('img').attr('src', prevImgSrc);

    //find the "p" and place in the text of the next Caption variable
    $overlay.find('p').text(prevCaption);


    // prevent the default behavior of e(?)
    e.preventDefault();


});