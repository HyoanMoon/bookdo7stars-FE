import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat, cc_expires_format } from '../utils/number';
import { orderActions } from '../action/orderActions'; // 오더 생성 액션 추가
import DeliveryEstimate from '../components/BookDetailPage/DeliveryEstimate';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCartList, finalTotalPrice, shippingFee, discountRate, grandTotal } = location.state || {
    selectedCartList: [],
    finalTotalPrice: 0,
    shippingFee: 0,
    discountRate: 0,
    grandTotal: 0,
  };
  const { user, cartList, deliveryAddress } = useSelector((state) => state.cart); // 사용자 정보 추가
  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('user:', user);
    console.log('orderList', orderList);
  }, [user, orderList]);

  const [shippingMethod, setShippingMethod] = useState('general');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    zipCode: '',
    address1: '',
    address2: '',
    phone: '',
    email: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardInfo, setCardInfo] = useState({
    cardType: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const { name, zipCode, address1, address2, phone, email } = shippingInfo;
    const data = {
      totalPrice: grandTotal, // grandTotal을 사용
      shipTo: { zipCode, address1, address2 },
      contact: { name, phone, email },
      orderList: selectedCartList.map((item) => {
        return {
          bookId: item.bookId,
          qty: item.qty,
          price: item.bookId.priceSales,
        };
      }),
    };

    try {
      const response = await dispatch(orderActions.createOrder(data));
      navigate('/payment/success', {
        state: {
          shippingInfo,
          grandTotal,
          paymentMethod,
        },
      });
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === 'expiryDate') {
      let newValue = cc_expires_format(value);
      setCardInfo((prevInfo) => ({
        ...prevInfo,
        [name]: newValue,
      }));
      return;
    }
    setCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (cartList.length === 0) {
    navigate('/cart');
  }

  const handlePostcode = () => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setShippingInfo((prevInfo) => ({
            ...prevInfo,
            zipCode: data.zonecode,
            address1: data.address,
          }));
        },
      }).open();
    };
    document.body.appendChild(script);
  };

  const handleShippingMethodChange = (e) => {
    const { value } = e.target;
    setShippingMethod(value);
    if (value === 'general') {
      setShippingInfo({
        name: '',
        zipCode: '',
        address1: '',
        address2: '',
        phone: '',
        email: '',
      });
    }
  };

  const handleUseUserInfo = () => {
    setShippingInfo({
      name: user.userName,
      zipCode: '',
      address1: user.address,
      address2: '',
      phone: user.phone,
      email: user.email,
    });
  };
  const handleStoredAddress = () => {
    setShippingInfo({
      name: '',
      zipCode: '',
      address1: deliveryAddress,
      address2: '',
      phone: '',
      email: '',
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">상품확인</Typography>
        <Button variant="contained" color="primary" onClick={handleBackToCart}>
          카트로 가기
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>상품명</TableCell>
              <TableCell align="right">정가</TableCell>
              <TableCell align="right">수량</TableCell>
              <TableCell align="right">할인금액</TableCell>
              <TableCell align="right">합계</TableCell>
              <TableCell align="right">배송일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCartList.map((item) => {
              const originalPrice = item.bookId.priceSales * item.qty;
              const discountAmount = originalPrice * discountRate;
              const discountedPrice = originalPrice - discountAmount;
              return (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img src={item.bookId.cover} alt={item.bookId.title} width={50} />
                      <Typography variant="body2" ml={2}>
                        {item.bookId.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">₩ {currencyFormat(item.bookId.priceSales)}</TableCell>
                  <TableCell align="right">{item.qty}</TableCell>
                  <TableCell align="right">₩ {currencyFormat(discountAmount)}</TableCell>
                  <TableCell align="right">₩ {currencyFormat(discountedPrice)}</TableCell>
                  <TableCell align="right">
                    <DeliveryEstimate address={deliveryAddress} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>배송일</TableCell>
                <TableCell>배송 정보</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  배송지
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2">{deliveryAddress}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  배송 정보
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2">
                      {' '}
                      <DeliveryEstimate address={deliveryAddress} />
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Typography variant="h6">최종 금액: ₩{currencyFormat(finalTotalPrice)}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Typography variant="h6">배송비: ₩{currencyFormat(shippingFee)}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Typography variant="h6">총 결제 금액: ₩{currencyFormat(grandTotal)}</Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          배송 주소
        </Typography>
        <RadioGroup row value={shippingMethod} onChange={handleShippingMethodChange}>
          <FormControlLabel value="general" control={<Radio />} label="새로입력" />
          <FormControlLabel value="userInfo" control={<Radio />} label="회원 정보 동일" onClick={handleUseUserInfo} />
          <FormControlLabel value="storedInfo" control={<Radio />} label="위 주소와 동일" onClick={handleStoredAddress} />
        </RadioGroup>

        <TextField fullWidth label="이름" name="name" value={shippingInfo.name} onChange={handleShippingInfoChange} margin="normal" />
        <Box display="flex" alignItems="center">
          <TextField label="우편번호" name="zipCode" value={shippingInfo.zipCode} onChange={handleShippingInfoChange} margin="normal" />
          <Button variant="contained" color="primary" onClick={handlePostcode} sx={{ height: '56px', ml: 2 }}>
            주소찾기
          </Button>
        </Box>
        <TextField fullWidth label="주소" name="address1" value={shippingInfo.address1} onChange={handleShippingInfoChange} margin="normal" />
        <TextField fullWidth label="상세 주소" name="address2" value={shippingInfo.address2} onChange={handleShippingInfoChange} margin="normal" />
        <TextField fullWidth label="전화번호" name="phone" value={shippingInfo.phone} onChange={handleShippingInfoChange} margin="normal" />
        <TextField fullWidth label="이메일" name="email" value={shippingInfo.email} onChange={handleShippingInfoChange} margin="normal" />
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          결제 정보
        </Typography>
        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel value="creditCard" control={<Radio />} label="신용카드" />
            <FormControlLabel value="transfer" control={<Radio />} label="무통장 입금" />
            <FormControlLabel value="phonePayment" control={<Radio />} label="휴대폰 결제" />
          </RadioGroup>
        </FormControl>

        {paymentMethod === 'creditCard' && (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>카드사 선택</InputLabel>
              <Select name="cardType" value={cardInfo.cardType} onChange={handleCardInfoChange}>
                <MenuItem value="visa">Visa</MenuItem>
                <MenuItem value="mastercard">MasterCard</MenuItem>
                <MenuItem value="amex">American Express</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="카드 번호" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardInfoChange} margin="normal" />
            <TextField fullWidth label="유효 기간 (MM/YY)" name="expiryDate" value={cardInfo.expiryDate} onChange={handleCardInfoChange} margin="normal" />
            <TextField fullWidth label="CVC" name="cvc" value={cardInfo.cvc} onChange={handleCardInfoChange} margin="normal" />
          </Box>
        )}
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" size="large" onClick={handleOrderSubmit}>
          결제하기
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentPage;
