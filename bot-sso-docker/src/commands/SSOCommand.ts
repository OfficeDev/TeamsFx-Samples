import { TurnContext } from "botbuilder";

export interface SSOCommand {
  commandMessage: string;
  operationWithSSOToken(
    context: TurnContext, ssoToken: string
  ): Promise<any> | undefined;
}
