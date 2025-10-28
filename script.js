// script.js

document.addEventListener('DOMContentLoaded', (event) => {

    // 이미지 데이터 목록 (파일명과 적용할 CSS 클래스명을 정의)
    const imagesToLoad = [
        { src: 'images/Title.png', className: 'Title' },
        { src: 'images/DoubleBass.png', className: 'DoubleBass' },
        { src: 'images/Glockenspiel.png', className: 'Glockenspiel' },
        { src: 'images/Bassoon.png', className: 'Bassoon' },
        { src: 'images/Violin.png', className: 'Violin' },
        { src: 'images/Belltree.png', className: 'Belltree' },
        { src: 'images/Vibraphone.png', className: 'Vibraphone' },
        { src: 'images/Saxophone0.png', className: 'Saxophone0' },
        { src: 'images/Saxophone.png', className: 'Saxophone' },
        { src: 'images/Saxophone2.png', className: 'Saxophone2' },
        { src: 'images/SnareDrum.png', className: 'SnareDrum' },
        { src: 'images/Sleighbells.png', className: 'Sleighbells' },
        { src: 'images/Xylophone.png', className: 'Xylophone' },
        { src: 'images/Cymbals.png', className: 'Cymbals' },
        { src: 'images/Organ.png', className: 'Organ' },
        { src: 'images/Oboe.png', className: 'Oboe' },
        { src: 'images/Gun.png', className: 'Gun' },
        { src: 'images/Windchime.png', className: 'Windchime' },
        { src: 'images/Cello.png', className: 'Cello' },
        { src: 'images/Clarinet0.png', className: 'Clarinet0' },
        { src: 'images/Clarinet.png', className: 'Clarinet' },
        { src: 'images/Clarinet2.png', className: 'Clarinet2' },
        { src: 'images/Tuba.png', className: 'Tuba' },
        { src: 'images/Trumpet.png', className: 'Trumpet' },
        { src: 'images/Trombone.png', className: 'Trombone' },
        { src: 'images/Timpani.png', className: 'Timpani' },
        { src: 'images/Flute.png', className: 'Flute' },
        { src: 'images/Piano.png', className: 'Piano' },
        { src: 'images/Horn.png', className: 'Horn' },
        { src: 'images/Harp.png', className: 'Harp' },
        { src: 'images/Piccolo.png', className: 'Piccolo' },
        { src: 'images/Castanets.png', className: 'Castanets' },
        { src: 'images/BassDrum.png', className: 'BassDrum' },
        { src: 'images/Tamtam.png', className: 'Tamtam' },
        { src: 'images/Tambourine.png', className: 'Tambourine' },
        { src: 'images/Triangle.png', className: 'Triangle' },
        { src: 'images/Marimba.png', className: 'Marimba' },
        { src: 'images/Viola.png', className: 'Viola' }
    ];
    const elements = [];
    // 상수 정의
    const ANIMATION_EXCLUDED_CLASSES = ['Title', 'Gun', 'ZZ', 'Piano'];
    const NO_CLICK_CLASSES = ['Title', 'ZZ'];
    const GUN_PAGE_URL = 'gun.html';
    const PIANO_PAGE_URL = 'piano.html';
    const JOKE_PAGE_URL = 'joke.html';
    
    // ⚠️ [수정/확인]: Joke 창의 현재 Y축 이동 값을 픽셀 단위로 관리하는 변수
    // 초기값은 70vh를 픽셀로 변환한 값입니다.
    let currentJokeTranslateY = window.innerHeight * 0.5; 
    const JOKE_MOVE_STEP = 20;
    
    // Horn과 Violin의 CSS 위치 및 크기 (vw 기준)
    const INSTRUMENT_PANEL_SPECS = {
        'Horn': {
            top: '10vw', 
            left: '22vw', 
            width: '10vw', 
            height: '12vw' 
        },
        'Violin': {
            top: '3vw',
            left: '8vw',
            width: '12vw',
            height: '13vw' 
        }
    };
    
    // Joke 패널 트리거 악기
    const JOKE_PAGES_INSTRUMENTS = [
        'Viola',
        'Violin',
        'Cello',
        'DoubleBass',
        'Horn'
    ];
    
    // 페이지 순회 관련 상수 및 로직
    const REMAINING_PAGES_KEY = 'remaining_pages_order';
    const ALL_PAGES = ['mirror.html', 'beethoven.html']; // 남은 랜덤 페이지 목록
    let remainingPages = [];
    
    // 음악 파일 경로 정의
    const AUDIO_MAPPING = {
        'Harp': 'sound/harp.mp3',
        'Glockenspiel': 'sound/glockenspiel.mp3',
        'Bassoon': 'sound/bassoon.mp3',
        'Violin': 'sound/violin.mp3',
        'Belltree': 'sound/belltree.mp3',
        'Vibraphone': 'sound/vibraphone.mp3',
        'Saxophone0': 'sound/saxophone0.mp3',
        'Saxophone': 'sound/saxophone.mp3',
        'Saxophone2': 'sound/saxophone2.mp3',
        'SnareDrum': 'sound/snaredrum.mp3',
        'Sleighbells': 'sound/sleighbells.mp3',
        'Xylophone': 'sound/xylophone.mp3',
        'Cymbals': 'sound/cymbals.mp3',
        'Organ': 'sound/organ.mp3',
        'Oboe': 'sound/oboe.mp3',
        'Windchime': 'sound/windchime.mp3',
        'Cello': 'sound/cello.mp3',
        'Clarinet0': 'sound/clarinet0.mp3',
        'Clarinet': 'sound/clarinet.mp3',
        'Clarinet2': 'sound/clarinet2.mp3',
        'Tuba': 'sound/tuba.mp3',
        'Trumpet': 'sound/trumpet.mp3',
        'Trombone': 'sound/trombone.mp3',
        'Timpani': 'sound/timpani.mp3',
        'Flute': 'sound/flute.mp3',
        'Piano': 'sound/piano.mp3',
        'Horn': 'sound/horn.mp3',
        'Piccolo': 'sound/piccolo.mp3',
        'Castanets': 'sound/castanets.mp3',
        'BassDrum': 'sound/bassdrum.mp3',
        'Tamtam': 'sound/tamtam.mp3',
        'Tambourine': 'sound/tambourine.mp3',
        'Triangle': 'sound/triangle.mp3',
        'Marimba': 'sound/marimba.mp3',
        'Viola': 'sound/viola.mp3',
        'Gun': 'sound/gun.mp3',
        'DoubleBass': 'sound/doublebass.mp3'
    };
    
    // 애니메이션 상수 (기존 값 유지)
    const DEFAULT_MAX_SCALE = 2.0;
    const HARP_MAX_SCALE = 1.5;
    const DOUBLEBASS_MAX_SCALE = 1.5;
    const MIN_SCALE = 1.0;
    const ACTIVATION_RANGE = 400;
    const GUN_ACTIVATION_RANGE = 100;
    const GROW_SPEED = '1s ease-out';
    const SHRINK_SPEED = '1s ease-out';
    
    // ----------------------------------------------------------------------
    // ✅ [새로 추가]: 이미지별 지연 시간 매핑 객체
    // ----------------------------------------------------------------------
    // 단위는 밀리초(ms)입니다.
    const DELAY_MAPPING = {
        'Clarinet2': 2400,
        'Vibraphone': 3500,
        'Marimba': 3250,
        'Flute': 2200,
        'Xylophone': 2200,
        'Organ': 4000,
        'Viola': 1700,
        'Cello': 4200,
        'Piano': 4800,
        'DoubleBass': 3700,
        'Bassoon': 1300,
        'Tuba': 2900,
        'Trombon': 1800,
        'Trumpet': 2200,
        'Oboe': 2800,
        'Saxophone2': 2400,
        'Saxophone': 2700,
        'Saxophone0': 2200,
        'Belltree': 1700,
        'Windchime': 1900,
        'Sleighbells': 1300,
        'Triangle': 1900,
        'Castanets': 300,
        'Tambourine': 600,
        'Timpani': 900,
        'SnareDrum': 700,
        'BassDrum': 1700,
        'Tamtam': 5800,
        'Gun': 2000
        // ⚠️ DELAY_MAPPING에 정의되지 않은 악기는 기본 지연 시간(defaultDelay)이 적용됩니다.
    };
    
    // 지연 시간 기본값 (DELAY_MAPPING에 없는 악기에 적용)
    const DEFAULT_TRANSITION_DELAY = 1500; // 1.5초
    
    // ----------------------------------------------------------------------
    // ✅ [범용 사운드 제어 변수 및 함수]
    // ----------------------------------------------------------------------
    const INSTRUMENT_VOLUME = 1;
    let currentPlayingAudio = null;
    
    const playInstrumentSound = (instrumentClassName) => {
        const soundPath = AUDIO_MAPPING[instrumentClassName];
        if (!soundPath) {
            return;
        }
        const audio = new Audio(soundPath);
        if (currentPlayingAudio && !currentPlayingAudio.paused) {
            currentPlayingAudio.pause();
        }
        audio.volume = INSTRUMENT_VOLUME;
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.error(`Sound playback failed for ${instrumentClassName}:`, e.message);
        });
        currentPlayingAudio = audio;
    };
    
    // ----------------------------------------------------------------------
    // ✅ [로직 1: 배열 섞기] Fisher-Yates 알고리즘 (유지)
    // ----------------------------------------------------------------------
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    // ----------------------------------------------------------------------
    // ✅ [로직 2: 페이지 순회 상태 관리] (유지)
    // ----------------------------------------------------------------------
    const initializePageList = () => {
        const storedList = sessionStorage.getItem(REMAINING_PAGES_KEY);
        if (storedList) {
            remainingPages = JSON.parse(storedList);
            if (remainingPages.length === 0) {
                remainingPages = shuffleArray([...ALL_PAGES]);
                savePageList();
            }
        } else {
            remainingPages = shuffleArray([...ALL_PAGES]);
            savePageList();
        }
    };
    
    const savePageList = () => {
        sessionStorage.setItem(REMAINING_PAGES_KEY, JSON.stringify(remainingPages));
    };
    
    const openNextPage = () => {
        if (remainingPages.length === 0) {
            remainingPages = shuffleArray([...ALL_PAGES]);
        }
        const nextURL = remainingPages.shift();
        savePageList();
        window.location.href = nextURL;
    };
    
    // ----------------------------------------------------------------------
    // ✅ [Joke 패널 제어 함수]
    // ----------------------------------------------------------------------

    /**
     * joke.html 내용을 로드하여 화면 하단에 패널을 띄웁니다.
     */
    const openJokePanel = () => {
        if (document.getElementById('joke-panel-container')) return;
    
        const jokePanel = document.createElement('div');
        jokePanel.id = 'joke-panel-container';
        // scrolling="no" 속성을 iframe에 추가하여 스크롤바를 숨깁니다.
        jokePanel.innerHTML = `
            <iframe id="joke-iframe" src="${JOKE_PAGE_URL}" scrolling="no"></iframe>
        `;
    
        document.body.appendChild(jokePanel);
        
        // 1. 패널을 초기 위치 (70vh)에 설정
        jokePanel.style.transform = `translateY(${currentJokeTranslateY}px)`;
        jokePanel.style.transition = 'transform 0.5s ease-out'; // 최초 이동 트랜지션
    
        // ⚠️ [수정] 2. 클릭 이벤트가 가능하도록 즉시 활성화
        jokePanel.style.pointerEvents = 'auto'; 

        // 3. 클릭 이동을 위한 빠른 transition으로 변경 (최초 트랜지션 완료 후)
        // ⚠️ [수정] 0.5초로 변경
        setTimeout(() => {
            jokePanel.style.transition = 'transform 0.1s linear';
        }, 500); 
    };;


    /**
     * 특정 악기 이미지와 동일한 크기와 위치의 패널을 화면에 고정하여 띄웁니다.
     * @param {string} instrumentName 악기 이름 (Horn 또는 Violin)
     */
    const openInstrumentPanel = (instrumentName) => {
        const spec = INSTRUMENT_PANEL_SPECS[instrumentName];
        if (!spec) return;
        
        // 이미 존재하는 패널은 생성하지 않습니다.
        if (document.getElementById(`${instrumentName.toLowerCase()}-panel`)) return;
        
        const panel = document.createElement('div');
        panel.id = `${instrumentName.toLowerCase()}-panel`;
        panel.classList.add('instrument-panel');
        panel.classList.add(`instrument-panel-${instrumentName.toLowerCase()}`);

        // 패널 내부에 이미지를 채웁니다.
        const imagePath = `images/${instrumentName}.png`;
        panel.innerHTML = `<img src="${imagePath}" alt="${instrumentName}" class="panel-image">`;
        document.body.appendChild(panel);
        
        // Horn과 Violin 패널을 클릭했을 때 Joke 창 이동 함수 호출
        panel.addEventListener('click', moveJokePanelUp);
        
        // CSS 변수를 사용하여 크기와 위치를 설정합니다.
        panel.style.setProperty('--panel-top', spec.top);
        panel.style.setProperty('--panel-left', spec.left);
        panel.style.setProperty('--panel-width', spec.width);
        panel.style.setProperty('--panel-height', spec.height);
    };

    /**
     * Joke 창을 위로 20px 이동시키고 위치를 업데이트합니다.
     */
    const moveJokePanelUp = () => {
        const jokePanel = document.getElementById('joke-panel-container');
        if (!jokePanel) return;

        // JOKE_MOVE_STEP 상수가 전역에 20으로 정의되었다고 가정합니다.
        const JOKE_MOVE_STEP = 20;

        // 올라올 목표 위치는 0px (화면 맨 위)
        const TARGET_Y = 0;
        
        // 20px만큼 위로 이동 (Y축 값 감소)
        let newY = currentJokeTranslateY - JOKE_MOVE_STEP;

        // ⚠️ [핵심 로직]: 최대 이동 거리에 도달했는지 확인
        let isAtMaxDistance = false;

        // ⚠️ [추가]: 창이 화면 맨 위(0px)를 넘지 않도록 제한
        if (newY < TARGET_Y) {
             newY = TARGET_Y;
             isAtTarget = true;
        }

        // 이미 목표 지점에 도달하여 멈춰있는 경우도 포함 (클릭이 계속 될 때)
        if (currentJokeTranslateY === TARGET_Y && newY === TARGET_Y) {
            isAtTarget = true;
        }

        currentJokeTranslateY = newY;
        
        // 새로운 위치를 CSS에 적용
        jokePanel.style.transform = `translateY(${currentJokeTranslateY}px)`;
    
        // -----------------------------------------------------------------
        // ✅ [추가된 로직]: 목표 지점에 도달했을 때 텍스트 박스 표시
        // -----------------------------------------------------------------
        if (isAtTarget) {
            showTextBox();
        }
    };

    // **새로 추가할 함수**: 총 애니메이션 실행 및 사운드 재생
