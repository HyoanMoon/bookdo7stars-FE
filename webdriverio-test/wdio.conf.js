export const config = {
  // Runner Configuration
  runner: 'local',

  // Specify Test Files
  specs: ['./test/specs/**/*.js'], // Test files location
  exclude: [],

  // Capabilities
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],

  // Test Configurations
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Services
  services: [
    'chromedriver',
    [
      'slack',
      {
        webhook: 'https://hooks.slack.com/services/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',
        notifyTestStart: true,
        notifyTestFinish: true,
        notifyTestFail: true,
        messageTitle: 'WebDriverIO Test Report',
        customMessages: {
          start: '🚀 테스트가 시작되었습니다.',
          pass: '✅ 테스트가 성공적으로 완료되었습니다.',
          fail: '❌ 테스트가 실패했습니다. 결과를 확인하세요!',
        },
      },
    ],
  ],

  // Framework
  framework: 'mocha',
  reporters: ['spec'],

  // Mocha Options
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  // Add plugins
  plugins: {
    'wdio-testing-library': {},
  },
};
