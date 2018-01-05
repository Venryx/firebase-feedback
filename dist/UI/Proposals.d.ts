import { BaseComponent } from "react-vextensions";
import { Proposal } from "../Store/firebase/feedback/@Proposal";
export declare const columnWidths: number[];
export declare type ProposalsUI_Props = {} & Partial<{
    proposals: Proposal[];
}>;
export declare class SubforumUI extends BaseComponent<ProposalsUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
