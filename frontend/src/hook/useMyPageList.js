import { useSelector } from 'react-redux';

export default function useMyPageList() {
  const mypagelist = useSelector((state) => state.mypagelist);
  return mypagelist;
}
