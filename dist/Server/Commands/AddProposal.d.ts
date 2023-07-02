import { Proposal } from "../../index.js";
import { Command } from "mobx-firelink";
export type _MainType = Proposal;
export declare class AddProposal extends Command<{
    data: _MainType;
}, string> {
    id: string;
    Validate(): void;
    GetDBUpdates(): {
        [x: string]: Proposal;
    };
}
