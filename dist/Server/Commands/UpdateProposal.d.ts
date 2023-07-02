import { Proposal } from "./../../Store/firebase/proposals/@Proposal.js";
import { Command } from "mobx-firelink";
type MainType = Proposal;
export declare class UpdateProposal extends Command<{
    id: string;
    updates: Partial<MainType>;
}> {
    oldData: MainType;
    newData: MainType;
    Validate(): void;
    GetDBUpdates(): {};
}
export {};
