import { remote } from 'webdriverio';

(async function testUserRegistration() {
  const browser = await remote({
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    },
  });

  try {
    await browser.url('http://localhost:3000/register'); // 올바른 경로로 수정

    // 필수 입력 필드에 값 입력
    await browser.$('#userName').setValue('테스트 유저');
    await browser.$('#email').setValue('testuser@example.com');
    await browser.$('#password').setValue('TestPassword123!');
    await browser.$('#confirmPassword').setValue('TestPassword123!');

    // 선택 사항인 주소와 전화번호도 입력
    await browser.$('#address').setValue('서울시 강남구');
    await browser.$('#phone').setValue('010-1234-5678');

    // 약관 동의 체크박스 선택
    await browser.$('[name="policy"]').click();

    // 'Register' 버튼 클릭
    await browser.$('button[type="submit"]').click();

    console.log('테스트 성공: 회원가입 버튼이 눌렸습니다.');
  } catch (error) {
    console.error('테스트 중 오류 발생:', error);
  } finally {
    await browser.deleteSession();
  }
})();
