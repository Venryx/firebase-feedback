import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
import { Command } from "mobx-firelink";
declare type MainType = Proposal;
export declare class UpdateProposal extends Command<{
    id: string;
    updates: Partial<MainType>;
}> {
    Validate_Early(): void;
    oldData: MainType;
    newData: MainType;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
export {};
