import React from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

const InquiryForm = () => {
  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        1:1 문의하기
      </Typography>
      <TextField select label="선택" fullWidth margin="normal" variant="outlined">
        <MenuItem value="상품 문의">상품 문의</MenuItem>
        <MenuItem value="재고 문의">재고 문의</MenuItem>
        <MenuItem value="기타 유형">기타 유형</MenuItem>
      </TextField>
      <Typography color="error">잠깐! 문의전, 자주 묻는 질문 TOP10을 확인해보세요.</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">문의내용</Typography>
        <TextField multiline rows={4} variant="outlined" fullWidth margin="normal" />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">파일첨부</Typography>
        <Button variant="contained" component="label">
          파일 선택
          <input type="file" hidden />
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">답변메일</Typography>
        <TextField variant="outlined" fullWidth margin="normal" defaultValue="hkim7963@kakao.com" />
        <FormControlLabel control={<Checkbox name="emailReply" />} label="이메일로 답변 받기" />
        <FormControlLabel control={<Checkbox name="smsReply" />} label="SMS로 답변 받기" />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">(필수)개인정보 수집 및 이용 동의</Typography>
        <Typography variant="body2">예스24에서는 무사히 답변을 드리기 위해 개인정보를 수집 및 이용합니다.</Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined">취소</Button>
        <Button variant="contained" color="primary">
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default InquiryForm;
