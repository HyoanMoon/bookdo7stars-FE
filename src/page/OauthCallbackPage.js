import { useEffect } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { userActions } from '../action/userActions';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const OauthCallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { provider } = useParams();

  useEffect(() => {
    const handleSocialLoginCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      console.log('들어온 코드: ', code);
      console.log('들어온 상태: ', provider);

      if (code && provider === 'kakao') {
        dispatch(userActions.loginWithKakao(code, navigate));
      } else if (code && provider === 'github') {
        dispatch(userActions.loginWithGithub(code, navigate));
      }
    };
    handleSocialLoginCallback();
  }, [location.search, dispatch, provider]);
};
export default OauthCallbackPage;
