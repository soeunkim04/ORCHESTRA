// gun.js
// ----------------------------------------------------------------------
// ✅ [사운드 제어 변수 및 함수] (메인창에서 복사/추가)
// ----------------------------------------------------------------------
// 오디오 파일 경로 정의 (gun.html이 images 폴더와 같은 레벨에 있다고 가정)
const AUDIO_MAPPING = {
    'Gun': 'sound/gun2.mp3' // images/gun/gun.png에 연결할 사운드
};

const INSTRUMENT_VOLUME = 1;
let currentPlayingAudio = null; // 동시에 여러 소리가 나지 않도록 제어

const playInstrumentSound = (instrumentClassName) => {
    const soundPath = AUDIO_MAPPING[instrumentClassName];
    if (!soundPath) {
        return;
    }
    const audio = new Audio(soundPath);
    // 이전에 재생 중이던 소리가 있다면 중지
    if (currentPlayingAudio && !currentPlayingAudio.paused) {
        currentPlayingAudio.pause();
    }
    audio.volume = INSTRUMENT_VOLUME;
    audio.currentTime = 0;
    // 소리 재생 시도 (실패 시 에러 콘솔에 기록)
    audio.play().catch(e => {
        console.error(`Sound playback failed for ${instrumentClassName}:`, e.message);
    });
    currentPlayingAudio = audio;
};
// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const gunImage = document.getElementById('gun-image');   
    const plusImage = document.getElementById('plus-image'); 
    const backImage = document.getElementById('back-image'); 

    if (gunImage && plusImage && backImage) {
        gunImage.addEventListener('click', () => {
            
            playInstrumentSound('Gun');
            plusImage.classList.remove('hidden');
            backImage.classList.remove('hidden'); 
            gunImage.classList.add('hidden'); 

        });
        
        // --- 2. ⭐ [추가]: BackImage 클릭 로직 ⭐ ---
        backImage.addEventListener('click', () => {
            // 메인 페이지의 파일 이름이 'index.html'이라고 가정하고 이동합니다.
            // 만약 메인 페이지 이름이 다르다면, 아래 'index.html' 부분을 수정해주세요.
            window.location.href = './index.html'; 
            
            // ⚠️ [경로 주의]: gun.html이 pages/gun.html처럼 하위 폴더에 있고,
            // index.html이 project/index.html처럼 상위 폴더에 있다면 '../index.html'이 정확합니다.
            // 만약 gun.html과 index.html이 같은 폴더에 있다면 'index.html'로 수정하세요.
        });
        // ---------------------------------------------
        
    } else {
        console.error("필요한 이미지 요소(gun-image, plus-image, back-image)를 찾을 수 없습니다.");
    }
});