import { useSelector } from 'react-redux';

export default function useCommentData() {
  const comment = useSelector((state) => {
    return state.comment.data;
  });
  return comment;
}
