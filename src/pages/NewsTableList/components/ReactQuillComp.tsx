import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ReactQuillComp.less';
import { useControllableValue } from 'ahooks';

const ReactQuillComp = (props: any) => {
  const [value, setValue] = useControllableValue<string>(props);

  useEffect(() => {
    if (props.value === undefined) {
      setValue('');
    } else {
      setValue(`${props.value}`);
    }
  }, [props?.value]);

  return (
    <ReactQuill theme="snow" value={value} onChange={setValue}>
      <div className="my-editing-area" />
    </ReactQuill>
  );
};

export default ReactQuillComp;
