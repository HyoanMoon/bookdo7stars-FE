import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InquiryTable = ({ inquiries }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>문의유형</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>문의내용</TableCell>
            <TableCell>이메일로 응답</TableCell>
            <TableCell>SMS로 응답</TableCell>
            <TableCell>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inquiries.map((inquiry, index) => (
            <TableRow key={index}>
              <TableCell>{inquiry.inquiryType}</TableCell>
              <TableCell>{inquiry.image && <img src={inquiry.image} alt="Inquiry Image" style={{ width: 100, height: 'auto' }} />}</TableCell>
              <TableCell>{inquiry.inquiryContent}</TableCell>
              <TableCell>{inquiry.emailReply ? 'Yes' : 'No'}</TableCell>
              <TableCell>{inquiry.smsReply ? 'Yes' : 'No'}</TableCell>
              <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InquiryTable;
