// piano.js (최종 수정)

document.addEventListener('DOMContentLoaded', () => {
    // 2그룹 텍스트 내용 정의 (공백 및 줄 바꿈을 보존)
    const group2OriginalText = `
        이렇게 검은 건반만 눌렀을 때 좋은 소리가 나는 이유는 아리랑을 비롯한 우리나라와 많은 나라의 민속 음악에서 사용되는 5음 음계와 간격이 동일하기 때문이다.
        화음을 이루는 음들의 주파수 비율이 작은 정수비로 떨어져야 예쁜 소리가 나는데 흰 건반들은 모두 가깝게 붙어있기 때문에 적당한 간격으로 떨어져있는 검은 건반들만 눌렀을 때 더 좋은 소리를 들을 수 있게 된다.
        ‘디터 드 라 모테’가 쓴 화성학 책에는 서양음악에 본격적으로 사용한 드뷔시의 음악에에서의 5음 음계의 특징을 ‘음계의 모든 음은 다른 어느 음과도 동시에 울릴 수 있다. 불협화음의 해결이라는 개념이 없다.’라고 정리하는데 이는 곧 5음 음계의 음들은 모두 동시에 소리를 내도 아무 문제가 없으며 이전에 조건적으로 사용했던 불협화음들을 5음 음계 내에서는 자유롭게 사용해도 좋다는 의미이다.
        즉 검은 건반을 뭉개서 치는 음악이 좋게 들릴 수 있는 이유는 화음을 이루는 음들과 같은 간격을 두는 음이기 때문이다.
    `.trim(); 

    const group2Container = document.getElementById('group2-text-container');
    let movingChars = []; 
    let animationTimeoutId = null; 
    let isRevealed = false;       
    let isAligned = false;        

    const blackImage = document.getElementById('black-image'); 
    const whiteImage = document.getElementById('white-image');

    const VW_LIMIT = 0.20; 
    let minY = 0; 

    // ⭐ [추가]: 되돌아가기 버튼 관련 요소 생성 ⭐
    const backButtonContainer = document.createElement('div');
    backButtonContainer.id = 'back-button-container';
    
    const backButtonImage = document.createElement('img');
    // 사용자님이 'Back' 이미지를 사용한다고 했으므로 파일명을 Back.png로 가정합니다. 
    // 실제 이미지 파일 경로(예: 'images/Back.png')가 있다면 그에 맞게 수정해주세요.
    backButtonImage.src = 'images/Back.png'; 
    backButtonImage.id = 'back-button-image';
    
    backButtonContainer.appendChild(backButtonImage);
    document.body.appendChild(backButtonContainer);

    // ⭐ [추가]: 되돌아가기 버튼 클릭 이벤트 ⭐
    backButtonContainer.addEventListener('click', () => {
        // 메인 창으로 돌아가는 로직 (index.html로 가정)
        // 실제 메인 페이지 파일명에 맞게 수정하세요.
        window.location.href = 'index.html'; 
    });
    
    const calculateMinY = (viewportWidth) => {
        minY = viewportWidth * VW_LIMIT;
    };
    
    // ----------------------------------------------------------------------
    // 2그룹 텍스트를 개별 글자 및 공백/줄 바꿈 요소로 분리하여 DOM에 추가
    // ----------------------------------------------------------------------
    const createMovingChars = () => {
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        calculateMinY(viewportWidth);
        
        // ⭐ [수정 핵심 1]: 모든 공백 문자를 유지하며 텍스트를 글자 단위로 분리 ⭐
        // 정규 표현식을 사용하여 글자와 공백, 줄 바꿈(\n)까지 모두 분리합니다.
        // (\s|[^ ]) : 공백이거나 공백이 아닌 모든 문자
        const allSegments = group2OriginalText.match(/(\n|\s|[^ ])/g) || [];

        allSegments.forEach((char) => {
            
            if (char === '\n' || char.match(/^\s+$/)) { 
                // ⭐ [수정 핵심 2]: 줄 바꿈 문자 또는 공백(space) 처리 ⭐
                const element = document.createElement(char === '\n' ? 'br' : 'span');
                
                if (char !== '\n') {
                    // 공백은 span으로 만들고, non-breaking space를 넣어 정렬 시 띄어쓰기를 보존합니다.
                    element.textContent = '\u00A0'; 
                    element.classList.add('space-holder');
                } else {
                    // 줄 바꿈은 <br>로 만들고, 정렬 시에만 보이도록 합니다.
                    element.classList.add('break-line');
                }
                group2Container.appendChild(element);
                return; // movingChars 배열에 추가하지 않습니다.
            }

            // ⭐ [수정 핵심 3]: 일반 글자 처리 (움직여야 하는 요소) ⭐
            const charSpan = document.createElement('span');
            charSpan.classList.add('moving-char');
            charSpan.textContent = char;
            group2Container.appendChild(charSpan);
            movingChars.push(charSpan); // 이 요소만 움직여야 합니다.
            
            // 초기 위치 설정 로직
            const availableHeight = viewportHeight - minY;
            const initialX = Math.random() * (viewportWidth - charSpan.offsetWidth);
            
            if (availableHeight > 0) {
                 const initialY = minY + (Math.random() * (availableHeight - charSpan.offsetHeight));
                 charSpan.style.transform = `translate(${initialX}px, ${initialY}px)`;
            } else {
                 charSpan.style.transform = `translate(${initialX}px, ${minY}px)`;
            }
        });
        
        // 텍스트 생성 후 즉시 애니메이션 시작
        animateChars(); 
    };

    // ----------------------------------------------------------------------
    // 개별 글자들을 랜덤하게 움직이는 함수 (유지)
    // ----------------------------------------------------------------------
    const animateChars = () => {
        const moveInterval = 5000; 
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        calculateMinY(viewportWidth);

        // movingChars 배열은 오직 'moving-char'만 포함하므로 애니메이션은 정상 작동합니다.
        movingChars.forEach(charSpan => { 
            const availableHeight = viewportHeight - minY;
            const newX = Math.random() * (viewportWidth - charSpan.offsetWidth);

            if (availableHeight > 0) {
                const newY = minY + (Math.random() * (availableHeight - charSpan.offsetHeight));
                charSpan.style.transform = `translate(${newX}px, ${newY}px)`;
            } else {
                 charSpan.style.transform = `translate(${newX}px, ${minY}px)`;
            }
        });

        animationTimeoutId = setTimeout(animateChars, moveInterval);
    };

    // ----------------------------------------------------------------------
    // 통합된 클릭 이벤트 핸들러 (유지)
    // ----------------------------------------------------------------------
    const handleImageClick = (event) => {
        const clickedElement = event.currentTarget;

        // 1. 투명도 전환 (첫 번째 클릭): black 또는 white 어떤 것을 클릭해도 텍스트가 보이게 합니다.
        if (!isRevealed) {
            group2Container.style.opacity = '1';
            group2Container.style.pointerEvents = 'auto'; 
            isRevealed = true;
            return; 
        }

        // 2. 정렬/해제 전환 (두 번째 클릭부터): 오직 blackImage만 정렬 기능을 수행합니다.
        if (isRevealed && clickedElement === blackImage) {
            
            isAligned = !isAligned;
            group2Container.classList.toggle('is-aligned', isAligned);
            
            backButtonContainer.classList.toggle('is-visible', isAligned);
            
            if (isAligned) {
                // 정렬 상태: 움직임 중지
                if (animationTimeoutId) {
                    clearTimeout(animationTimeoutId);
                    animationTimeoutId = null;
                }
            } else {
                // 정렬 해제: 움직임 재시작
                if (!animationTimeoutId) { 
                    animateChars();
                }
            }
        }
    };

    if (blackImage && whiteImage) {
        blackImage.addEventListener('click', handleImageClick);
        whiteImage.addEventListener('click', handleImageClick); 
        
        blackImage.style.cursor = 'pointer';
        whiteImage.style.cursor = 'pointer';
    } else {
        console.error("Piano image elements not found. Check piano.html IDs (black-image, white-image).");
    }
    
    // 페이지 로드 시 실행 (텍스트 생성 및 움직임 시작)
    createMovingChars();

    window.addEventListener('resize', animateChars);
});