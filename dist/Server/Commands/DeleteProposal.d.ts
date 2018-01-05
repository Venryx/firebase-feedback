import { Command } from "../Command";
export declare class DeleteProposal extends Command<{
    id: number;
}> {
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
