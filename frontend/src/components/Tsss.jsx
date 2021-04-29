import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const Card = styled(animated.div)`
  width: 200px;
  height: 200px;
  background: gray;
  border-radius: 5px;
  background-image: url('https://drscdn.500px.org/photo/435236/q%3D80_m%3D1500/v2?webp=true&sig=67031bdff6f582f3e027311e2074be452203ab637c0bd21d89128844becf8e40');
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
  border: 15px solid white;
`;

const calc = (x, y) => [-(y - 200 / 2) / 20, (x - 200 / 2) / 20, 1.1];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
export default function Tsss() {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <Card
      class="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    />
  );
}
