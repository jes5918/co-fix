import { useSelector } from "react-redux";
import { RootState } from "../modules/store";

export default function useLoginUser() {
  const LoginUser = useSelector((state) => state.user);
  return LoginUser;
}
