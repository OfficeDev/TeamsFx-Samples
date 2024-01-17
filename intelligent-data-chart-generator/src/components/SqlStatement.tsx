import "../styles/SqlStatement.css";
import "highlight.js/styles/default.css";

import hljs from "highlight.js/lib/core";
import sql from "highlight.js/lib/languages/sql";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Button,
} from "@fluentui/react-components";
import {
  Copy20Regular,
  DocumentChevronDouble20Regular,
} from "@fluentui/react-icons";

hljs.registerLanguage("sql", sql);

export default function SqlStatement(props: {
  sqlString: string;
  closed: boolean;
  setClosed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { sqlString, closed, setClosed } = props;

  const highlightedCode = hljs.highlight("sql", sqlString).value;

  const fallbackCopyTextToClipboard = (text: string) => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {}

    document.body.removeChild(textArea);
  };

  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setClosed(!closed);
  };

  return (
    <div className="sql-container">
      <Accordion
        collapsible
        defaultOpenItems={closed ? undefined : "sqlStatement"}
        onToggle={handleToggle}
      >
        <AccordionItem value="sqlStatement">
          <AccordionHeader icon={<DocumentChevronDouble20Regular />}>
            SQL statement used
          </AccordionHeader>
          <AccordionPanel>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button
        id="copy"
        appearance="transparent"
        size="small"
        icon={<Copy20Regular />}
        onClick={() => fallbackCopyTextToClipboard(sqlString)}
      >
        Copy code
      </Button>
    </div>
  );
}
