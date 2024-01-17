import { createContext } from "react";

import { TeamsUserCredential } from "@microsoft/teamsfx";

export const TeamsFxContext = createContext<{
  themeString: string;
  credential?: TeamsUserCredential;
}>({
  themeString: "",
  credential: undefined,
});
