import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
    rankingScore?: number;
    columnType: string;
} & Partial<{
    creator: User;
}>;
export declare class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
    newPos_midY: any;
    ShouldDropBefore(): boolean;
    render(): any;
    PostRender(): void;
}
