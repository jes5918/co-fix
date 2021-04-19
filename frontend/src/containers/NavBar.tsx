import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

function NavBar(props: Props) {
  const {} = props;

  return (
    <>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/card">Card</Link>
        </li>
      </ul>
    </>
  );
}

export default NavBar;
