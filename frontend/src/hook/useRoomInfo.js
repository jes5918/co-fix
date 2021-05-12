import { useSelector } from 'react-redux';

export default function useRoomInfo() {
  const roomInfo = useSelector((state) => state.room);
  return roomInfo;
}
