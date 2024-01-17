import "../styles/NoneData.css";

import { Image, Text } from "@fluentui/react-components";

export default function ErrorState() {
  return (
    <div className="none-data-state">
      <Image src="error-state.svg" width={200} height={200} alt="empty" />
      <Text id="none-data-text">
        The result could not be displayed. Please make sure your input is a
        valid one.
      </Text>
    </div>
  );
}
