import React, { useRef } from 'react';
import { render } from 'react-dom';
import EmailEditor from 'react-email-editor';

interface Props {}

function Editor(props: Props) {
  const {} = props;

  const emailEditorRef = useRef(null);

  // const exportHtml = () => {
  //   emailEditorRef.current.editor.exportHtml((data) => {
  //     const { design, html } = data;
  //     console.log('exportHtml', html);
  //   });
  // };

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  return (
    <div>
      <div>
        <button>Export HTML</button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} minHeight={800} />
    </div>
  );
}

export default Editor;
