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
        var part_1 = document.getElementById("part1"); // add 버튼이 클릭됐을 때 출력될 div를 위해 사용하는 변수입니다

        // add 버튼을 누른 뒤 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        add_element.addEventListener("click", function(){
            chk = 1; // add 클릭 시에만 지도에 정보를 추가할 수 있는 이벤트를 위해 add가 클릭됐는지 확인하는 변수입니다
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                        position: mouseEvent.latLng
                    });
                if (status === kakao.maps.services.Status.OK && chk === 1) {
                    part_1.style.display = "block";
                    $("#part2").hide();
                    $("#part3").hide();
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                    
                    var content = '<div class="bAddr">' +
                                    detailAddr + 
                                '</div>';
                    

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

        // 지도를 클릭했을 시 클릭되는 행정동 위치 정보를 넣습니다
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                $("#defaultAddr").hide();
                part_2.style.display = "block";
                $("#part3").hide();

                var infoDiv = document.getElementById('clickAddr');

                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }   
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


        const fileInput = document.getElementById("chooseFile");
        var result;

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
                result = e.target.result;
                console.log(result);
            }

            reader.readAsDataURL(file);
        });

        const save_element = document.getElementById("save"); // save 버튼이 클릭했을 때 이벤트를 등록시키기 위해 사용하는 변수입니다
        var part_2 = document.getElementById("part2"); // save 버튼이 클릭됐을 때 출력될 div를 위해 사용하는 변수입니다
        var part_3 = document.getElementById("part3");

        // add 버튼을 누른 뒤 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        save_element.addEventListener("click", function(){
            infowindow.close();
            part_2.style.display = "block";
            $("#part1").hide();
            $("#part3").hide();
            alert("저장되었습니다.");
            chk = 0;
        });

        function hide(obj){
            document.getElementById('part2').style.display="none";
            part_3.style.display = "block";
        }