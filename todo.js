const todoArea = document.getElementById("todoWrapper");

//todo리스트 load
function loadTodo(day) {
    var loadDate = day

    let todoData = JSON.parse(localStorage.getItem(loadDate));
    if(todoData == null) {
        todoData = [];
        localStorage.setItem(loadDate, JSON.stringify(todoData));
    }
    let todoCount = JSON.parse(localStorage.getItem(loadDate)).length;

    $('#todoWrapper').children().remove();

    //todo리스트 없을때
    if(todoCount < 1){
        const empty = document.createElement('div');
        const emptyTxt = document.createElement('p');
        emptyTxt.innerHTML = 'Make Your To-Do List!';
        $(emptyTxt).css({
            'font-weight': 'bold',
            'font-size': '25px',
            'padding': '1vh 0 20vh 1vh',
            'color': 'grey',
        })

        empty.appendChild(emptyTxt);
        todoArea.appendChild(empty);
    }
    
    //todo개수만큼 리스트 생성
    for(var i = 0; i < todoCount; i++) {
        //todo의 div
        const todoContainer =  document.createElement('div');
        $(todoContainer).attr('id', 'todo' + i);
        $(todoContainer).css({
            'position': 'relative',
            'display': 'flex',
            'align-items': 'center',
        })

        //todo의 체크박스
        const checkBox =  document.createElement('input');
        checkBox.type = 'checkbox';
        $(checkBox).css({
            'width': '25px',
            'height': '25px',
            'opacity': '0',
        })
        $(checkBox).attr('id', 'box');

        const label = $("<label>").attr('for', 'box');
        $(label).css({
            'background': 'url(images/unchecked.png) no-repeat',
            'width': '25px',
            'height': '25px',
            'position': 'absolute',
        })

        //todo의 내용
        const checkText =  document.createElement('p');
        checkText.innerHTML = todoData[i].text;
        $(checkText).css({
            'width': '500px',
            'display': 'inline-block',
            'padding': '10px 0 5px 10px',
            'font-size': '20px',
        })

        //체크박스가 채워져있으면
        if(todoData[i].check == 1) {
            $(checkBox).prop('checked', true);

            $(label).css({
                'background': 'url(images/checked.png) no-repeat',
            })

            $(checkText).css({
                'font-color': 'grey',
                'text-decoration': 'line-through',
                'font-style': 'oblique',
            })
        }
       
        label.appendTo(todoContainer);
        todoContainer.appendChild(checkBox);
        todoContainer.appendChild(checkText);

        //todo 삭제버튼
        const deleteTodo = document.createElement('button');
        $(deleteTodo).attr('id', 'deletebtn');
        $(deleteTodo).css({
            'background': 'url(images/trashbin.png) no-repeat',
            'background-size': 'cover',
            'border': 'none',
            'width': '30px',
            'height': '30px',
        })
        
        todoContainer.appendChild(deleteTodo);

        todoArea.appendChild(todoContainer);
    }
}

function day() {
    var day = document.getElementById('calendar').value;
    console.log(day);
    localStorage.setItem('day', day);
    location.reload();
    init();
}

function init() {
    var Day = localStorage.getItem('day');
    if (Day == null) {
        var today = new Date().toISOString().substring(0, 10);
        document.getElementById('calendar').value = today;
        loadTodo(today);
        return;
    }
    loadTodo(Day);
    document.getElementById('calendar').value = Day;
}
init();

//todo리스트 추가
function addTodo() {
    var localDate = document.getElementById('calendar').value;

    var todo = document.getElementById('todoText').value;
    
    //빈 텍스트 입력 방지
    if(todo == ''){
        window.alert("Empty Task!");
        location.reload();
        return;
    }

    let todoList = {
        'check': 0,
        'text': todo,
    }

    let localData = JSON.parse(localStorage.getItem(localDate));
    if (localData == null) localData=[];

    localData.push(todoList);
    localStorage.setItem(localDate, JSON.stringify(localData));
    
    document.getElementById('todoText').value='';
    location.reload();
}

//체크박스 선택
$('input[type="checkbox"]').click(function(){
    var checkDate = document.getElementById('calendar').value;
    let checkData = JSON.parse(localStorage.getItem(checkDate));
    var index = $(this).parent().attr('id');
    index = index.replace('todo','');

    //체크x -> 체크o
    if(checkData[index].check == 0){
        let todoChecked = {
            'check': 1,
            'text': checkData[index].text,
        }

        let tempList = checkData.splice(index);
        checkData.splice(index);
        checkData.push(todoChecked);

        for(var i = 1; i < tempList.length; i++) {
            checkData.push(tempList[i]);
        }

        localStorage.setItem(checkDate, JSON.stringify(checkData));
        location.reload();
        return;
    }

    //체크o -> 체크x
    if(checkData[index].check == 1){
        let todoChecked = {
            'check': 0,
            'text': checkData[index].text,
        }

        let tempList = checkData.splice(index);
        checkData.splice(index);
        checkData.push(todoChecked);

        for(var i = 1; i < tempList.length; i++) {
            checkData.push(tempList[i]);
        }

        localStorage.setItem(checkDate, JSON.stringify(checkData));
        location.reload();
        return;
    }
})

//체크리스트 삭제
$(document).on("click", "#deletebtn", function() {
    var deleteDate = document.getElementById('calendar').value;
    let deleteData = JSON.parse(localStorage.getItem(deleteDate));
    var checkedIndex = $(this).parent().attr('id');
    checkedIndex = checkedIndex.replace('todo','');

    deleteData.splice(checkedIndex, 1);
    localStorage.setItem(deleteDate, JSON.stringify(deleteData));
    location.reload();
});

//좌측 메뉴
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