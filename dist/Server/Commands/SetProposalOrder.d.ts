import { Command } from "../Command";
import { ProposalIndexSet } from "../../Store/firebase/userData";
export default class SetProposalOrder extends Command<{
    proposalID: number;
    index: number;
}> {
    newIndexes: ProposalIndexSet;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
