
//메뉴//    
var checkMenu = 0;
menuBtn = $(".menuBtn");

$(".menuBtn").click(function () {
    if (checkMenu == 0) {
        $(".menu").animate({
            width: "toggle"
        }, 400, "linear");
        $(".menuBtn").animate({
            left: "3px"
        }, 400);
        checkMenu = 1;
        return;
    } else if (checkMenu == 1) {
        $(".menu").animate({
            width: "toggle"
        }, 400, "linear");
        $(".menuBtn").animate({
            left: "250px"
        }, 400);
        checkMenu = 0;
        return;
    }
})
 








//영화 추가하는 div 생성과 삭제 *정확히는 나타났다 가렸다가
   
function add_div() {
    document.getElementById('part1').style.display = "block";
}
function remove_div(obj) {
    document.getElementById('part1').style.display = "none";
}


function add_div_movie() {
    // var div = document.createElement('div');
    // div.innerHTML = document.getElementById('movieLine').innerHTML;
    // document.getElementById('movieWrapper').appendChild(div);
    document.getElementById('part1').style.display = "none";
}



function toggleBtn1() {
  
    // 토글 할 버튼 선택 (btn1)
    const btn1 = document.getElementById('haveToToggle');
    
    // btn1 숨기기 (visibility: hidden)
    if(btn1.style.visibility !== 'hidden') {
      btn1.style.visibility = 'hidden';
    }
    // btn` 보이기 (visibility: visible)
    else {
      btn1.style.visibility = 'visible';
    }
    
  }





    //별 부분을 해보자  => 기능 안됨
    // const ratingStars = [...document.getElementsByClassName("rating__star")];
    // const ratingResult = document.querySelector(".rating__result");
    
    // printRatingResult(ratingResult);
    
    // function executeRating(stars, result) {
    //    const starClassActive = "rating__star fas fa-star";
    //    const starClassUnactive = "rating__star far fa-star";
    //    const starsLength = stars.length;
    //    let i;
    //    stars.map((star) => {
    //       star.onclick = () => {
    //          i = stars.indexOf(star);
    
    //          if (star.className.indexOf(starClassUnactive) !== -1) {
    //             printRatingResult(result, i + 1);
    //             for (i; i >= 0; --i) stars[i].className = starClassActive;
    //          } else {
    //             printRatingResult(result, i);
    //             for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
    //          }
    //       };
    //    });
    // }
    
    // function printRatingResult(result, num=0) {
    //    result.textContent = '${num}/5';
    // }
    
    // executeRating(ratingStars, ratingResult);


   

    


//로컬 스토리지 연결 부분

let wrapper = document.getElementById("movieWrapper");

let movieData = JSON.parse(localStorage.getItem('movieData'));
if (movieData == null) movieData=[];

function init() {
    let movieDataNum = movieData.length;
    for(var i = 0; i < movieDataNum; i++) {
        let container = document.createElement('div');
        let posterImg = document.createElement('img');
        $(posterImg).attr({
            src: movieData[i].poster,
            id: "d"
        });
        $(posterImg).css({
            'width': '285',
            'height': '360',
        });

        let posterTitle = document.createElement('h4');
        posterTitle.innerHTML = movieData[i].name;

        let posterComment = document.createElement('p');
        posterComment.innerHTML =  movieData[i].comment;
        
        $(posterImg).click(function(){
            $(posterTitle).toggle("slow");
            $(posterComment).toggle("slow");
        })

        

        container.appendChild(posterImg);
        container.appendChild(posterTitle);
        container.appendChild(posterComment);

        wrapper.appendChild(container);
    }
}
init();


const fileInput = document.getElementById("chooseFile");
var result;

// 파일 교체
fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    //console.log(selectedFile);
};

$("#chooseFile").on("change", function (event){
    var file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        $(".image-show").attr("src", e.target.result);
        result = e.target.result;
        //console.log(result);
    }

    reader.readAsDataURL(file);
});


function newMovie() {
    add_div_movie();
    let movieName = document.getElementById("tit").value;
    let text = document.getElementById("textarea").value;

    if(movieName == '') {
        window.alert("Enter the movie title.");
        location.reload();
        return;
    }

    let movie = {
        name : movieName,
        poster: result,
        comment: text,
    }

    movieData.push(movie);
    localStorage.setItem('movieData', JSON.stringify(movieData));

    console.log(movieName);
    location.reload();
}



// let profileData = JSON.parse(localStorage.getItem('profileData'));
// let name = profileData[0].name;
// let img = profileData[0].profile;

// $("#profileImg").attr("src", img);
// document.getElementById("name").innerHTML = name;


// let MovieData = JSON.parse(localStorage.getItem('movieData'));

// let name = MovieData[0].name;
// let img = MovieData[0].poster;
// let review = MovieData[0].comment;


// document.getElementById("movieTitle").innerHTML = name;
// $("#movieImg").attr("src", img);

// document.getElementById("text").innerHTML = review;