import { useSelector } from 'react-redux';

export default function useLoginUser() {
  const LoginUser = useSelector((state) => state.user);
  return LoginUser;
}
