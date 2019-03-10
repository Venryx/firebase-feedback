import { ProposalIndexSet } from "../../Store/firebase/userData";
import { Command } from "../Command";
export declare class SetProposalOrder extends Command<{
    proposalID: string;
    userID: string;
    index: number;
}> {
    newIndexes: ProposalIndexSet;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
