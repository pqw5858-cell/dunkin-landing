(() => {
  'use strict';

  /* =========================================================
     DATA — 텍스트 소스 / 색상 / 시안 기준 위치(1920 x 1000)
     ingredients: [파일명, x, y]
     ========================================================= */
  const PRODUCTS = [
    {
      key: 'raspberry-pistachio',
      title: ['RASPBERRY', 'PISTACHIO'],
      name: '라즈베리 피스타치오',
      desc: ['고소한 피스타치오 필링과', '상큼한 라즈베리 필링을', '동시에 즐길 수 있는 프리미엄 도넛'],
      theme: '#e43848',      // 배경색
      themeDark: '#961420',  // 배경색 명도만 낮춘 색 (GNB hover)
      point: '#bf0100',      // 버튼 글자색
      edge: '#a60918',       // 배경 이미지 맨 아래 색 (아래 그라데이션 시작 색)
      product: { x: 1080, y: 132, w: 767 },
      ingredients: [
        ['pistachio-03', -46, -103],
        ['pistachio-02', 224, 63],
        ['raspberry-03', 1545, 68],
        ['pistachio-01', 866, 509],
        ['raspberry-01', 704, 688],
        ['pistachio-04', 11, 819],
        ['raspberry-02', 1664, 733],
      ],
    },
    {
      key: 'lemon-cream-brulee',
      title: ['LEMON', 'CREAM BRULEE'],
      name: '레몬 크림 브륄레 도넛',
      desc: ['부드러운 슈크림에', '상큼한 레몬맛을 더한 브륄레 제품'],
      theme: '#fe7f01',
      themeDark: '#984c01',
      point: '#ea7500',
      edge: '#ee4700',       // 배경 이미지 맨 아래 색 (아래 그라데이션 시작 색)
      product: { x: 1018, y: 82, w: 862 },
      ingredients: [
        ['cream-02', -22, -39],
        ['cream-01', 215, 90],
        ['lemon-02', 1542, 45],
        ['cream-03', 861, 503],
        ['lemon-03', 688, 676],
        ['cream-04', 9, 821],
        ['lemon-01', 1674, 703],
      ],
    },
    {
      key: 'cookie-white-cream',
      title: ['COOKIE &', 'WHITE CREAM'],
      name: '쿠키 앤 화이트 크림',
      desc: ['달콤한 화이트 크림의 맛과', '오레오 쿠키의 풍부한 토핑이 만나', '환상의 조화를 이루는 쿠키 앤 크림 도넛'],
      theme: '#a37367',
      themeDark: '#63443c',
      point: '#4a2d25',
      edge: '#67453d',       // 배경 이미지 맨 아래 색 (아래 그라데이션 시작 색)
      product: { x: 1036, y: 104, w: 815 },
      ingredients: [
        ['cookie-02', -6, -89],
        ['choco-03', 224, 63],
        ['choco-02', 1390, 41],
        ['choco-04', 871, 512],
        ['cookie-01', 685, 693],
        ['choco-01', -11, 807],
        ['cookie-03', 1668, 775],
      ],
    },
    {
      key: 'blueberry-cheesecake',
      title: ['BLUEBERRY', 'CHEESECAKE'],
      name: '블루베리치즈케익 요거트 크림 도넛',
      desc: ['블루베리잼을 스프레드한 도넛 사이', '상큼한 요거트 우유 크림을 가득 채우고', '치즈케익 큐브를 토핑한 크림도넛'],
      theme: '#8847cc',
      themeDark: '#512481',
      point: '#570b49',
      edge: '#442467',       // 배경 이미지 맨 아래 색 (아래 그라데이션 시작 색)
      product: { x: 1042, y: 146, w: 793 },
      ingredients: [
        ['cheesecake-04', -10, -30],
        ['blueberry-01', 227, 87],
        ['cheesecake-03', 1397, 42],
        ['cheesecake-01', 867, 513],
        ['blueberry-02', 683, 711],
        ['cheesecake-02', 11, 844],
        ['blueberry-03', 1686, 749],
      ],
    },
  ];

  /* =========================================================
     DATA — 판매 매장 / 영양 정보 (던킨 공식 제품 상세 기준, PRODUCTS와 같은 순서)
     stores: null 이면 판매 매장 정보 없음
     ========================================================= */
  const PRODUCT_INFO = [
    {
      nutrition: { serving: 84, kcal: 350, sugar: 18, protein: 5, satFat: 9, sodium: 310 },
      allergy: '밀, 대두, 우유',
      cold: false,
      note: '',
      stores: ['북창', '일산후곡', '간석홈플러스', '김포양촌', '부평동아', '구로태평양물산', '왕십리민자역사', '평촌',
        '고덕역', '테크노마트', '백석역', '암사역', '등촌', '청담', '행신역', '응암역', '영등포역사', '중앙대병원',
        '방송통신대', '일산풍동', '중앙보훈병원', '마석우리', '제물포역사', '평택민자역사', '산본역', '사당', '안산고잔',
        '성남태평', '올림픽공원', '수원정자', '수원대', '원주무실', '분당아름마을', '기흥휴게소', '용인휴게소상행',
        '용인휴게소하행', '시흥은행', '가천대', '용인마북', '이천터미널', '오산세교', '이천장호원', '안산원곡',
        '수원하나로', '서수원이마트', '김포통진', '센트럴시티K', '쌍문역'],
    },
    {
      nutrition: { serving: 109, kcal: 380, sugar: 17, protein: 5, satFat: 11, sodium: 340 },
      allergy: '밀, 대두, 우유, 돼지고기',
      cold: true,
      note: '',
      stores: null,
    },
    {
      nutrition: { serving: 87, kcal: 425, sugar: 13, protein: 4, satFat: 14, sodium: 330 },
      allergy: '밀, 대두, 우유',
      cold: false,
      note: '',
      stores: ['선릉역', '왕십리민자역사', '대전터미널서관', '시흥하늘휴게소', '대전역사', '김포공항국내선',
        '김포공항국제선', '건대입구역', '울산역사'],
    },
    {
      nutrition: { serving: 123, kcal: 430, sugar: 18, protein: 6, satFat: 13, sodium: 410 },
      allergy: '밀, 대두, 우유, 계란, 돼지고기',
      cold: true,
      note: '일부 직영 매장 판매 (매장별 취급 현황 상이)',
      stores: ['선릉역', '원더스 강남', '양재사옥', '김포공항국내선', '원더스 청담', 'T2인천공항스카이', '원더스 서울역'],
    },
  ];

  const NUTRITION_LABELS = [
    ['serving', '1회 제공량', 'g'],
    ['kcal', '열량', 'kcal'],
    ['sugar', '당류', 'g'],
    ['protein', '단백질', 'g'],
    ['satFat', '포화지방', 'g'],
    ['sodium', '나트륨', 'mg'],
  ];

  // 재료가 둥둥 떠 있는 효과: 재료마다 다르게 (위아래 거리, 속도, 시작 시점, 기울기)
  const FLOAT = [
    { y: 14, dur: 3.2, delay: -0.4, r: 4 },
    { y: 10, dur: 2.6, delay: -1.6, r: 3 },
    { y: 12, dur: 3.0, delay: -0.9, r: -3 },
    { y: 9,  dur: 2.4, delay: -2.1, r: 3 },
    { y: 13, dur: 2.9, delay: -1.2, r: -4 },
    { y: 11, dur: 3.4, delay: -0.2, r: 3 },
    { y: 16, dur: 3.6, delay: -1.9, r: -3 },
  ];

  const STAGE_W = 1920;
  const STAGE_H = 1000;
  const DURATION = 1000;          // 전환 속도 (확정)
  const LAND = 0.7;               // 1000ms 중 도착 시점 (이후 튕김)
  const BOUNCE = 24;              // 도착 후 튕기는 거리 (시안 px)
  const PUSH = 0.3;               // 이전 화면이 덮이며 밀려 내려가는 거리 (화면 높이 비율)

  const EASE_FALL = 'cubic-bezier(.6, 0, .35, 1)';
  const EASE_BOUNCE = 'cubic-bezier(.35, 0, .3, 1)';
  const EASE_TEXT = 'cubic-bezier(.7, 0, .25, 1)';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = (ms) => (reduceMotion ? 1 : ms);

  /* =========================================================
     ELEMENTS
     ========================================================= */
  const root = document.documentElement;
  const header = document.querySelector('.header');
  const visual = document.querySelector('.visual');
  const slidesWrap = document.querySelector('.visual__slides');
  const menuList = document.querySelector('.product-menu__list');
  const menuLine = document.querySelector('.product-menu__line');
  const masks = {
    title: document.querySelector('.mask--title'),
    info: document.querySelector('.mask--info'),
  };

  let current = 0;
  let isAnimating = false;
  let currentSlide = null;
  const view = { w: 0, h: 0, scale: 1 };

  /* =========================================================
     SCALE — 시안(1920 x 1000)을 100vh 화면 안에 맞춤
     ========================================================= */
  const updateScale = () => {
    view.w = root.clientWidth;
    view.h = visual.clientHeight;
    view.scale = Math.min(view.w / STAGE_W, view.h / STAGE_H);
    root.style.setProperty('--scale', view.scale.toFixed(5));
    root.style.setProperty('--stage-x', `${((view.w - STAGE_W * view.scale) / 2).toFixed(2)}px`);
    root.style.setProperty('--stage-y', `${((view.h - STAGE_H * view.scale) / 2).toFixed(2)}px`);
  };

  // 화면 위/오른쪽 밖까지의 거리 (시안 px 단위)
  const offTop = () => (view.h / view.scale + STAGE_H) / 2 + 50;
  const offRight = () => (view.w / view.scale + STAGE_W) / 2;

  /* =========================================================
     BUILDERS
     ========================================================= */
  const img = (src, alt = '') => {
    const el = new Image();
    el.src = src;
    el.alt = alt;
    el.decoding = 'async';
    return el;
  };

  const createSlide = (p) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    const bg = document.createElement('div');
    bg.className = 'slide__bg';
    bg.style.backgroundImage = `url(images/bg/bg-${p.key}.png)`;

    const stage = document.createElement('div');
    stage.className = 'stage';

    const ingredients = p.ingredients.map(([file, x, y], i) => {
      const wrap = document.createElement('div');
      wrap.className = 'slide__ingredient';
      wrap.style.left = `${x}px`;
      wrap.style.top = `${y}px`;
      const f = FLOAT[i % FLOAT.length];
      wrap.style.setProperty('--float-y', `${f.y}px`);
      wrap.style.setProperty('--float-dur', `${f.dur}s`);
      wrap.style.setProperty('--float-delay', `${f.delay}s`);
      wrap.style.setProperty('--float-r', `${f.r}deg`);
      wrap.append(img(`images/ingredient/${p.key}/${file}.png`));
      return wrap;
    });

    const product = img(`images/product/product-${p.key}.png`);
    product.className = 'slide__product';
    product.style.left = `${p.product.x}px`;
    product.style.top = `${p.product.y}px`;
    product.style.width = `${p.product.w}px`;

    stage.append(...ingredients, product);
    slide.append(bg, stage);
    return { el: slide, bg, ingredients, product };
  };

  const createTextItem = (type, p) => {
    const el = document.createElement('div');
    el.className = 'mask__item';
    if (type === 'title') {
      el.innerHTML = `<h2 class="visual__title">${p.title.join('<br>')}</h2>`;
    } else {
      el.innerHTML = `<p class="visual__name">${p.name}</p><p class="visual__desc">${p.desc.join('<br>')}</p>`;
    }
    return el;
  };

  const buildMenu = () => {
    PRODUCTS.forEach((p, i) => {
      const li = document.createElement('li');
      li.className = 'product-menu__item';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'product-menu__btn';
      btn.setAttribute('aria-label', p.name);
      btn.append(img(`images/thumb/thumb-0${i + 1}-${p.key}.png`));
      btn.addEventListener('click', () => goTo(i));
      li.append(btn);
      menuList.append(li);
    });
  };

  const menuButtons = () => [...menuList.querySelectorAll('.product-menu__btn')];

  /* =========================================================
     STATE (모션 없이 즉시 반영)
     ========================================================= */
  const setTheme = (p) => {
    root.style.setProperty('--theme', p.theme);
    root.style.setProperty('--theme-dark', p.themeDark);
    root.style.setProperty('--point', p.point);
    root.style.setProperty('--edge', p.edge);
  };

  const setMenu = (index) => {
    menuButtons().forEach((btn, i) => {
      const active = i === index;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-current', active ? 'true' : 'false');
    });
    menuLine.style.transform = `translateX(${menuList.children[index].offsetLeft}px)`;
  };

  /* =========================================================
     MOTION
     ========================================================= */
  const play = (el, keyframes, opts = {}) =>
    el.animate(keyframes, { duration: dur(DURATION), fill: 'both', ...opts }).finished;

  // 새 화면
  // - 배경 · 재료: 동시에 위에서 아래로 (재료만 튕김)
  // - 도넛: 오른쪽에서 등장 (튕김)
  const enter = (slide) => {
    const top = offTop();
    const right = offRight();
    const bgFall = [
      { transform: 'translateY(-100%)', easing: EASE_FALL },
      { transform: 'translateY(0)', offset: LAND },
      { transform: 'translateY(0)' },
    ];
    const fallBounce = [
      { transform: `translateY(${-top}px)`, easing: EASE_FALL },
      { transform: `translateY(${BOUNCE}px)`, offset: LAND, easing: EASE_BOUNCE },
      { transform: 'translateY(0)' },
    ];
    const slideBounce = [
      { transform: `translateX(${right}px)`, easing: EASE_FALL },
      { transform: `translateX(${-BOUNCE}px)`, offset: LAND, easing: EASE_BOUNCE },
      { transform: 'translateX(0)' },
    ];
    return Promise.all([
      play(slide.bg, bgFall),
      ...slide.ingredients.map((el) => play(el, fallBounce)),
      play(slide.product, slideBounce),
    ]);
  };

  // 이전 화면: 덮이는 동안 통째로 아래로 밀려 내려감
  const leave = (slide) =>
    play(slide.el, [
      { transform: 'translateY(0)', easing: EASE_FALL },
      { transform: `translateY(${view.h * PUSH}px)`, offset: LAND },
      { transform: `translateY(${view.h * PUSH}px)` },
    ]);

  // 텍스트: 영문 타이틀 / 한글(제품명+설명) 두 덩어리가 동시에 아래에서 위로
  const rollText = (p) =>
    Promise.all(
      Object.keys(masks).map((type) => {
        const mask = masks[type];
        const oldItems = [...mask.children];
        const next = createTextItem(type, p);
        const h = mask.offsetHeight;
        mask.append(next);

        const out = oldItems.map((el) =>
          play(el, [{ transform: 'translateY(0)' }, { transform: `translateY(${-h}px)` }], { easing: EASE_TEXT })
            .then(() => el.remove())
        );
        const inn = play(next, [{ transform: `translateY(${h}px)` }, { transform: 'translateY(0)' }], { easing: EASE_TEXT })
          .then(() => next.getAnimations().forEach((a) => a.cancel()));
        return Promise.all([...out, inn]);
      })
    );

  // 선택한 제품 메뉴만 튕기면서 커짐 (80 → 100px)
  // 이미 선택된 메뉴를 다시 누르면 100px 상태에서 한 번 더 튕김
  const bounceMenu = (btn, fromScale) =>
    btn.animate(
      [
        { transform: `scale(${fromScale})`, easing: 'cubic-bezier(.5, 0, .5, 1)' },
        { transform: 'scale(1.1)', offset: 0.45, easing: 'cubic-bezier(.4, 0, .5, 1)' },
        { transform: 'scale(.95)', offset: 0.72, easing: 'cubic-bezier(.4, 0, .5, 1)' },
        { transform: 'scale(1)' },
      ],
      { duration: dur(DURATION) }
    );

  /* =========================================================
     GO TO
     ========================================================= */
  async function goTo(index) {
    if (isAnimating) return;          // 전환 중 클릭 막기
    isAnimating = true;

    const p = PRODUCTS[index];
    const prevSlide = currentSlide;
    const nextSlide = createSlide(p);

    // 화면 밖에 둔 상태로 추가 (첫 프레임 깜빡임 방지)
    nextSlide.bg.style.transform = 'translateY(-100%)';
    nextSlide.ingredients.forEach((el) => { el.style.transform = `translateY(${-offTop()}px)`; });
    nextSlide.product.style.transform = `translateX(${offRight()}px)`;
    slidesWrap.append(nextSlide.el);

    bounceMenu(menuButtons()[index], index === current ? 1 : 0.8);
    setMenu(index);
    setTheme(p);
    // 전환 시작과 동시에 현재 제품 변경 → 전환 중 판매 매장/영양 정보를 눌러도 새 제품 정보가 뜸
    current = index;

    await Promise.all([enter(nextSlide), leave(prevSlide), rollText(p)]);

    // 정리
    prevSlide.el.remove();
    [nextSlide.bg, ...nextSlide.ingredients, nextSlide.product].forEach((el) => {
      el.getAnimations().forEach((a) => a.cancel());
      el.style.transform = '';
    });

    currentSlide = nextSlide;
    isAnimating = false;
  }

  /* =========================================================
     HEADER — 고정 / 메인 비주얼을 지나면 배경색 적용
     ========================================================= */
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > visual.offsetHeight - header.offsetHeight);
  };

  /* =========================================================
     NAV — 섹션 이동
     ========================================================= */
  // [data-open-store] (판매 매장 보러가기)는 스크롤 대신 지도 모달을 엶 → js/store.js
  document.querySelectorAll('a[href^="#"]:not([data-open-store])').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;              // 아직 만들지 않은 섹션
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });

      // 푸터 제품 링크: 메인 비주얼로 이동한 뒤 해당 제품으로 전환
      if (a.dataset.product !== undefined) {
        const index = Number(a.dataset.product);
        const start = performance.now();
        const switchWhenArrived = () => {
          if (window.scrollY > 4) {
            // 사용자가 스크롤을 멈추게 하는 경우 대비: 3초 지나면 포기
            if (performance.now() - start < 3000) requestAnimationFrame(switchWhenArrived);
            return;
          }
          if (index !== current) goTo(index);
        };
        requestAnimationFrame(switchWhenArrived);
      }
    });
  });

  /* =========================================================
     판매 매장 / 영양 정보 모달 — 현재 보고 있는 제품 기준
     ========================================================= */
  const infoModal = document.querySelector('.info-modal');
  const infoBody = infoModal.querySelector('.info-modal__body');
  const STORE_NOTICE = '점포별 재고상황이 실시간 변동되므로 방문 전 유선 확인 부탁드립니다.';

  const modalHead = (title, p, info) => `
    <h2 class="info-modal__title" id="info-modal-title">${title}</h2>
    <p class="info-modal__product">${p.name}${info.cold ? '<span class="info-modal__badge">냉장</span>' : ''}</p>`;

  const renderStores = (p, info) => {
    if (!info.stores) {
      // 레몬: 판매 매장 정보 없음 → 지도 모달로 안내
      infoBody.innerHTML = `
        ${modalHead('판매 매장', p, info)}
        <div class="shop-empty">
          <p>판매 매장 정보가 준비 중이에요.<br>가까운 던킨 매장에서 확인해 보세요.</p>
          <button type="button" class="shop-empty__btn">가까운 매장 찾기</button>
        </div>`;
      infoBody.querySelector('.shop-empty__btn').addEventListener('click', () => {
        infoModal.close();
        window.dunkinStoreMap?.open();
      });
      return;
    }

    infoBody.innerHTML = `
      ${modalHead('판매 매장', p, info)}
      <div class="shop-search">
        <input class="shop-search__input" type="search" placeholder="찾으시는 매장명을 입력하세요" aria-label="매장명 검색">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 L21 21"/></svg>
      </div>
      ${info.note ? `<p class="shop-note">* ${info.note}</p>` : ''}
      <p class="shop-guide">매장명을 누르면 지도에서 위치를 볼 수 있어요.</p>
      <ul class="shop-list">
        ${info.stores.map((s) => `<li><button type="button" class="shop-list__btn">${s}</button></li>`).join('')}
      </ul>
      <p class="shop-list__empty" hidden>검색된 매장이 없어요.</p>
      <p class="shop-notice">${STORE_NOTICE}</p>`;

    const items = [...infoBody.querySelectorAll('.shop-list li')];
    const empty = infoBody.querySelector('.shop-list__empty');
    infoBody.querySelector('.shop-search__input').addEventListener('input', (e) => {
      const q = e.target.value.trim();
      let shown = 0;
      items.forEach((li) => {
        const match = li.textContent.includes(q);
        li.hidden = !match;
        if (match) shown += 1;
      });
      empty.hidden = shown > 0;
    });
    // 매장명 클릭 → 지도 모달에서 "○○ 던킨" 검색
    infoBody.querySelectorAll('.shop-list__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        infoModal.close();
        window.dunkinStoreMap?.open(btn.textContent);
      });
    });
  };

  const renderNutrition = (p, info) => {
    infoBody.innerHTML = `
      ${modalHead('영양 정보', p, info)}
      <dl class="nutri">
        ${NUTRITION_LABELS.map(([key, label, unit]) => `
          <div class="nutri__item${key === 'kcal' ? ' nutri__item--main' : ''}">
            <dt>${label}</dt>
            <dd><strong>${info.nutrition[key]}</strong>${unit}</dd>
          </div>`).join('')}
      </dl>
      <div class="allergy">
        <span class="allergy__label">알레르기 정보</span>
        <span class="allergy__text">${info.allergy}</span>
      </div>`;
  };

  document.querySelectorAll('[data-info]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const p = PRODUCTS[current];
      const info = PRODUCT_INFO[current];
      infoModal.dataset.type = btn.dataset.info;
      if (btn.dataset.info === 'store') renderStores(p, info);
      else renderNutrition(p, info);
      infoModal.showModal();
      root.classList.add('is-modal-open');
    });
  });
  infoModal.querySelector('.info-modal__close').addEventListener('click', () => infoModal.close());
  infoModal.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.close(); });
  // 다른 모달(지도)로 바로 넘어가는 경우가 있으므로, 열린 모달이 하나도 없을 때만 스크롤 잠금 해제
  infoModal.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) root.classList.remove('is-modal-open');
  });

  /* =========================================================
     TOP 버튼 — 메인 비주얼을 지나면 나타남
     ========================================================= */
  const topBtn = document.querySelector('.top-btn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    const updateTopBtn = () => topBtn.classList.toggle('is-visible', window.scrollY > visual.offsetHeight * 0.6);
    window.addEventListener('scroll', updateTopBtn, { passive: true });
    updateTopBtn();
  }

  /* =========================================================
     BRAND — ② 도넛 만드는 과정
     - 카드 4장이 모두 보이고, 선택된 카드만 커짐
     - 이전/다음 버튼, 점, 카드 클릭으로 변경 (자동 재생 없음)
     ========================================================= */
  const PROCESS = [
    { name: '연구개발', desc: '더 맛있고 새로운 도넛을 위한 레시피를 연구합니다.', img: 'images/brand/process-01-720.webp' },
    { name: '배합·발효', desc: '최적의 배합과 충분한 발효로 부드럽고 쫄깃한 식감을 만듭니다.', img: 'images/brand/process-02-720.webp' },
    { name: '후라잉·토핑', desc: '황금빛으로 튀겨내고 다채로운 토핑으로 던킨만의 맛을 완성합니다.', img: 'images/brand/process-03-720.webp' },
    { name: '매장 배송', desc: '가장 신선한 상태로 전국의 던킨 매장에 전달합니다.', img: 'images/brand/process-04-720.webp' },
  ];

  const initProcess = () => {
    const list = document.querySelector('.process');
    const dotsWrap = document.querySelector('.process-nav__dots');
    if (!list) return;
    let active = 1;

    const cards = PROCESS.map((step, i) => {
      const li = document.createElement('li');
      li.className = 'process__card';
      li.innerHTML = `
        <span class="process__num">${String(i + 1).padStart(2, '0')}</span>
        <h4 class="process__name">${step.name}</h4>
        <div class="process__img">${step.img ? `<img src="${step.img}" alt="${step.name}" decoding="async">` : ''}</div>
        <div class="process__desc">
          <p class="process__desc-s">${step.desc}</p>
          <p class="process__desc-l" aria-hidden="true">${step.desc}</p>
        </div>`;
      // 설명은 작은 카드용(-s) / 큰 카드용(-l)을 각각 고정 너비로 겹쳐 두고 크로스페이드
      // → 카드 너비가 변해도 줄바꿈이 움직이지 않음
      li.addEventListener('click', () => setStep(i));
      list.append(li);
      return li;
    });

    const dots = PROCESS.map((step, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'process-nav__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `${i + 1}단계 ${step.name}`);
      dot.addEventListener('click', () => setStep(i));
      dotsWrap.append(dot);
      return dot;
    });

    function setStep(index) {
      active = (index + PROCESS.length) % PROCESS.length;
      cards.forEach((card, i) => card.classList.toggle('is-active', i === active));
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === active);
        dot.setAttribute('aria-selected', i === active ? 'true' : 'false');
      });
    }

    document.querySelector('.process-nav__btn--prev').addEventListener('click', () => setStep(active - 1));
    document.querySelector('.process-nav__btn--next').addEventListener('click', () => setStep(active + 1));
    setStep(active);
  };

  /* =========================================================
     BRAND — ④ 인증서 크게 보기
     ========================================================= */
  const initCertModal = () => {
    const modal = document.querySelector('.cert-modal');
    if (!modal) return;
    const modalImg = modal.querySelector('.cert-modal__img');

    document.querySelectorAll('[data-cert]').forEach((btn) => {
      btn.addEventListener('click', () => {
        modalImg.src = btn.dataset.cert;
        modalImg.alt = btn.dataset.certTitle;
        modal.showModal();
      });
    });
    modal.querySelector('.cert-modal__close').addEventListener('click', () => modal.close());
    // 바깥(어두운 영역) 클릭 시 닫기
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  };

  /* =========================================================
     스크롤 등장 모션
     ========================================================= */
  const initReveal = () => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    targets.forEach((el) => io.observe(el));
  };

  /* =========================================================
     INIT
     ========================================================= */
  const init = () => {
    updateScale();
    buildMenu();

    const p = PRODUCTS[current];
    currentSlide = createSlide(p);
    slidesWrap.append(currentSlide.el);
    Object.keys(masks).forEach((type) => masks[type].append(createTextItem(type, p)));
    setTheme(p);
    setMenu(current);
    updateHeader();
    initProcess();
    initCertModal();
    initReveal();

    // 이미지 미리 불러오기 (전환 시 깜빡임 방지)
    PRODUCTS.forEach((item) => {
      new Image().src = `images/bg/bg-${item.key}.png`;
      new Image().src = `images/product/product-${item.key}.png`;
      item.ingredients.forEach(([file]) => { new Image().src = `images/ingredient/${item.key}/${file}.png`; });
    });

    window.addEventListener('resize', updateScale);
    window.addEventListener('scroll', updateHeader, { passive: true });
  };

  init();
})();
