    let localName;
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 14 // 지도의 확대 레벨
        };  

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);
    let chk = 0; 

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    var markers = [];

    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    const add_element = document.getElementById("add"); // add 버튼이 클릭했을 때 이벤트를 등록시키기 위해 사용하는 변수입니다

    // add 버튼을 누른 뒤 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    add_element.addEventListener("click", function(){
        chk = 1; // add 클릭 시에만 지도에 정보를 추가할 수 있는 이벤트를 위해 add가 클릭됐는지 확인하는 변수입니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            // 마커를 생성합니다
            if (status === kakao.maps.services.Status.OK && chk === 1) {
                var marker = new kakao.maps.Marker({
                        position: mouseEvent.latLng
                    });
                $('#default').css('display', 'none');
                $('#part1').css('display', 'block');

                $("#tit").val("");
                $("#text_are").val("");
                var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                
                var content = '<div class="bAddr">' +
                                detailAddr + 
                            '</div>';


                var infoDiv = document.getElementById('addrTxt');
                let regionName = result[0].address.address_name;
                let region='';

                var count = 0;
                var save_region = [];

                for(var i = 0; i < regionName.length; i++){
                    if(regionName[i] == ' '){
                        break;
                    }
                    save_region[i] = regionName[i];
                }

                for(var i=0;i<save_region.length;i++) {
                    region+=save_region[i];
                }

                infoDiv.innerHTML = region;

                localName=region;

                // 마커를 클릭한 위치에 표시합니다 
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
            markers.push(marker);   
        });
        });
    });


    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
    }

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    let travelData = JSON.parse(localStorage.getItem('travelData'));
    if (travelData == null) travelData=[];

    const fileInput = document.getElementById("chooseFile");
    var resultImg;

    // 파일 교체
    fileInput.onchange = () => {
        const selectedFile = fileInput.files[0];
        console.log(selectedFile);
    };
    $("#chooseFile").on("change", function (event){
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            $(".image-show").attr("src", e.target.result);
            resultImg = e.target.result;
        }

        reader.readAsDataURL(file);
    });

    const save_element = document.getElementById("save"); // save 버튼이 클릭했을 때 이벤트를 등록시키기 위해 사용하는 변수입니다

    // add 버튼을 누른 뒤 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    save_element.addEventListener("click", function(){
        infowindow.close();
        $('#part1').css('display', 'none');
        $('#default').css('display', 'block');
        console.log("localName");
        console.log(localName);
        let localDatas = JSON.parse(localStorage.getItem(localName));
        if(localDatas==null){
            localDatas=[];
        }

        var titleTxt = document.getElementById("tit").value;
        var contentTxt = document.getElementById("text_are").value;

        let data = {
            title: titleTxt,
            img: resultImg,
            content: contentTxt,
        }

        localDatas.push(data);
        localStorage.setItem(localName, JSON.stringify(localDatas));

        window.alert("저장되었습니다.");
        chk = 0;
    });

    let wrapper = document.getElementById("wrapperWrapper");
    let part = document.getElementById("part1");
    function search() {
        $('#default').css('display', 'none');
        $("#part1").css({
            "display": "block",
        })
        $('#wrapperWrapper').children().remove();
        $("#wrapperWrapper").css({
            "display": "block",
            "width" : "650px",
            "height" : "450px"
        })
        $('#part1').children().remove();

        $('#information').children().remove();
        let searchName = document.getElementById('search').value;
        let regionData = JSON.parse(localStorage.getItem(searchName));
        if(regionData==null){
            window.alert("No data");
            return;
        }

        var dataNum=JSON.parse(localStorage.getItem(searchName)).length;
        
        for(var i=0;i<dataNum;i++){
            let thumbnail = document.createElement("img");
            $(thumbnail).attr("src", regionData[i].img);
            $(thumbnail).attr("id", i);
            $(thumbnail).attr("class", "img");
            $(thumbnail).css({
                "width": "200px",
                "height": "150px",
                "border-radius": "5px",
                "margin-right" : "10px",
                "margin-bottom" : "10px"
            })
            wrapper.appendChild(thumbnail);
        }
        part.appendChild(wrapper);

        $(".img").click(function(){
            $('#part1').children().remove();

            $('#information').children().remove();

            let id = $(this).attr('id');
            let area = document.getElementById("information");
            $("#information").css({
                "display": "block",
            })

            let infoContainer = document.createElement("div");
            let titleInfo = document.createElement("h4");
            titleInfo.innerHTML = regionData[id].title;
            infoContainer.appendChild(titleInfo);
            $(infoContainer).css({
                "margin-top" : "40px"
            })

            let imgInfo = document.createElement("img");
            $(imgInfo).attr("src", regionData[id].img);
            $(imgInfo).css({
                "width": "300px",
                "height": "200px",
                "border-radius": "5px",
                "margin-left" : "100px"
            })
            infoContainer.appendChild(imgInfo);

            let contentInfo = document.createElement("p");
            $(contentInfo).css({
                "width": "500px",
                "height": "250px",
                "margin-top" : "20px"
            })
            contentInfo.innerHTML = regionData[id].content;
            infoContainer.appendChild(contentInfo);

            area.appendChild(infoContainer);
            part.appendChild(area);
        });
    }


    var checkMenu = 0;
        menuBtn = $(".menuBtn");

        $(".menuBtn").click(function() {
            if(checkMenu == 0) {
                $(".menu").animate({
                width: "toggle"
                }, 400, "linear");
                $(".menuBtn").animate({
                    left: "3px"
                }, 400);
                checkMenu = 1;
                return;
            } else if(checkMenu == 1) {
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