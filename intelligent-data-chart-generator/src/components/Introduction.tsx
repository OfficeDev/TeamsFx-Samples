import "../styles/Introduction.css";

import { Link, Text } from "@fluentui/react-components";

const AzureOpenAILink = () => (
  <Link onClick={() => window.open("https://aka.ms/azureopenai", "_blank")}>
    Azure OpenAI
  </Link>
);

const AzureDBLink = () => (
  <Link onClick={() => window.open("https://aka.ms/azuredb", "_blank")}>
    Azure DB
  </Link>
);

const ReadmeLink = () => (
  <Link
    onClick={() =>
      window.open(
        "https://github.com/OfficeDev/TeamsFx-Samples/blob/dev/intelligent-data-chart-generator/README.md",
        "_blank"
      )
    }
  >
    readme
  </Link>
);

export default function Introduction() {
  return (
    <div className="intro">
      <Text className="title">Intelligent Data Chart Generator</Text>
      <Text>
        Describe the data you want to view in charts and input in the box below.
        Press enter to see the AI-generated charts. You can start with the
        sample query first.
      </Text>
      <Text>
        This sample is powered by <AzureOpenAILink /> and by <AzureDBLink /> .
        Please query data within the scope of Azure DB. For more details, refer
        to <ReadmeLink />.
      </Text>
    </div>
  );
}
