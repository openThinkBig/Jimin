const memoArea = document.getElementById("memoWrapper");
var colorCode = ['ffecb5', 'dbf0f9', 'd6f5d6', 'ffeaf0', 'ede2f0'];

let memoData = JSON.parse(localStorage.getItem('memoData'));
if (memoData == null) memoData=[];

// 새 메모장 그리는 함수
function newMemo() {
    //메모창 틀
    let memoNum = localStorage.getItem('memoNum');
    memoNum++;
    localStorage.setItem('memoNum', memoNum);

    var memoId = 'memo' + memoNum;
    var memoColor = '#' + colorCode[Math.floor(Math.random() * colorCode.length)];
    const newMemoPad = document.createElement("div");
    $(newMemoPad).css({
        'width': '250px',
        'height': '250px',
        'margin': '5px 5px 30px 5px',
        'position': 'relative',
        'background-color': memoColor
    })
    $(newMemoPad).attr('id', memoId);

    //메모 글쓰는 부분
    const newMemoPadding = document.createElement("div");
    $(newMemoPadding).css({
        'padding' : '7px'
    })

    const newMemoText = document.createElement("textarea");
    $(newMemoText).css({
        'width': '230px',
        'height': '230px',
        'max-width':'230px',
        'word-wrap': 'break-word',
        'overflow': 'auto',
        'border': 'none',
        'resize': 'none',
        'background-color': 'rgb(255, 255, 255, 0)',
        'font-size': '20px',
        'font-style': 'oblique',
        'color': 'rgb(0, 0, 0, 0.6)',
    })
    $(newMemoText).attr('id', 'text' + memoNum);
    newMemoPadding.appendChild(newMemoText);
    newMemoPad.appendChild(newMemoPadding);

    //메모창 접힘부분
    const newMemoCorner = document.createElement("div");
    $(newMemoCorner).css({
        'width': '0',
        'height': '0',
        'border-bottom': '10px solid white',
        'border-top': '10px solid #b8b8b8',
        'border-left': '10px solid #b8b8b8',
        'border-right': '10px solid white',
        'position': 'absolute',
        'bottom': '0',
        'right': '0'
    })
    newMemoPad.appendChild(newMemoCorner);

    memoArea.appendChild(newMemoPad);

    let memoInfo = {
        id : memoId,
        color: memoColor,
        text: '',
    }

    memoData.push(memoInfo);
    localStorage.setItem('memoData', JSON.stringify(memoData));

    location.reload();
}

//페이지 로딩시 저장된 메모 불러오는 함수
function init() {
    let memoCount = JSON.parse(localStorage.getItem('memoData')).length;

    if(memoCount < 1) {
        localStorage.removeItem('memoNum');
    }

    let localMemoInfo = JSON.parse(localStorage.getItem('memoData'));

    for (let i = 0; i < memoCount; i++) {
        const localMemoPad = document.createElement("div");
        $(localMemoPad).css({
            'width': '250px',
            'height': '250px',
            'margin': '5px 5px 30px 5px',
            'position': 'relative',
            'background-color': localMemoInfo[i].color
        })
        $(localMemoPad).attr('id', localMemoInfo[i].id);

        const localMemoPadding = document.createElement("div");
        $(localMemoPadding).css({
            'padding' : '7px'
        })

        //텍스트부분
        const localMemoText = document.createElement("textarea");
        localMemoText.value = localMemoInfo[i].text;
        $(localMemoText).css({
            'width': '230px',
            'height': '230px',
            'max-width':'230px',
            'word-wrap': 'break-word',
            'overflow': 'auto',
            'border': 'none',
            'resize': 'none',
            'background-color': 'rgb(255, 255, 255, 0)',
            'font-size': '20px',
            'font-style': 'oblique',
            'color': 'rgb(0, 0, 0, 0.6)',
        })
        var localTextID = localMemoInfo[i].id.replace('memo', 'text');
        $(localMemoText).attr('id', localTextID);
        localMemoPadding.appendChild(localMemoText);
        localMemoPad.appendChild(localMemoPadding);

        //접힘부분
        const localMemoCorner = document.createElement("div");
        $(localMemoCorner).css({
            'width': '0',
            'height': '0',
            'border-bottom': '10px solid white',
            'border-top': '10px solid #b8b8b8',
            'border-left': '10px solid #b8b8b8',
            'border-right': '10px solid white',
            'position': 'absolute',
            'bottom': '0',
            'right': '0'
        })
        localMemoPad.appendChild(localMemoCorner);

        memoArea.appendChild(localMemoPad);
    }
}
init();

//메모장 클릭하면 버튼 생김
$('textarea').click(function(){
    let localMemoInfos = JSON.parse(localStorage.getItem('memoData'));

    let clickedID = $(this).parent().parent().attr('id');

    let clickedMemo = document.getElementById(clickedID);

    //클릭하면 생기는 버튼부분
    const localBtnWrapper = document.createElement('div');
    $(localBtnWrapper).css({
        'width': '250px',
        'height': '20px',
    })

    const localBtn = document.createElement('button');
    localBtn.innerHTML = "✗";
    $(localBtn).css({
        'border': 'none',
        'background-color': 'rgb(255, 255, 255, 0)',
        'font-weight': 'bold',
        'color' : 'red',
        'display': 'inline-block',
        'float': 'right',
    })
    localBtnWrapper.appendChild(localBtn);

    //X버튼 눌릴 시 메모 삭제하는 함수
    $(localBtn).click(function(){
        var index = localMemoInfos.findIndex(obj => obj.id == clickedID);
        localMemoInfos.splice(index, 1);
        localStorage.setItem('memoData', JSON.stringify(localMemoInfos));

        location.reload();
    })

    const localEditBtn = document.createElement('button');
    localEditBtn.innerHTML = "✓";
    $(localEditBtn).css({
        'border': 'none',
        'background-color': 'rgb(255, 255, 255, 0)',
        'font-weight': 'bold',
        'color' : 'blue',
        'display': 'inline-block',
        'float': 'right',
    })
    localBtnWrapper.appendChild(localEditBtn);

    //v버튼 눌릴 시 메모 수정 저장하는 함수
    $(localEditBtn).click(function(){
        var index = localMemoInfos.findIndex(obj => obj.id == clickedID);

        let clickedTextID = clickedID.replace('memo', 'text');
        var newText = document.getElementById(clickedTextID).value;

        let changedMemo = {
            id : localMemoInfos[index].id,
            color: localMemoInfos[index].color,
            text: newText,
        }

        //선택한 메모의 뒷메모들 저장
        let tempLocalMemo = localMemoInfos.splice(index+1);

        //선택한 메모의 앞 메모들 저장
        localMemoInfos.splice(index);

        //앞 메모+수정된 메모
        localMemoInfos.push(changedMemo);

        //뒷메모 다시 붙이기
        for(var i = 0; i < tempLocalMemo.length; i++) {
            localMemoInfos.push(tempLocalMemo[i]);
        }

        localStorage.setItem('memoData', JSON.stringify(localMemoInfos));

        location.reload();
    })

    var eleCount = clickedMemo.childElementCount;
    if(eleCount < 3) {
        clickedMemo.appendChild(localBtnWrapper);
    }
});
    
//좌측 메뉴바 관련 함수
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