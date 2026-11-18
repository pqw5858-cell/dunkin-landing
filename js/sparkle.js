(() => {
  'use strict';

  /* =========================================================
     클릭 스프링클 효과
     - 클릭한 지점에서 도넛 스프링클(끝이 둥근 짧은 막대 + 작은 점)이 펑 퍼졌다가
       살짝 떨어지며 사라짐
     - 색: 파비콘 도넛 스프링클 색 + 포인트 컬러 + 초코
     ========================================================= */
  const COLORS = ['#fff3d6', '#f7d154', '#f5a33a', '#f57a9a', '#de633e', '#5a3a2e'];
  const COUNT = 12;               // 한 번에 터지는 개수
  const DURATION = 550;           // 사라지기까지 (ms)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rand = (min, max) => min + Math.random() * (max - min);

  const burst = (x, y) => {
    // 모달(dialog)이 열려 있으면 모달 안에 그려야 모달 위로 보임
    const host = document.querySelector('dialog[open]') || document.body;

    for (let i = 0; i < COUNT; i += 1) {
      const el = document.createElement('span');
      const isDot = i % 4 === 3;                      // 4개 중 1개는 작은 점
      el.className = `sprinkle${isDot ? ' sprinkle--dot' : ''}`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      host.append(el);

      // 고르게 퍼지도록 각도를 나누고 약간씩 흔듦
      const angle = (Math.PI * 2 * i) / COUNT + rand(-0.25, 0.25);
      const dist = rand(36, 72);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const r0 = rand(0, 360);
      const r1 = r0 + rand(-180, 180);

      // 구간별 곡선: 펑 퍼지기(빠르게 감속) → 살짝 떠 있기 → 떨어지며 사라지기
      // (전체에 곡선을 걸면 진행이 앞당겨져 너무 빨리 흐려지므로 구간마다 따로 지정)
      const move = (k, drop = 0) => `translate(calc(-50% + ${dx * k}px), calc(-50% + ${dy * k + drop}px))`;
      el.animate(
        [
          { transform: `translate(-50%, -50%) rotate(${r0}deg) scale(.4)`, opacity: 1, easing: 'cubic-bezier(.15, .8, .3, 1)' },
          { transform: `${move(1)} rotate(${r0 + (r1 - r0) * 0.5}deg) scale(1)`, opacity: 1, offset: 0.35, easing: 'ease-out' },
          { transform: `${move(1.08, 6)} rotate(${r0 + (r1 - r0) * 0.75}deg) scale(1)`, opacity: 1, offset: 0.7, easing: 'ease-in' },
          { transform: `${move(1.15, 24)} rotate(${r1}deg) scale(.8)`, opacity: 0 },
        ],
        { duration: DURATION + rand(-60, 60), fill: 'forwards' }
      ).finished.then(() => el.remove());
    }
  };

  // 마우스 왼쪽 버튼 클릭에만 반응 (터치·우클릭 제외)
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    burst(e.clientX, e.clientY);
  }, { passive: true });
})();
