describe('회원가입 페이지 테스트', () => {
  it('회원가입 양식 제출하기', async () => {
    // 페이지 열기
    await browser.url('http://localhost:3000/register');

    // 필수 입력 필드 값 입력
    await $('#userName').setValue('테스트 유저');
    await $('#email').setValue('testuser@example.com');
    await $('#password').setValue('TestPassword123!');
    await $('#confirmPassword').setValue('TestPassword123!');

    // 선택 필드 값 입력
    await $('#address').setValue('서울시 강남구');
    await $('#phone').setValue('010-1234-5678');

    // 약관 동의 체크박스 선택
    await $('[name="policy"]').click();

    // 제출 버튼 클릭
    await $('button[type="submit"]').click();

    // 제출 후 로그 출력
    console.log('테스트 성공: 회원가입 버튼이 눌렸습니다.');
  });
});
