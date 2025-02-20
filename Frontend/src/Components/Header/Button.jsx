import React, { forwardRef, useImperativeHandle } from "react";

const ChildComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showAlertt: () => {
      alert("Hello from Child Component!");
      alert({ props });
    },
  }));

  return <h3>I'm the Child Component</h3>;
});

export default ChildComponent;
