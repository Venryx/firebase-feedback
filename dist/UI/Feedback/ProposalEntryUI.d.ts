import { BaseComponent } from "react-vextensions";
import { Column } from "react-vcomponents";
import { Timer } from "js-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
    rankingScore?: number;
    columnType: string;
    asDragPreview?: boolean;
    style?;
} & Partial<{
    creator: User;
}>;
export declare class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
    ShouldDropBefore(): boolean;
    updateTimer: Timer;
    ComponentWillReceiveProps(props: any): void;
    innerRoot: Column;
    render(): any;
}
