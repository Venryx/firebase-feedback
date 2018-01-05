import { BaseComponent } from "react-vextensions";
import { Proposal } from "../Store/firebase/feedback/@Proposal";
export declare const columnWidths: number[];
export declare type ProposalsUI_Props = {
    subNavBarWidth: number;
} & Partial<{
    proposals: Proposal[];
    selectedProposal: Proposal;
}>;
export declare class ProposalsUI extends BaseComponent<ProposalsUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
