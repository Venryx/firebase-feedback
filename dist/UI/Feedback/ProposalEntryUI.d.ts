import { Timer } from "js-vextensions";
import { Column } from "react-vcomponents";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
    orderIndex?: number;
    rankingScore?: number;
    columnType: string;
    asDragPreview?: boolean;
    style?;
} & Partial<{
    creator: User;
}>;
export declare let ProposalEntryUI: typeof ProposalEntryUI_NC;
export declare class ProposalEntryUI_NC extends BaseComponent<ProposalEntryUI_Props, {
    shouldDropBefore: boolean;
}> {
    ShouldDropBefore(): boolean;
    updateTimer: Timer;
    ComponentWillReceiveProps(props: any): void;
    innerRoot: Column;
    render(): any;
    PostRender(): void;
}
