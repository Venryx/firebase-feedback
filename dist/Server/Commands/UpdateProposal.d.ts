import { Command } from "../Command";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
export declare type _MainType = Proposal;
export declare class UpdateProposal extends Command<{
    id: string;
    updates: Partial<_MainType>;
}> {
    Validate_Early(): void;
    oldData: _MainType;
    newData: _MainType;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
