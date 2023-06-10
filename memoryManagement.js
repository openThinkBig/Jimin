const travelArea = document.getElementById("pic_line");

let travelData = JSON.parse(localStorage.getItem('travelData'));
if (travelData == null) travelData=[];

// 새 추억 페이지를 그리는 함수
function newPic() {
    //여행기록 틀
    let travelNum = localStorage.getItem('travelNum');
    travelNum++;
    localStorage.setItem('travelNum', travelNum);

    var travelId = 'travel' + travelNum;
    const newTravelPad = document.createElement("div");
    $(newTravelPad).css({
        'width': '250px',
        'height': '250px',
        'margin': '5px 5px 30px 5px',
        'position': 'relative',
    })
    $(newTravelPad).attr('id', travelId);

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
    $(newMemoText).attr('id', 'text' + travelNum);
    newMemoPadding.appendChild(newMemoText);
    newTravelPad.appendChild(newMemoPadding);

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
    newTravelPad.appendChild(newMemoCorner);

    travelArea.appendChild(newTravelPad);

    let travelInfo = {
        id : travelId,
        text: '',
    }

    travelData.push(travelInfo);
    localStorage.setItem('travelData', JSON.stringify(travelData));

    location.reload();
}