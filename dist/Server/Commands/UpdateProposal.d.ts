import { Command } from "../Command";
import { Proposal } from "../../Store/firebase/feedback/@Proposal";
export declare type _MainType = Proposal;
export declare class UpdateProposal extends Command<{
    id: number;
    updates: Partial<_MainType>;
}> {
    Validate_Early(): void;
    oldData: _MainType;
    newData: _MainType;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {};
}
