
const rangeInput = document.querySelector('input[type = "range"]');
const imageList = document.querySelector(".image-list");
const searchInput = document.querySelector('input[type="search"]');
const photosCounter = document.querySelector(".toolbar .counter span");
const imageListItems = document.querySelectorAll(".image-list li");
const captions = document.querySelectorAll(".image-list figcaption");
const myArray = [];
let counter = 1;
const active = "active";
const dNone = "d-none";

// SEARCH FUNCTIONALITY
for (const caption of captions) {
  myArray.push({
    id: counter++,
    text: caption.textContent
  });
}

searchInput.addEventListener("keyup", keyupHandler);

window.onload = function funLoad() {
  photosCounter.textContent = myArray.length;
};

function keyupHandler() {
  for (const item of imageListItems) {
    item.classList.add(dNone);
  }
  const text = this.value;
  const filteredArray = myArray.filter((el) =>
    el.text.toLowerCase().includes(text.toLowerCase())
  );
  if (filteredArray.length > 0) {
    for (const el of filteredArray) {
      document
        .querySelector(`.image-list li:nth-child(${el.id})`)
        .classList.remove(dNone);
    }
  }
  photosCounter.textContent = filteredArray.length;
}

function catClick(el) {
  searchInput.value = el.textContent;
  if (el.id == "games") {
    searchInput.value = "Games/Sports";
  }
  if (el.id == "charity") {
    searchInput.value = "Charity/Activism";
  }
  searchInput.dispatchEvent(new KeyboardEvent("keyup", { key: "y" }));
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
 
  document.getElementById("clubSelector").style.marginLeft="250px";
  document.getElementById("cardContainer").style.marginLeft="250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("navBut").style.marginLeft= "0";
  document.getElementById("clubSelector").style.marginLeft="0";
  document.getElementById("cardContainer").style.marginLeft="0";
}

        $(function(){
            //Gives you the distance from top of document to the element
            //no what you can see, think of it as if you print the page
            //and then measure the distance from the top to the nav...
            var navOffsetTop = $('.mainNav').offset().top;
            //Add a listener for the scroll movement
            $(window).scroll(function() {
                //Gives you how much pixels has moved the scrollbar
                var currentScroll = $(window).scrollTop();
                //If the distance puts you in the nav position
                if (currentScroll >= navOffsetTop) {
                    //Change the nav to be fixed in the page
                    $('.mainNav').css({
                        position: 'fixed',
                        top: '0',
                        left: '0'
                    });
                } else {
                    //Returns the nav to no-fixed position
                    $('.mainNav').css({
                        position: 'static'
                    });
                }
            });     
        }); 



$(document).ready(function() {
  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 8000,
      $pagination = $(".slider-pagi");
  
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };
  
  createBullets();
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });
  
});
