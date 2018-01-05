import { Command } from "../Command";
import { Proposal } from "../../index";
export declare type _MainType = Proposal;
export declare class AddProposal extends Command<{
    data: _MainType;
}> {
    id: number;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): any;
}
