module.exports.config = {
  // Runner Configuration
  runner: 'local',

  // Specify Test Files
  specs: ['./webdriverio-test/test/specs/**/*.js'], // Test files location
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
  services: ['chromedriver'],

  // Framework
  framework: 'mocha',

  // Reporters
  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: './reports/junit', // XML 파일이 저장될 경로
        outputFileFormat: (options) => `results-${options.cid}.xml`, // 파일명 형식 설정
      },
    ],
  ],

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
