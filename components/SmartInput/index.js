import React, { memo, useCallback, useRef } from "react";
import AppLazyInput from "./lazy";
export default memo(
  (props, { cnt = 0 }) => {
    let lazyInput = useRef();
    const onChange = useCallback(event => {
      let cnt = event.target.value
      let realCnt = isNaN(cnt) ? 0 : cnt
      if (realCnt.toString() !== event.target.value) {
        lazyInput(realCnt.toString());
      }
      props.onChange(realCnt);
    });
    const refFunc = useCallback(c => (lazyInput = c));
    return (
      <AppLazyInput
        className={props.className}
        label={props.label}
        value={cnt.toString()}
        onChange={onChange}
        forwardRef={refFunc}
        idInput={props.id}
      />
    );
  },
  (prevProps, nextProps) => (prevProps.id === nextProps.id ? true : false)
);
