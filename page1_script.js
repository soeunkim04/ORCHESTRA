// page1_script.js

document.addEventListener('DOMContentLoaded', () => {
    const centerFlipper = document.getElementById('background-image-flipper');
    const leftSideImage = document.getElementById('left-side-image');
    const rightSideImage = document.getElementById('right-side-image');

    // ---------------------- 중앙 이미지 회전 관련 변수 ----------------------
    let isFlipped = false;
    let flipIntervalId = null;   
    const FLIP_INTERVAL = 200;   
    // ----------------------------------------------------------------------
    
    // ---------------------- 마우스 이동 및 속도 관련 변수 ------------------
    let mouseTimeoutId = null;   
    const MOUSE_STOP_DELAY = 100; 
    const SLOW_SPEED = '18s'; // 느린 속도 (CSS 변수 값)
    const FAST_SPEED = '5s';  // 빠른 속도 (CSS 변수 값)
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
        }
    };

    /**
     * ⚠️ [수정]: 속도만 변경하고 애니메이션은 계속 실행되도록 합니다.
     * @param {string} speed - CSS 변수에 적용할 속도 값 ('15s', '5s' 등)
     */
    const setSideSpeed = (speed) => {
        leftSideImage.style.setProperty('--animation-speed', speed);
        rightSideImage.style.setProperty('--animation-speed', speed);
    };

    // 마우스 움직임 처리 함수
    const handleMouseMove = () => {
        // 1. 중앙 이미지 회전 시작
        startFlipping();

        // 2. 사이드 이미지 속도를 빠르게 변경 (FAST_SPEED)
        setSideSpeed(FAST_SPEED);

        // 3. 마우스 멈춤 감지 타이머 재설정
        clearTimeout(mouseTimeoutId);
        mouseTimeoutId = setTimeout(() => {
            // 마우스가 멈추면 중앙 이미지 회전 중지
            stopFlipping();
            
            // 4. 마우스가 멈추면 사이드 이미지 속도를 느리게 복원 (SLOW_SPEED)
            setSideSpeed(SLOW_SPEED);
        }, MOUSE_STOP_DELAY); 
    };
    
    // 초기 속도를 SLOW_SPEED로 설정
    setSideSpeed(SLOW_SPEED);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
});