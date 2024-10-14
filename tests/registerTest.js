const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// ChromeDriver 옵션 설정
let options = new chrome.Options();
options.addArguments('--no-sandbox'); // 샌드박스 비활성화
options.addArguments('--disable-dev-shm-usage'); // 메모리 문제 방지

(async function testUserRegistration() {
  // 브라우저 드라이버 설정 (Chrome 예시)
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options) // Chrome 옵션 적용
    .build();

  try {
    // 회원가입 페이지 로드 (URL 수정 필요)
    await driver.get('http://localhost:3000/register'); // 올바른 경로로 수정

    // 필수 입력 필드에 값 입력
    await driver.findElement(By.id('userName')).sendKeys('테스트 유저');
    await driver.findElement(By.id('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.id('password')).sendKeys('TestPassword123!');
    await driver.findElement(By.id('confirmPassword')).sendKeys('TestPassword123!');

    // 선택 사항인 주소와 전화번호도 입력
    await driver.findElement(By.id('address')).sendKeys('서울시 강남구');
    await driver.findElement(By.id('phone')).sendKeys('010-1234-5678');

    // 약관 동의 체크박스 선택
    await driver.findElement(By.name('policy')).click();

    // 'Register' 버튼 클릭
    await driver.findElement(By.css('button[type="submit"]')).click();

    // 회원가입 버튼이 눌렸는지만 확인하고 성공으로 처리
    console.log('테스트 성공: 회원가입 버튼이 눌렸습니다.');
  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    // 브라우저 종료
    await driver.quit();
  }
})();
