import { SetProposalOrder } from "./SetProposalOrder.js";
import { Command } from "mobx-firelink";
export declare class DeleteProposal extends Command<{
    id: string;
}> {
    sub_removalsFromUserOrderings: SetProposalOrder[];
    Validate(): void;
    GetDBUpdates(): {};
}
