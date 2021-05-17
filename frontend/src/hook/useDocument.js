import { useSelector } from 'react-redux';

export default function useDocument() {
  const document = useSelector((state) => {
    return state.document;
  });
  return document;
}
