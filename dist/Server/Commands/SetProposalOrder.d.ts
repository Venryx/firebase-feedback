import { ProposalIndexSet } from "../../Store/firebase/userData";
import { Command } from "../Command";
export default class SetProposalOrder extends Command<{
    proposalID: number;
    userID: string;
    index: number;
}> {
    newIndexes: ProposalIndexSet;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
