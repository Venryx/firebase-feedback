import { Column } from "react-vcomponents";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
import { DragInfo } from "../../Utils/UI/DNDHelpers";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
    orderIndex?: number;
    rankingScore?: number;
    columnType: string;
    style?: any;
} & {
    dragInfo?: DragInfo;
} & Partial<{
    creator: User;
}>;
export declare class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
    innerRoot: Column;
    render(): any;
}
