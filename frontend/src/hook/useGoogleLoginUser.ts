import { useSelector } from 'react-redux';
import { RootState } from '../modules/store';

export default function useGoogleLoginUser() {
  const googleLoginUser = useSelector((state: RootState) => state.user);
  console.log(googleLoginUser);
  return googleLoginUser;
}
