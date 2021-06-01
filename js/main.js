(() => {
    let yOffset = 0;   //pageYOffset 담을 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 높이합
    let currentScene = 0; // 현재 활성화된 씬 (scroll-section);

    const scenInfo = [
        {
            // 0
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight:0,
            type:'stick',
            objs:{
                container:document.querySelector('#scroll-section-0'),
            }
        },
        {   
            // 1
            heightNum:5, 
            scrollHeight:0,
            type:'nomal',
            objs:{
                container:document.querySelector('#scroll-section-1'),
            }
        },
        {
            // 2
            heightNum:5, 
            scrollHeight:0,
            type:'stick',
            objs:{
                container:document.querySelector('#scroll-section-2'),
            }
        },
        {
            // 3
            heightNum:5,
            scrollHeight:0,
            type:'stick',
            objs:{
                container:document.querySelector('#scroll-section-3'),
            }
        }
    ]

    function setLayout () {
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < scenInfo.length; i++){
            scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
            scenInfo[i].objs.container.style.height = `${scenInfo[i].scrollHeight}px`;
        }

        // 이 js에서 pageYOffset을 yOffset에 담아 사용하기로했으므로 넣어줌.
        yOffset = pageYOffset;

        // 처음실행시, resize할때 currentScene값을 제대로 지정해줌.
        let totalScrollHeight = 0;
        for(let i =0; i < scenInfo.length; i++){
            totalScrollHeight += scenInfo[i].scrollHeight;
            if( totalScrollHeight >= yOffset ){
                currentScene = i;
                break;

            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`)
    }
    
    function scrollLoop() {
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;
        }

        // currentScene 이 바뀔때만 body태그 아이디 변경해줌.
        if(yOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight) {
            if(currentScene == 3) return;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if(yOffset < prevScrollHeight){
            if(currentScene == 0)return;
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
    }
 
    
    window.addEventListener('scroll',() => {
        yOffset = pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);
    
})();