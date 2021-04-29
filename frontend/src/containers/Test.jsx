import React, { useState } from 'react';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import BasicButton from '../components/common/BasicButton';

function Test(propsData) {
  const [html, setHtml] = useState('');
  function transform(node, index) {
    console.log(index, node);
    if (node.type === 'tag' && node.name === 'dogyun') {
      const qqq1 = () => {
        if (node.attribs.onfocus === 'dodo') {
          console.log(`qqq1`, node.attribs);
        } else if (node.attribs.onfocus === 'dorosee') {
          console.log(`qqq2`);
        }
      };
      return (
        <BasicButton
          width={node.attribs.width}
          height={node.attribs.height}
          text={node.attribs.text}
          fontSize={50}
          onClickHandler={qqq1}
          key={index}
        >
          {processNodes(node.children, transform)}
        </BasicButton>
      );
    } else if (
      node.type === 'tag' &&
      node.name === 'div' &&
      node.attribs.class === 'fonttest'
    ) {
      node.attribs.style = 'color: red;';
      node.attribs.class = 'textup';
      return convertNodeToElement(node, index, transform);
    }
  }

  const _onReactHtmlParserClickHandler = () => {
    const reactHtmlParserNode = document.getElementById('reactHtmlParser');
    const htmlCode = reactHtmlParserNode.outerHTML;
    console.log(htmlCode);
    setHtml(htmlCode);
  };

  const _onParserDataToHtmlClickHandler = () => {
    const temp = new DOMParser().parseFromString(html, 'text/html').body
      .firstChild;
    console.log(temp);
    const resultNode = document.getElementById('result');
    resultNode.appendChild(temp);
  };

  return (
    <>
      <button
        style={{ border: '1px solid' }}
        onClick={_onReactHtmlParserClickHandler}
      >
        코드로보이기
      </button>
      <button
        style={{ border: '1px solid' }}
        onClick={_onParserDataToHtmlClickHandler}
      >
        다시반환하기
      </button>
      <div id="reactHtmlParser">
        {ReactHtmlParser(propsData.propsData, {
          decodeEntities: true,
          transform,
        })}
      </div>
      <div id="result"></div>
    </>
  );
}

export default Test;
