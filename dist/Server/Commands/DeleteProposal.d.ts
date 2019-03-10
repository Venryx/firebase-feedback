import { Command } from "../Command";
import { SetProposalOrder } from "./SetProposalOrder";
export declare class DeleteProposal extends Command<{
    id: string;
}> {
    sub_removalsFromUserOrderings: SetProposalOrder[];
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
