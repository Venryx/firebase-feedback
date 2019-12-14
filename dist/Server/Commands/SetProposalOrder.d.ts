import { Command } from "mobx-firelink";
export declare class SetProposalOrder extends Command<{
    proposalID: string;
    userID: string;
    index: number;
}> {
    newOrder: string[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
