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
import { orderActions } from '../action/orderActions';
import DeliveryEstimate from '../components/BookDetailPage/DeliveryEstimate';
import OrderReceipt from '../components/OrderReceipt';

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
  const { user, cartList, deliveryAddress } = useSelector((state) => state.cart);
  const { orderList } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showAllItems, setShowAllItems] = useState(false); // 항목 표시 상태 관리

  useEffect(() => {
    console.log('user:', user);
    console.log('orderListtttttt', orderList);
    console.log('selectedCartList', selectedCartList);
  }, [user, orderList, selectedCartList]);

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

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      return;
    }
    setCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
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
          setErrors((prevErrors) => ({
            ...prevErrors,
            zipCode: '',
            address1: '',
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
      setErrors({});
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
    setErrors({});
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
    setErrors({});
  };

  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const itemsToShow = showAllItems ? selectedCartList : selectedCartList.slice(0, 1);

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} mt={5}>
        <Button variant="contained" color="primary" onClick={handleBackToCart}>
          카트로 가기
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box flex={3} mr={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} sx={{ whiteSpace: 'nowrap' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="h4" sx={{ fontWeight: 500 }}>
                        주문상품 총{' '}
                        <Box component="span" color="#608020" fontWeight="bold">
                          {selectedCartList.length}
                        </Box>
                        개
                      </Typography>
                      {selectedCartList.length > 1 && (
                        <Button variant="outlined" onClick={toggleShowAllItems}>
                          {showAllItems ? '간단히 보기' : '더보기'}
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      상품명
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      정가
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      수량
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      할인금액
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      합계
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      배송일
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsToShow.map((item) => {
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
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        ₩ {currencyFormat(item.bookId.priceSales)}
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {item.qty}
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        <Box component="span" color="#608020" fontWeight="bold">
                          - ₩ {currencyFormat(discountAmount)}
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        ₩ {currencyFormat(discountedPrice)}
                      </TableCell>
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
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" component="th" rowSpan={2} sx={{ backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0' }}>
                      배송일
                    </TableCell>
                    <TableCell align="center" component="th">
                      배송지:
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography>{deliveryAddress}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" component="th" rowSpan={2} display="flex">
                      배송정보:
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography>
                          {''}
                          <DeliveryEstimate address={deliveryAddress} />
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
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

            <TextField
              fullWidth
              label="이름"
              name="name"
              value={shippingInfo.name}
              onChange={handleShippingInfoChange}
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <Box display="flex" alignItems="center">
              <TextField
                label="우편번호"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleShippingInfoChange}
                margin="normal"
                error={!!errors.zipCode}
                helperText={errors.zipCode}
              />
              <Button variant="contained" color="primary" onClick={handlePostcode} sx={{ height: '56px', ml: 2 }}>
                주소찾기
              </Button>
            </Box>
            <TextField
              fullWidth
              label="주소"
              name="address1"
              value={shippingInfo.address1}
              onChange={handleShippingInfoChange}
              margin="normal"
              error={!!errors.address1}
              helperText={errors.address1}
            />
            <TextField fullWidth label="상세 주소" name="address2" value={shippingInfo.address2} onChange={handleShippingInfoChange} margin="normal" />
            <TextField
              fullWidth
              label="전화번호"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingInfoChange}
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              label="이메일"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingInfoChange}
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
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
                  <Select name="cardType" value={cardInfo.cardType} onChange={handleCardInfoChange} error={!!errors.cardType} helperText={errors.cardType}>
                    <MenuItem value="visa">Visa</MenuItem>
                    <MenuItem value="mastercard">MasterCard</MenuItem>
                    <MenuItem value="amex">American Express</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="카드 번호"
                  name="cardNumber"
                  value={cardInfo.cardNumber}
                  onChange={handleCardInfoChange}
                  margin="normal"
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
                <TextField
                  fullWidth
                  label="유효 기간 (MM/YY)"
                  name="expiryDate"
                  value={cardInfo.expiryDate}
                  onChange={handleCardInfoChange}
                  margin="normal"
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                />
                <TextField
                  fullWidth
                  label="CVC"
                  name="cvc"
                  value={cardInfo.cvc}
                  onChange={handleCardInfoChange}
                  margin="normal"
                  error={!!errors.cvc}
                  helperText={errors.cvc}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box flex={1}>
          <OrderReceipt
            finalTotalPrice={finalTotalPrice}
            hasSelectedItems={selectedCartList.length > 0}
            cartList={selectedCartList}
            shippingInfo={shippingInfo} // shippingInfo를 props로 전달
            cardInfo={cardInfo} // cardInfo를 props로 전달
            sticky={true}
            errors={errors} // errors를 props로 전달
            setErrors={setErrors} // setErrors를 props로 전달
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentPage;
