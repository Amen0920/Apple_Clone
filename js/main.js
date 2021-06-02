(() => {
    let yOffset = 0;   //pageYOffset 담을 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 보다 이전에 위치한 스크롤 섹션들의 높이합
    let currentScene = 0; // 현재 활성화된 씬 (scroll-section);

    let enterNewScene = false; // 새로운 scene이 시작되는 순간 true

    const scenInfo = [
        {
            // 0
            heightNum:5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight:0,
            type:'stick',
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA :document.querySelector('#scroll-section-0 .main-message.a'),
                messageB :document.querySelector('#scroll-section-0 .main-message.b'),
                messageC :document.querySelector('#scroll-section-0 .main-message.c'),
                messageD :document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values:{
                messageA_opacity: [0,1, {start:0.1, end:0.2}],
                messageB_opacity: [0,1, {start:0.3, end:0.4}],
                messageC_opacity: [0,1, {start:0.5, end:0.6}],
                messageC_opacity: [0,1, {start:0.7, end:0.8}],
                

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
    function calcValues (values,currentYOffset) {
        let rv; 
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기.
        const scrollRatio = currentYOffset / scrollHeight;

        if(values[2]){
            // start end 가 있는 경우. start~end 사이에 animation 실행.
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
            if(currentYOffset < partScrollStart){ 
                rv = values[0];
            }else if(currentYOffset > partScrollEnd){
                rv = values[1];
            }else{
                rv = (currentYOffset-partScrollStart)/partScrollHeight * (values[1] - values[0]) + values[0]; 
            }
        }else{
            rv = scrollRatio * (values[1] - values[0]) + values[0]; 
        }
       
        return rv;
    }

    function playAnimation () {
        const objs = scenInfo[currentScene].objs;
        const values = scenInfo[currentScene].values;
        const currentYOffset =  yOffset-prevScrollHeight;
      
       
        switch (currentScene) {
            case 0 : 
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log('opacity ratio : ',messageA_opacity_in)
                break;
            case 1 : 
                break;
            case 2 :
                break;
            case 3:
                break;

        }
    }
    
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;
        }

        // currentScene 이 바뀔때만 body태그 아이디 변경해줌.
        if(yOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight) {
            if(currentScene == 3) return;
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if(yOffset < prevScrollHeight){
            if(currentScene == 0)return;
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }

        if(enterNewScene) return;
        playAnimation();
    }
 
    
    window.addEventListener('scroll',() => {
        yOffset = pageYOffset;
        scrollLoop();
    });
    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);
    
})();