const playGunLoadAnimation = (gunElement) => {
    // 1. 소리 재생
    playInstrumentSound('Gun'); // 기존 playInstrumentSound 함수를 'Gun'으로 호출하여 소리 재생

    // 2. 애니메이션 클래스 추가 ('loading' 클래스는 CSS에서 장전 애니메이션을 정의했다고 가정)
    gunElement.classList.add('loading');
    
    // 3. 애니메이션 종료 후 클래스 제거 (재클릭 가능하게)
    // CSS에서 0.4초로 설정했으므로, 400ms 후에 제거합니다.
    setTimeout(() => {
        gunElement.classList.remove('loading');

        // ⭐ [수정 핵심]: 애니메이션이 완료된 후에 모든 움직임을 영구 정지 ⭐
        gunElement.classList.add('stop-all');

    }, 400); 
};
    
    // ----------------------------------------------------------------------
    // 1. 이미지 요소 생성 및 클릭 이벤트 설정
    // ----------------------------------------------------------------------
    imagesToLoad.forEach(imageData => {
        const image = document.createElement('img');
        image.src = imageData.src;
        image.classList.add('positioned-image');
        image.classList.add(imageData.className);
        document.body.appendChild(image);
        elements.push(image);
        
        // 클릭 이벤트 로직
        if (!NO_CLICK_CLASSES.includes(imageData.className)) {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                
                const className = imageData.className;
                
                // 지연 시간을 매핑 객체에서 조회, 없으면 기본값 적용
                const transitionDelay = DELAY_MAPPING[className] || DEFAULT_TRANSITION_DELAY;
                
                
                if (className === 'Gun') {
                    //**  Gun은 gun.html로 이동
                    /* setTimeout(() => {
                        window.location.href = GUN_PAGE_URL;
                    }, transitionDelay); // Gun에 설정된 딜레이(3000ms) 적용
                    */

                   // 1. 장전 애니메이션 실행 (소리 포함)
                   playGunLoadAnimation(image);
                    
                   // 2. 애니메이션 종료 후 페이지 이동 (0.4초 + 딜레이 후 이동)
                   setTimeout(() => {
                       window.location.href = GUN_PAGE_URL;
                   }, 400 + transitionDelay);

                } else if (className === 'Piano') {
                    // ⭐ [추가]: Piano 로직: 소리 재생 후 piano.html로 이동 ⭐
                    
                    // 1. 소리 재생
                    playInstrumentSound(imageData.className);
                    
                    // 2. 딜레이 후 piano.html로 이동
                    setTimeout(() => {
                        window.location.href = PIANO_PAGE_URL;
                    }, transitionDelay);

                } else if (JOKE_PAGES_INSTRUMENTS.includes(className)) {
                   
                    // 모든 악기 클릭 시 음악 재생 시도
                    playInstrumentSound(imageData.className);


                    // Joke 패널 트리거 악기는 패널 띄우기 (지연 시간은 패널 표시용)
                    setTimeout(() => {
                        openJokePanel();
                        openInstrumentPanel('Horn');
                        openInstrumentPanel('Violin');
                    }, transitionDelay); // Joke 악기에 설정된 딜레이(1500ms) 적용
                    
                } else {
                    // 나머지 모든 악기들은 순회 로직 (mirror.html)
                    setTimeout(() => {
                        openNextPage();
                    }, transitionDelay);

                     // Clarinet2는 4500ms, 나머지는 설정된 값 또는 기본값(1500ms) 적용
                
                     playInstrumentSound(imageData.className);

                    }
            });
        }
    });
    
    // ----------------------------------------------------------------------
    // 2. 마우스 움직임 이벤트 리스너 추가 (애니메이션 로직)
    // ----------------------------------------------------------------------
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        elements.forEach(element => {
            let currentMaxScale = DEFAULT_MAX_SCALE;
            
            // Harp 및 DoubleBass 예외 처리 (유지)
            if (element.classList.contains('Harp')) {
                currentMaxScale = HARP_MAX_SCALE;
            }
            else if (element.classList.contains('DoubleBass')) {
                currentMaxScale = DOUBLEBASS_MAX_SCALE;
            }
            
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(centerX - mouseX, 2) + Math.pow(centerY - mouseY, 2)
            );

            // Gun이 아닌 다른 애니메이션 제외 클래스 처리 (유지)
            if (ANIMATION_EXCLUDED_CLASSES.some(className => element.classList.contains(className))) {
                element.style.transform = `scale(${MIN_SCALE})`;
                return;
            }

            // ⚠️ [확인]: 나머지 악기들은 ACTIVATION_RANGE (400px)를 사용합니다.
            let targetScale;
            if (distance < ACTIVATION_RANGE) {
                const normalizedDistance = distance / ACTIVATION_RANGE;
                targetScale = MIN_SCALE + (currentMaxScale - MIN_SCALE) * (1 - normalizedDistance);
            } else {
                targetScale = MIN_SCALE;
            }
            const currentScale = parseFloat(element.style.transform.replace('scale(', '').replace(')', '')) || MIN_SCALE;
            if (targetScale > currentScale) {
                element.style.transition = `transform ${GROW_SPEED}`;
            } else if (targetScale < currentScale) {
                element.style.transition = `transform ${SHRINK_SPEED}`;
            }
            element.style.transform = `scale(${targetScale})`;
        });
    },
    { passive: true }
    );
    
    // [초기화]: 페이지 로드 시, sessionStorage에서 목록 상태를 불러오거나 새로 만듭니다.
    initializePageList();
});


