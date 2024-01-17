import "../styles/NoneData.css";

import { Image, Text } from "@fluentui/react-components";

export default function EmptyState() {
  return (
    <div className="none-data-state">
      <Image src="empty-state.svg" width={200} height={200} alt="empty" />
      <Text id="none-data-text">
        There is no chart yet. Input descriptions to create the chart
      </Text>
    </div>
  );
}
