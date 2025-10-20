// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    // 이미지 데이터 목록 (파일명과 적용할 CSS 클래스명을 정의)
    const imagesToLoad = [
        { src: 'images/Title.png', className: 'Title' },
        { src: 'images/Glockenspiel.png', className: 'Glockenspiel' },
        { src: 'images/Bassoon.png', className: 'Bassoon' },
        { src: 'images/Violin.png', className: 'Violin' },
        { src: 'images/Belltree.png', className: 'Belltree' },
        { src: 'images/Vibraphon.png', className: 'Vibraphon' },
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
    const ANIMATION_EXCLUDED_CLASSES = ['Title', 'Gun', 'ZZ'];
    const NO_CLICK_CLASSES = ['Title', 'ZZ'];
    const GUN_PAGE_URL = 'page6.html';
    
    // ⚠️ [중요] 전체 페이지 목록 정의 및 sessionStorage 키
    const ALL_PAGES_KEY = 'all_pages_list';
    const REMAINING_PAGES_KEY = 'remaining_pages_order';
    
    const ALL_PAGES = [
        'page1.html', 
        'page2.html', 
        'page3.html', 
        'page4.html', 
        'page5.html'
    ];
    
    let remainingPages = []; // 현재 순서대로 열릴 남은 페이지 목록
  
    // 애니메이션 상수 (기존 값 유지)
    const DEFAULT_MAX_SCALE = 3.0; 
    const HARP_MAX_SCALE = 1.5;    
    const MIN_SCALE = 1.0;   
    const ACTIVATION_RANGE = 400; 
    const GROW_SPEED = '1s ease-out';
    const SHRINK_SPEED = '1s ease-out';

    // ----------------------------------------------------------------------
    // ✅ [로직 1: 배열 섞기] Fisher-Yates 알고리즘
    // ----------------------------------------------------------------------
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // ----------------------------------------------------------------------
    // ✅ [로직 2: 상태 관리 및 다음 페이지 열기]
    // ----------------------------------------------------------------------
    const initializePageList = () => {
        const storedList = sessionStorage.getItem(REMAINING_PAGES_KEY);

        if (storedList) {
            // 1. 저장된 목록이 있으면 로드합니다.
            remainingPages = JSON.parse(storedList);
            console.log("Loaded remaining pages:", remainingPages);
            
            // ⚠️ [보호 로직]: 목록이 비어 있으면 새로 섞습니다.
            if (remainingPages.length === 0) {
                 remainingPages = shuffleArray([...ALL_PAGES]);
                 console.log("Loaded list was empty. Shuffled for a new cycle.");
                 savePageList();
            }
        } else {
            // 2. 저장된 목록이 없으면 (최초 로드 시) 새로 섞습니다.
            remainingPages = shuffleArray([...ALL_PAGES]); 
            console.log("Initial load. Shuffled new list:", remainingPages);
            savePageList();
        }
    };
    
    const savePageList = () => {
        sessionStorage.setItem(REMAINING_PAGES_KEY, JSON.stringify(remainingPages));
    };

    const openNextPage = () => {
        // 1. 남은 목록이 비었으면 (모든 창이 한 번씩 열렸으면) 전체 목록을 다시 섞어 채웁니다.
        if (remainingPages.length === 0) {
            remainingPages = shuffleArray([...ALL_PAGES]); 
            console.log("Cycle completed. List reshuffled for a new cycle.");
        }

        // 2. 섞인 목록에서 맨 앞 URL을 꺼냅니다. (shift()는 배열에서 제거하며 반환)
        const nextURL = remainingPages.shift(); 
        
        // 3. ⚠️ [핵심]: 업데이트된 목록을 즉시 저장합니다.
        savePageList();
        
        // 4. 현재 페이지를 새 URL로 이동합니다.
        window.location.href = nextURL; 
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
                
                if (imageData.className === 'Gun') {
                    // Gun은 항상 page6.html로 이동
                    window.location.href = GUN_PAGE_URL;
                } else {
                    // 랜덤 순회 로직을 호출
                    openNextPage(); 
                }
            });
        }
    });
  
    // ----------------------------------------------------------------------
    // 2. 마우스 움직임 이벤트 리스너 추가 (애니메이션 로직) - 기존 로직 유지
    // ----------------------------------------------------------------------
    document.addEventListener('mousemove', (e) => {
      // ... (기존 마우스 애니메이션 로직 유지) ...
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      elements.forEach(element => {
          
          let currentMaxScale = DEFAULT_MAX_SCALE;
          
          if (element.classList.contains('Harp')) {
              currentMaxScale = HARP_MAX_SCALE; 
          }
  
          if (ANIMATION_EXCLUDED_CLASSES.some(className => element.classList.contains(className))) {
              element.style.transform = `scale(${MIN_SCALE})`;
              return; 
          }
  
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
              Math.pow(centerX - mouseX, 2) + Math.pow(centerY - mouseY, 2)
          );
          
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

    // ⚠️ [초기화]: 페이지 로드 시, sessionStorage에서 목록 상태를 불러오거나 새로 만듭니다.
    initializePageList(); 
});