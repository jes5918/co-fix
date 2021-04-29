import React, { useState } from 'react';
import { RangeStepInput } from 'react-range-step-input';
import Test from './Test';
import './EditorTest.css';
import TemplateSearch from './template/TemplateSearch';

function Mycomponents() {
  const [prop, setProp] = useState('red');
  const [text, setText] = useState('');
  const [link, setLink] = useState('/');
  const [temp, setTemp] = useState(false);
  const [imgSrc, setImgSrc] = useState(0);
  const [width, setWidth] = useState(100);
  // const [height, setHeight] = useState(100);

  const testImg = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOASdq0s38WCq-tlWe8D5V_APn2YF_UZlVB2ekSjMiP9uwKCdz2zrFH3bhBw3jQKYssGg&usqp=CAU',
    'https://t1.daumcdn.net/cfile/tistory/998A56455D6A2C3712',
  ];

  const propsData = `<a style='text-decoration: none; color: red;' href=${link}>도규니의 짜장면은?</a>
    <div onClick="let target = document.querySelector('#middle');target.style.color='blue';">온클릭</div>
    <div onClick="console.log('하이')">내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div id='euisu' style='background-color: ${prop};'>전의수</div>
    <div>내 자리 컴포넌트</div>
    <img style='width: ${width}px;' src=${testImg[imgSrc]} />
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div class="fonttest">으아아아아아아아아</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div id='middle'>명도균</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div id='last'>간짜장</div>`;

  const propsData2 = `<a style='text-decoration: none; color: red;' href=${link}>도규니의 짜장면은?</a>
    <div onClick="let target = document.querySelector('#middle');target.style.color='blue';">온클릭</div>
    <img style='width: ${width}px;' src=${testImg[imgSrc]} />
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div id='euisu' style='background-color: ${prop};'>전의수</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <div>내 자리 컴포넌트</div>
    <dogyun width='300' height='100' text='나는버튼' onfocus='dodo'></dogyun>
    <div>내 자리 컴포넌트</div>
    <div id='middle'>명도균</div>`;

  const buttonClickHandlerConsole = () => {
    setTemp(!temp);
    // var target = document.getElementById('testbox');
    // console.log(target.outerHTML);
    console.log(propsData2);
  };

  const buttonClickHandlerOne = () => {
    if (prop === 'blue') {
      setProp('black');
    } else {
      setProp('blue');
    }

    var target = document.getElementById('euisu');
    console.log(target.outerHTML);
  };

  const buttonClickHandlerTwo = () => {
    setProp('pink');
    var target = document.getElementById('euisu');
    console.log(target.outerHTML);
  };

  const buttonClickHandlerThree = () => {
    setProp('yellow');
    var target = document.getElementById('euisu');
    console.log(target.outerHTML);
  };

  const inputButtonClickHandler = () => {
    setLink(text);
    var target = document.getElementById('euisu');
    console.log(target.outerHTML);
  };

  const imageButtonClickHandler = () => {
    if (imgSrc === 0) {
      setImgSrc(1);
    } else {
      setImgSrc(0);
    }
  };
  const imgWidthHandler = (e) => {
    setWidth(e.target.value);
  };
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <div>
        <button onClick={buttonClickHandlerConsole}>콘솔 확인하기</button>
        <button onClick={buttonClickHandlerOne}>파랑으로 만들기</button>
        <button onClick={buttonClickHandlerTwo}>핑크로 만들기</button>
        <button onClick={buttonClickHandlerThree}>노랑으로 만들기</button>
        <input onChange={onChangeHandler}></input>
        <button onClick={inputButtonClickHandler}>a 링크 설정</button>
        <button onClick={imageButtonClickHandler}>이미지 토글</button>
      </div>
      <div>
        <RangeStepInput
          min={100}
          max={800}
          value={width}
          step={20}
          onChange={imgWidthHandler}
        />
        <p>{width}</p>
      </div>
      <div
        id="testbox"
        style={{
          border: '2px solid',
          width: '80%',
          height: '80vh',
          margin: 'auto 10%',
          top: '10%',
          left: '10%',
          overflow: 'scroll',
        }}
      >
        <Test propsData={temp ? propsData : propsData2} />
      </div>
    </>
  );
}

export default Mycomponents;
