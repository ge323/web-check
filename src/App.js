import './App.css';

const NAV_ITEMS = [
  { label: '홈', href: '#' },
  { label: '소개', href: '#' },
  { label: 'AI 갤러리', href: '#' },
  { label: '히스토리', href: '#' },
  { label: '로그인', href: '#' },
  { label: '회원가입', href: '#' },
];

const HERO_STATS = [
  { label: '분석 정확도', value: '98%' },
  { label: '평균 처리 시간', value: '3.2s' },
  { label: '검증된 영상', value: '12,430+' },
];

const FOOTER_LINKS = [
  '서비스 소개',
  'AI 갤러리',
  '히스토리',
  '연구 리포트',
];

function App() {
  return (
    <div className="app-shell" id="all">
      <header className="site-header" id="header">
        <div className="wrap header-top">
          <div className="logo">
            <span>AI Media Watch</span>
          </div>
          <nav className="primary-nav">
            <ul className="menus">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="right">
            <select name="language" aria-label="언어 선택">
              <option>한국어</option>
              <option>English</option>
              <option>日本語</option>
            </select>
          </div>
        </div>
      </header>

      <main id="main">
        <div className="wrap hero">
          <div className="hero-left">
            <p className="eyebrow">딥페이크 분석 플랫폼</p>
            <h1>
              당신이 보고 있는 영상,
              <br />
              <span>진짜인지 확인하세요</span>
            </h1>
            <p className="subtitle">
              딥러닝 기술로 영상의 위변조 여부를 분석하고, 의심 구간과 근거를 명확하게 제시합니다.
              서비스 소개·갤러리·히스토리 페이지와 같은 결을 가진 홈 히어로 섹션입니다.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-btn">
                분석 시작하기
              </button>
              <button type="button" className="ghost-btn">
                히스토리 보기
              </button>
            </div>
            <dl className="hero-stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-right">
            <div className="analysis-card">
              <div className="card-head">
                <p>실시간 분석 흐름</p>
                <span>03 STEP</span>
              </div>
              <ul className="analysis-steps">
                <li>
                  <span>01</span>
                  <p>프레임 분해 및 얼굴 영역 추출</p>
                </li>
                <li>
                  <span>02</span>
                  <p>위·변조 패턴 탐지와 점수화</p>
                </li>
                <li>
                  <span>03</span>
                  <p>근거 프레임과 리포트 생성</p>
                </li>
              </ul>
              <div className="analysis-status">
                <p>현재 진행률</p>
                <div className="status-bar">
                  <span />
                </div>
                <small>AI 갤러리와 동일 톤의 카드 스타일</small>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <div className="btm-text">
            <p className="footer-title">졸업설계 프로젝트 · AI Media Watch</p>
            <p className="footer-desc">
              소개·갤러리·히스토리 페이지에서 사용한 파란 배경과 정중앙 정렬을 그대로 적용해 홈 푸터의 일관성을 맞췄습니다.
            </p>
            <div className="footer-grid">
              <div className="footer-column">
                <span className="footer-label">문의</span>
                <a href="mailto:team@aimedia.watch">team@aimedia.watch</a>
                <span>서울과학기술대학교 졸업설계</span>
              </div>
              <div className="footer-column">
                <span className="footer-label">바로가기</span>
                <ul className="footer-links">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-column">
                <span className="footer-label">연결</span>
                <p className="footer-badge">AI Media Watch</p>
                <p>Copyright 2026 All rights reserved.</p>
              </div>
            </div>
            <p className="footer-copy">이 사이트는 졸업설계를 위해 제작된 프로토타입입니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
