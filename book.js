
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
 








//책을 추가하는 div 생성과 삭제 
   
function add_div() {
    document.getElementById('part1').style.display = "block";
}
function remove_div(obj) {
    document.getElementById('part1').style.display = "none";
}


function add_div_book() {
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




    


//로컬 스토리지 연결 부분

let wrapper = document.getElementById("bookWrapper");

let bookData = JSON.parse(localStorage.getItem('bookData'));
if (bookData == null) bookData=[];

function init() {
    let bookDataNum = bookData.length;
    for(var i = 0; i < bookDataNum; i++) {
        let container = document.createElement('div');
        let posterImg = document.createElement('img');
        $(posterImg).attr({
            src: bookData[i].poster,
            id: "d"
        });
        $(posterImg).css({
            'width': '285',
            'height': '360',
        });

        let posterTitle = document.createElement('h4');
        posterTitle.innerHTML = bookData[i].name;

        let posterComment = document.createElement('p');
        posterComment.innerHTML =  bookData[i].comment;
        
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


function newBook() {
    add_div_book();
    let bookName = document.getElementById("tit").value;
    let text = document.getElementById("textarea").value;

    if(bookName == '') {
        window.alert("Enter the book title.");
        location.reload();
        return;
    }

    let book = {
        name : bookName,
        poster: result,
        comment: text,
    }

    bookData.push(book);
    localStorage.setItem('bookData', JSON.stringify(bookData));

    console.log(bookName);
    location.reload();
}


