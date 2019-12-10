import { Proposal } from "../../index";
import { Command } from "mobx-firelink";
export declare type _MainType = Proposal;
export declare class AddProposal extends Command<{
    data: _MainType;
}, string> {
    id: string;
    Prepare(): Promise<void>;
    Validate(): Promise<void>;
    GetDBUpdates(): {
        [x: string]: Proposal;
    };
}
