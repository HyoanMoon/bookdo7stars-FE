module.exports.config = {
  // ====================
  // 러너(Runner) 설정
  // ====================
  runner: 'local', // 로컬 머신에서 테스트 실행

  // ==================
  // 테스트 파일 지정
  // ==================
  specs: ['./webdriverio-test/test/specs/**/*.js'], // 테스트 파일 위치
  exclude: [], // 제외할 테스트 파일

  // ============
  // 브라우저 설정 (Capabilities)
  // ============
  maxInstances: 1, // 동시에 실행할 최대 인스턴스 수
  capabilities: [
    {
      browserName: 'chrome', // 사용 브라우저: 크롬
      'goog:chromeOptions': {
        args: [
          '--headless', // 헤드리스 모드로 실행 (GUI 없음)
          '--disable-gpu', // GPU 비활성화
          '--no-sandbox', // 샌드박스 모드 비활성화 (권한 문제 해결)
          '--disable-dev-shm-usage', // /dev/shm 파티션 문제 해결
        ],
      },
    },
  ],

  // ===================
  // 테스트 설정
  // ===================
  logLevel: 'info', // 로그 레벨: trace | debug | info | warn | error | silent
  bail: 0, // 실패 시 중단할 테스트 수 (0은 중단 안 함)
  baseUrl: 'http://localhost:3000', // 애플리케이션 기본 URL
  waitforTimeout: 10000, // 기본 대기 시간(ms)
  connectionRetryTimeout: 120000, // 연결 재시도 시간(ms)
  connectionRetryCount: 3, // 연결 재시도 횟수

  // ========
  // 서비스
  // ========
  services: ['chromedriver'], // Chromedriver 서비스 사용

  // ==========
  // 프레임워크
  // ==========
  framework: 'mocha', // 테스트 프레임워크: Mocha
  mochaOpts: {
    ui: 'bdd', // Mocha UI 인터페이스: BDD 스타일
    timeout: 60000, // 테스트 타임아웃(ms)
  },

  // ==========
  // 리포터
  // ==========
  reporters: [
    'spec', // 콘솔에 테스트 결과를 출력하는 기본 리포터
    [
      'junit',
      {
        outputDir: './reports/junit', // XML 리포트 저장 경로
        outputFileFormat: (options) => `results-${options.cid}.xml`, // 파일명 형식
      },
    ],
  ],

  // ========
  // 플러그인
  // ========
  plugins: {
    'wdio-testing-library': {}, // 추가 플러그인 설정
  },
};
