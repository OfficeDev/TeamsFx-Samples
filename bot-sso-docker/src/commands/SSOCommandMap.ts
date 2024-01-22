import { SSOCommand } from "./SSOCommand";
import { ShowUserProfile } from "./showUserProfile";


export const SSOCommands: SSOCommand[] = [
  new ShowUserProfile(),
];

export const SSOCommandMap: Map<string, SSOCommand> = new Map(
  SSOCommands.map((command) => [command.commandMessage, command])
);
