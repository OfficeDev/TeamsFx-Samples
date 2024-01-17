import React from "react";

import { Field, ProgressBar } from "@fluentui/react-components";

const intervalDelay = 100;
const intervalIncrement = 10;

export default function LoadingBar() {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setValue(value < 1500 ? intervalIncrement + value : 0);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <Field
      className="progress"
      validationMessage={`OK...generating the chart...`}
      validationState="none"
    >
      <ProgressBar max={1500} value={value} />
    </Field>
  );
}
