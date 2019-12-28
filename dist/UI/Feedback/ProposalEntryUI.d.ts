import { Column } from "react-vcomponents";
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
};
declare const ProposalEntryUI_base: any;
export declare class ProposalEntryUI extends ProposalEntryUI_base {
    innerRoot: Column;
    render(): any;
}
export {};
