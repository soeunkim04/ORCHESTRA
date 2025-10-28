// page1_script.js

document.addEventListener('DOMContentLoaded', () => {
    const centerFlipper = document.getElementById('background-image-flipper');
    const leftSideImage = document.getElementById('left-side-image');
    const rightSideImage = document.getElementById('right-side-image');

    // ---------------------- 중앙 이미지 회전 관련 변수 ----------------------
    let isFlipped = false;
    let flipIntervalId = null;   
    const FLIP_INTERVAL = 500;   
    // ----------------------------------------------------------------------
    
    // ---------------------- 마우스 이동 및 속도 관련 변수 ------------------
    let mouseTimeoutId = null;   
    const MOUSE_STOP_DELAY = 100; // ⚠️ 마우스 멈춤 감지 지연 시간을 500ms로 설정 (안정성 증가)
    const SLOW_SPEED = '0s'; // 느린 속도 (CSS 변수 값 예시)
    const FAST_SPEED = '10s';  // 빠른 속도 (CSS 변수 값 예시)
    // ----------------------------------------------------------------------

    // 중앙 이미지 회전 시작/중지 함수 (기존 로직 유지)
    const startFlipping = () => {
        if (flipIntervalId !== null) return;
        flipIntervalId = setInterval(() => {
            isFlipped = !isFlipped;
            centerFlipper.classList.toggle('flipped', isFlipped);
        }, FLIP_INTERVAL); 
    };
    const stopFlipping = () => {
        if (flipIntervalId !== null) {
            clearInterval(flipIntervalId);
            flipIntervalId = null;
            // 멈출 때 정방향으로 고정
            centerFlipper.classList.remove('flipped');
        }
    };

    /**
     * 속도만 변경하고 애니메이션은 계속 실행되도록 합니다.
     * @param {string} speed - CSS 변수에 적용할 속도 값 ('15s', '5s' 등)
     */
    const setSideSpeed = (speed) => {
        leftSideImage.style.setProperty('--animation-speed', speed);
        rightSideImage.style.setProperty('--animation-speed', speed);
    };

    // 마우스 움직임 처리 함수
    const handleMouseMove = () => {
        // 1. ⚠️ [수정]: 마우스를 움직일 때 중앙 이미지 회전 중지 (반응 상태)
        stopFlipping();

        // 2. 사이드 이미지 속도를 빠르게 변경 (FAST_SPEED)
        setSideSpeed(FAST_SPEED);

        // 3. 마우스 멈춤 감지 타이머 재설정
        clearTimeout(mouseTimeoutId);
        mouseTimeoutId = setTimeout(() => {
            // 4. ⚠️ [수정]: 마우스가 멈추면 중앙 이미지 회전 시작 (기본 상태 복귀)
            startFlipping();
            
            // 5. 마우스가 멈추면 사이드 이미지 속도를 느리게 복원 (SLOW_SPEED)
            setSideSpeed(SLOW_SPEED);
        }, MOUSE_STOP_DELAY); 
    };
    
    // ---------------------- 초기화 로직 ----------------------
    // 1. ⚠️ [수정]: 초기 상태는 마우스가 멈춰있는 상태이므로, 중앙 이미지 회전 시작
    startFlipping();

    // 2. 초기 사이드 속도는 SLOW_SPEED로 설정 (기본 상태)
    setSideSpeed(SLOW_SPEED);
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
});


// 모든 하위 페이지 (mirror.html, gun.html, joke.html 등)의 <script> 태그 안에 추가

document.addEventListener('DOMContentLoaded', () => {
    // 1. 메인 창의 URL을 상수로 정의 (메인 창 파일 이름으로 수정하세요)
    const MAIN_PAGE_URL = 'index.html'; // ⚠️ 메인 페이지의 실제 파일명으로 수정하세요.
    
    // 2. ORCHESTRA 이미지에 부여할 클래스명
    const RETURN_BUTTON_CLASS = '.orchestra-return'; // 예시 클래스명
    
    // 3. 해당 클래스를 가진 모든 요소를 찾아서 이벤트를 추가합니다.
    const returnButtons = document.querySelectorAll(RETURN_BUTTON_CLASS);

    returnButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 링크 동작 방지

            // 클릭 시 메인 창으로 이동
            window.location.href = MAIN_PAGE_URL;
        });
    });
});