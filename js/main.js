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
            type:'sticky',
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA :document.querySelector('#scroll-section-0 .main-message.a'),
                messageB :document.querySelector('#scroll-section-0 .main-message.b'),
                messageC :document.querySelector('#scroll-section-0 .main-message.c'),
                messageD :document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values:{
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],

                messageA_translateY_in:[20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in:[20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in:[20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in:[20, 0, { start: 0.7, end: 0.8 }],
               
                messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
                messageB_opacity_out: [1, 0, {start: 0.45, end: 0.5}],
                messageC_opacity_out: [1, 0, {start: 0.65, end: 0.7}],
                messageD_opacity_out: [1, 0, {start: 0.85, end: 0.9}],
               
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3}],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5}],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7}],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9}],
            }
        },
        {   
            // 1
            // heightNum:5,   nomal 에서는 필요없음.
            scrollHeight:0,
            type:'nomal',
            objs:{
                container: document.querySelector('#scroll-section-1'),
               
            
            },
           
        },
        {
            // 2
            heightNum:5, 
            scrollHeight:0,
            type:'sticky',
            objs:{
                container:document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
            },
            values: {
                messageA_translateY_in: [20, 0, { start:0.15, end:0.2 }],
                messageB_translateY_in: [30, 0, { start:0.5, end:0.55 }],
                messageC_translateY_in: [30, 0, { start:0.72, end:0.77 }],

                messageA_opacity_in: [0, 1, {start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, {start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, {start: 0.72, end: 0.77 }],

                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
				messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
				messageC_translateY_out: [0, -20, { start: 0.93, end: 0.97 }],

                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
				messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
				messageC_opacity_out: [1, 0, { start: 0.93, end: 0.97 }],

                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 3
            heightNum:5,
            scrollHeight:0,
            type:'sticky',
            objs:{
                container:document.querySelector('#scroll-section-3'),
            },
            values:{

            }
        }
    ]

    function setLayout () {
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < scenInfo.length; i++){
            if(scenInfo[i].type === 'sticky'){  
                scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
            }else if(scenInfo[i].type === 'nomal'){
                scenInfo[i].scrollHeight = scenInfo[i].objs.container.offsetHeight;
            }
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
        const scrollHeight = scenInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
      
       
        switch (currentScene) {
            case 0 : 
                if(scrollRatio <= 0.22){
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);;
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%,0)`;
                }else{
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out,currentYOffset)}%, 0)`;
                }
    
                if(scrollRatio <= 0.42 ){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;

                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out,currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out,currentYOffset)}%, 0)`;
                }

                if(scrollRatio <= 0.62 ){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out,currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out,currentYOffset)}%, 0)`; 
                }
            
                if(scrollRatio <= 0.82){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                }else{
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out,currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out,currentYOffset)}%, 0)`; 
                }
                break;
            case 1 : 
                break;
            case 2 :
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
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