/**
 * Joke 패널 위에 화면 정중앙에 텍스트 박스를 생성하고 표시합니다.
 */
const showTextBox = () => {
    // 이미 텍스트 박스가 있다면 다시 생성하지 않습니다.
    if (document.getElementById('scrollable-text-box')) return;

    const jokePanel = document.getElementById('joke-panel-container');
    if (!jokePanel) return;

    const textBox = document.createElement('div');
    textBox.id = 'scrollable-text-box';
    
    // ⭐ [텍스트 내용]: 실제 joke.html의 콘텐츠를 여기에 복사하거나 가져올 수 있습니다.
    // 현재는 예시 텍스트를 사용합니다.
    textBox.innerHTML = `
        <p>
            ‘Musikalisches Scherz, K. 522(음악적 농담)’
            <br>
            <br><br>
            모차르트는 어릴 적부터 장난기가 많은 장난꾸러기였다. 이런 그의 장난기가 드러난 곡이 있는데 그 곡이 바로 ‘Musikalisches Scherz, K. 522(음악적 농담)’이다.
            <br>
            <br>음악적 농담에서는 실수하는 연주자들과 실력없는 작곡가, 재밌는 앙상블 등이 등장하는데 그래서 의도적으로 우스꽝스럽게 쓴 곡이며 당대의 어설픈 음악가들의 음악을 풍자하기 위해 끈 곡이라는 설이 있다.
            <br><br>
            가장 첫번째로 다룰 이 곡의 장난스러운 점은 바로 곡의 ‘마디’이다. 보통 곡은 짝수마디로 구성돼 있지만, 이 곡은 홀수마디로 구성돼 있다. ‘마디’는 음악에서 아주 중요한 요소이다. 강하게 치는 마디와 약하게 치는 마디가 보통 세트로 되어 있기 때문이다. 하지만 모차르트는 이를 무시하고 7마디로 이 곡을 작성했기 때문에 4마디와 5마디가 겹쳐서 어색하게 들리게 만들었다.
            <br><br>
            두번째로 현악4중주임에도 호른 두대가 사용되는데 이를 통해 미숙한 호른 연주자를 표현하기도 한다. 과거의 호른은 현재처럼 음높이를 조절할 수 있는 밸브가 없어 크룩을 갈아끼워 낼 수 있는 음을 조절해야 했기에 이 크룩을 잘못 끼워 연주하면 소리를 제대로 낼 수 없었다. 그래서 엉뚱한 크룩을 끼운 호른으로 연주하는 연주자를 호른의 불협화음을 통해 나타낸다. 또한 높은 음과 낮은 음의 트릴을 사용해 고난도의 기술을 요구하기도 했다.
            <br><br>
            세번째로 바이올린의 고음 파트에서는 온음음계를 사용해, 마치 실수를 한 것처럼 들리도록 곡을 짜기도 했다.
            <br>마지막으로 곡의 마지막 악장의 종지 화음에서 서로 안 어울리는 화음을 표현하기 위해 복조성을 사용해 각각의 악기들마다 서로 다른 음을 연주하는 느낌을 나타내 우스꽝스러운 곡의 마무리를 연출하기도 했다.
        </p>
        <img src="./images/Back.png" alt="Back" id="back-button-image" style="
            display: block; /* 블록 요소로 만들어 별도의 줄에 위치 */
            margin: 20px auto 0; /* 위 20px 마진, 좌우 자동(중앙 정렬), 아래 0 */
            width: 100px; /* 이미지 크기 조정 */
            cursor: pointer; /* 클릭 가능한 표시 */
        ">
    `;

    // 텍스트 박스를 Joke 패널 컨테이너 위에 추가합니다. (z-index가 높아야 함)
    document.body.appendChild(textBox);
    
    // ⭐ [스타일 적용] ⭐
    textBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* 정확히 중앙 정렬 */
        width: 30vw;
        max-height: 70vh;
        background-color: white;
        color: black;
        padding: 20px;
        border: 2px solid #333;
        overflow-y: auto; /* 스크롤 가능하게 설정 */
        z-index: 1001; /* Joke 패널(999) 및 악기 패널(1000) 위에 표시 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
    // ⭐ [수정]: Back 이미지에 클릭 이벤트 리스너 추가 (메인창으로 복귀) ⭐
    const backButton = document.getElementById('back-button-image');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // 텍스트 박스를 제거합니다.
            textBox.remove();
            
            // ⚠️ 핵심: 현재 페이지를 새로고침하여 메인창의 초기 상태로 돌아갑니다.
            window.location.reload(); 
            
            // 만약 index.html 등의 다른 파일이 메인 페이지라면 아래 코드를 사용합니다.
            // window.location.href = 'index.html'; 
        });
    }
};