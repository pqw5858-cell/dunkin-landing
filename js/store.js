(() => {
  'use strict';

  /* =========================================================
     카카오맵 설정
     - 카카오 개발자(developers.kakao.com)에서 발급받은 "JavaScript 키"를 아래에 넣으세요.
     - [앱 설정 > 플랫폼 > Web]에 사이트 도메인 등록 필요
       (Live Server 사용 시 예: http://127.0.0.1:5500)
     - 파일을 더블클릭(file://)으로 열면 지도가 표시되지 않습니다.
     ========================================================= */
  const KAKAO_APP_KEY = '8f6d760db90a26b7eea59a1730586d91';

  const DEFAULT_CENTER = { lat: 37.5666, lng: 126.9784, label: '서울시청' }; // 위치 권한 거부 시 기준
  const SEARCH_RADIUS = 5000;   // 내 위치 기준 검색 반경 (m)
  const BRAND_WORD = '던킨';

  /* =========================================================
     ELEMENTS
     ========================================================= */
  const modal = document.querySelector('.store-modal');
  if (!modal) return;
  const form = modal.querySelector('.store-search');
  const input = modal.querySelector('.store-search__input');
  const locateBtn = modal.querySelector('.store-locate');
  const countEl = modal.querySelector('.store-modal__count');
  const listEl = modal.querySelector('.store-list');
  const moreBtn = modal.querySelector('.store-more');
  const mapEl = modal.querySelector('#store-map');
  const noticeEl = modal.querySelector('.store-map__notice');

  let map = null;
  let places = null;
  let markers = [];
  let label = null;
  let results = [];
  let pagination = null;
  let activeIndex = -1;
  let sdkPromise = null;

  /* =========================================================
     카카오 SDK 불러오기 (모달을 처음 열 때 한 번만)
     ========================================================= */
  const loadKakao = () => {
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise((resolve, reject) => {
      if (!KAKAO_APP_KEY) {
        reject(new Error('NO_KEY'));
        return;
      }
      if (location.protocol === 'file:') {
        reject(new Error('FILE_PROTOCOL'));
        return;
      }
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&libraries=services&autoload=false`;
      script.onload = () => window.kakao.maps.load(resolve);
      script.onerror = () => reject(new Error('LOAD_FAIL'));
      document.head.append(script);
    });
    return sdkPromise;
  };

  const NOTICE = {
    NO_KEY: '카카오 지도 API 키가 아직 등록되지 않았어요.<br><small>js/store.js 상단 KAKAO_APP_KEY에 JavaScript 키를 넣으면 지도가 표시됩니다.</small>',
    FILE_PROTOCOL: '지도는 로컬 서버에서 열어야 표시돼요.<br><small>VS Code의 Live Server 등으로 index.html을 열어주세요.</small>',
    LOAD_FAIL: '지도를 불러오지 못했어요.<br><small>API 키와 등록한 사이트 도메인을 확인해주세요.</small>',
  };

  const showNotice = (code) => {
    noticeEl.innerHTML = NOTICE[code] || NOTICE.LOAD_FAIL;
    noticeEl.hidden = false;
    countEl.textContent = '';
    listEl.innerHTML = '<li class="store-list__empty">지도를 사용할 수 없어 매장을 검색할 수 없어요.</li>';
  };

  /* =========================================================
     지도 / 검색
     ========================================================= */
  const initMap = () => {
    const { kakao } = window;
    map = new kakao.maps.Map(mapEl, {
      center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
      level: 5,
    });
    map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
    places = new kakao.maps.services.Places();
  };

  const clearMarkers = () => {
    markers.forEach((m) => m.setMap(null));
    markers = [];
    if (label) label.setMap(null);
    activeIndex = -1;
  };

  const formatDistance = (m) => {
    if (!m) return '';
    const n = Number(m);
    return n >= 1000 ? `${(n / 1000).toFixed(1)}km` : `${n}m`;
  };

  // 검색 결과 중 "던킨" 매장만
  const onlyDunkin = (data) => data.filter((p) => p.place_name.includes(BRAND_WORD));

  const renderList = (append) => {
    if (!append) listEl.innerHTML = '';
    if (!results.length) {
      listEl.innerHTML = '<li class="store-list__empty">검색된 던킨 매장이 없어요.<br>다른 지역명으로 검색해보세요.</li>';
      return;
    }
    const start = append ? listEl.children.length : 0;
    results.slice(start).forEach((p, k) => {
      const i = start + k;
      const li = document.createElement('li');
      li.className = 'store-item';
      li.innerHTML = `
        <button type="button" class="store-item__btn">
          <strong class="store-item__name">${p.place_name}</strong>
          <span class="store-item__addr">${p.road_address_name || p.address_name}</span>
          <span class="store-item__meta">
            ${p.phone ? `<span>${p.phone}</span>` : ''}
            ${p.distance ? `<span class="store-item__dist">${formatDistance(p.distance)}</span>` : ''}
          </span>
        </button>`;
      li.querySelector('button').addEventListener('click', () => select(i, true));
      listEl.append(li);
    });
  };

  const addMarkers = (data, offset) => {
    const { kakao } = window;
    data.forEach((p, k) => {
      const i = offset + k;
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'store-marker';
      el.setAttribute('aria-label', p.place_name);
      el.addEventListener('click', () => select(i, false));
      const marker = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(p.y, p.x),
        content: el,
        yAnchor: 1,
      });
      marker.setMap(map);
      markers.push(marker);
    });
  };

  const fitBounds = () => {
    const { kakao } = window;
    if (!results.length) return;
    const bounds = new kakao.maps.LatLngBounds();
    results.forEach((p) => bounds.extend(new kakao.maps.LatLng(p.y, p.x)));
    map.setBounds(bounds, 80, 80, 80, 80);
  };

  // 목록 ↔ 마커 연동
  function select(i, fromList) {
    const { kakao } = window;
    const p = results[i];
    if (!p) return;
    activeIndex = i;

    [...listEl.querySelectorAll('.store-item')].forEach((li, k) => li.classList.toggle('is-active', k === i));
    markers.forEach((m, k) => m.getContent().classList.toggle('is-active', k === i));

    const pos = new kakao.maps.LatLng(p.y, p.x);
    map.panTo(pos);

    if (label) label.setMap(null);
    label = new kakao.maps.CustomOverlay({
      position: pos,
      content: `<div class="store-label"><strong>${p.place_name}</strong><span>${p.road_address_name || p.address_name}</span></div>`,
      yAnchor: 2.1,
      zIndex: 3,
    });
    label.setMap(map);

    if (!fromList) {
      listEl.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // 카카오 pagination.nextPage()는 처음 검색할 때 넘긴 콜백을 다시 호출하므로,
  // "더보기"인지 여부는 플래그로 구분
  let appendNext = false;
  const onResult = (data, status, page) => {
    const { kakao } = window;
    const append = appendNext;
    appendNext = false;
    pagination = page;
    if (!append) {
      clearMarkers();
      results = [];
    }
    if (status === kakao.maps.services.Status.OK) {
      const found = onlyDunkin(data);
      const offset = results.length;
      results = results.concat(found);
      renderList(append);
      addMarkers(found, offset);
      if (!append) fitBounds();
    } else if (!append) {
      renderList(false);
    }
    countEl.innerHTML = results.length ? `던킨 매장 <strong>${results.length}</strong>곳` : '';
    moreBtn.hidden = !(pagination && pagination.hasNextPage);
  };

  // 키워드 검색 (입력어 뒤에 "던킨" 자동 추가)
  const searchKeyword = (keyword) => {
    const q = keyword.trim();
    if (!q) return;
    const query = q.includes(BRAND_WORD) ? q : `${q} ${BRAND_WORD}`;
    places.keywordSearch(query, onResult);
  };

  // 내 위치 주변 검색 (거리순)
  const searchNearby = (lat, lng) => {
    const { kakao } = window;
    const center = new kakao.maps.LatLng(lat, lng);
    map.setCenter(center);
    places.keywordSearch(BRAND_WORD, onResult, {
      location: center,
      radius: SEARCH_RADIUS,
      sort: kakao.maps.services.SortBy.DISTANCE,
    });
  };

  const locate = () => {
    countEl.textContent = '현재 위치를 확인하고 있어요…';
    if (!navigator.geolocation) {
      searchNearby(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => searchNearby(pos.coords.latitude, pos.coords.longitude),
      () => {
        countEl.textContent = `위치 정보를 사용할 수 없어 ${DEFAULT_CENTER.label} 주변을 보여드려요.`;
        searchNearby(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
      },
      { timeout: 8000 }
    );
  };

  /* =========================================================
     모달 열기 / 닫기
     ========================================================= */
  // keyword가 있으면 그 매장명으로 검색, 없으면 (처음 열 때) 내 위치 주변 검색
  const open = async (keyword) => {
    modal.showModal();
    document.documentElement.classList.add('is-modal-open');
    if (keyword) input.value = keyword;
    try {
      await loadKakao();
      const first = !map;
      if (first) initMap();
      else map.relayout();
      if (keyword) searchKeyword(keyword);
      else if (first) locate();
    } catch (err) {
      showNotice(err.message);
    }
  };

  // 다른 스크립트(main.js 판매 매장 모달)에서 지도 모달을 열 수 있도록 공개
  window.dunkinStoreMap = { open };

  const close = () => modal.close();
  modal.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('is-modal-open');
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  modal.querySelector('.store-modal__close').addEventListener('click', close);

  document.querySelectorAll('[data-open-store]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open();                           // 클릭 이벤트 객체가 keyword로 넘어가지 않게 인자 없이 호출
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (places) searchKeyword(input.value);
  });
  locateBtn.addEventListener('click', () => { if (places) locate(); });
  moreBtn.addEventListener('click', () => {
    if (!pagination || !pagination.hasNextPage) return;
    appendNext = true;                  // 다음 페이지는 목록 뒤에 이어 붙이기
    pagination.nextPage();
  });
})();
