import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
import { Command } from "mobx-firelink";
declare type MainType = Proposal;
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
