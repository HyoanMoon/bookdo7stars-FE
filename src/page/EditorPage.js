import React from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

// 스타일링된 컴포넌트 정의
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: 180, // 크기를 더 키움
  height: 270, // 크기를 더 키움
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginLeft: 20,
  marginRight: 20,
  width: 160,
  height: 160,
}));

// 도메인 변수
const DOMAIN = 'http://localhost:3000';
// const DOMAIN = 'https://book-do-7-stars.netlify.app/'; //배포용

const editors = [
  {
    name: '에디터 효안',
    illustration: '/image/hyoan.png',
    bookCover: 'https://image.aladin.co.kr/product/31100/55/cover200/k492831631_1.jpg',
    orderPageId: '667afe126b14676ab1b12746',
    comment:
      '<b>효안의 추천 책:</b><br/>' +
      '<b>당신은 결국 무엇이든 해내는 사람 - 김상현 저</b><br/>' +
      '흔들리고 떠밀리고 넘어져도 나는, 당신은, 우리는 결국 해낼 것이라는 믿음의 문장들 ' +
      '『내가 죽으면 장례식에 누가 와줄까』 김상현 작가 3년만의 신작! ' +
      '전작을 통해 인간관계와 행복에 대해 따뜻한 시선과 위로의 문장을 전했다면, 신작 『당신은 결국 무엇이든 해내는 사람』은 ' +
      '나 자신을 제대로 바라볼 수 있는 힘을, 수많은 시행착오에도 불구하고 우리는 무엇이든 이루어낼 수 있는 사람임을, ' +
      '희망과 믿음의 문장들로 담아냈다. 삶에 아무 것도 남지 않은 것만 같을 때, 무엇을 해야 할지 알 수 없어 막막할 때, ' +
      '이 책이 당신을 한 걸음 더 나아가게 하는 희망의 메시지가 되어 줄 것이다.',
  },
  {
    name: '에디터 메이',
    illustration: '/image/may.png',
    orderPageId: '667afde66b14676ab1b0eeee',
    bookCover: 'https://image.aladin.co.kr/product/34182/41/cover200/k762931310_1.jpg',
    comment:
      '<b>메이의 추천 책:</b><br/>' +
      '<b>셔터가 내리고 나면 - 동구 저</b><br/>' +
      '주변인이던 그 긴 시간 동안 내가 바란 건 그저 명함 한 장이었는데, 명함을 갖자마자 이곳이 싫어졌다. ' +
      '그렇게 이 조직을 나갔다가 다시 여기로 돌아온, 어찌 보면 박복하고, 어찌 보면 다사다난한 내 이십 대 중반부터 삼십 대 후반까지 이야기다. ' +
      '우울함이 길고 깊었다. 억울해할 것도 없는데 억울했다. 그 지리멸렬한 방황 끝에 나는 이 직장에 들어왔다. ' +
      '서울 생활을 정리하고 본가로 돌아왔다. 입사와 동시에 퇴사를 생각하는 사람은 몇 명이나 될까? ' +
      '그렇게 딱 서른 살 여름날, 이 회사에 들어왔다. 마음은 늘 물에 젖은 솜처럼 무거웠다.',
  },
  {
    name: '에디터 제인',
    illustration: '/image/jane.png',
    orderPageId: '667afe136b14676ab1b1296e',
    bookCover: 'https://image.aladin.co.kr/product/33842/40/cover200/k732930090_1.jpg',
    comment:
      '<b>제인의 추천 책:</b><br/>' +
      '<b>구글 임원에서 실리콘밸리 알바생이 되었습니다 - 정김경숙(로이스김) 저</b><br/>' +
      '최악의 시련을 인생 최고의 순간으로 바꾸었다! ' +
      '변화가 기본값인 시대, 삶의 파도 위를 건너는 모두에게 전하는 메시지. ' +
      '50살에 실리콘밸리로 떠나, 비원어민으로서는 최초로 구글 본사 글로벌 커뮤니케이션팀을 이끌었던 저자는 도전에도, 배움에도 늦은 때란 없다는 감동을 주며 ' +
      '언론의 관심을 한몸에 받았었다. 그로부터 6개월 후, 16년간 누구보다 사랑한 회사에서 이메일 한 통으로 정리해고가 된 것이다! ' +
      '심장이 베이는 듯한 충격을 받았지만, 이 최악의 시련을 인생 최고의 순간으로 바꾸었다. 변화의 파도에 떠밀려 사는 시대, 이 책은 커리어의 방향키를 ' +
      '유연하게 쥐며 강요된 변화를 기회로 활용하는 트랜스포머적인 태도와 생각을 전하고자 한다.',
  },
  {
    name: '에디터 현준',
    illustration: '/image/hunjoon.png',
    orderPageId: '667afe0f6b14676ab1b12290',
    bookCover: 'https://image.aladin.co.kr/product/24568/83/cover200/k882631974_3.jpg',
    comment:
      '<b>현준의 추천 책:</b><br/>' +
      '<b>내일의 으뜸 - 김빵 저</b><br/>' +
      '대학 졸업을 앞두고 있는 평범한 취준생, 임솔. ' +
      '아이돌 그룹 ‘감자전’ 제5의 멤버 류선재의 덕후라는 사실을 숨긴 채 ' +
      '일반인 코스프레 중이다. 어느 날, 불의의 사고로 류선재는 유명을 달리하고 ' +
      '슬픔에 빠져 있던 임솔은 우연히 줍게 된 회중시계를 통해 ' +
      '6년 전 과거로 타임 리프를 하게 되는데…….' +
      '눈을 가늘게 하고 봐도, 부릅뜨고 봐도 선재였다. 이건 어쩌면 기회일지도 모른다. ' +
      '류선재를 비운의 제5의 멤버로 감자전에 합류하지 못하게 할 기회. ' +
      '류선재를 살릴 수 있는 기회. 다시 살게 된 열여덟, 목표는 단 하나. 류선재를 살리는 것이다!',
  },
];

const EditorPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        에디터 추천 페이지
      </Typography>
      {editors.map((editor, index) => (
        <StyledPaper key={index} elevation={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <StyledAvatar src={editor.illustration} />
            </Grid>
            <Grid item>
              <StyledBox>
                <a href={`${DOMAIN}/book/${editor.orderPageId}`}>
                  <img src={editor.bookCover} alt="Book cover" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'inherit' }} />
                </a>
              </StyledBox>
            </Grid>
            <Grid item xs>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" dangerouslySetInnerHTML={{ __html: editor.comment }} />
                  <Typography variant="body2" component="p">
                    <a href={`${DOMAIN}/book/${editor.orderPageId}`}>책 주문하기</a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </StyledPaper>
      ))}
    </Container>
  );
};

export default EditorPage;
