import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal";
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
export declare type ProposalsColumn_Props = {
    proposals: Proposal[];
    type: string;
} & Partial<{}>;
export declare class ProposalsColumn extends BaseComponent<ProposalsColumn_Props, {}> {
    render(): JSX.Element;
}
export declare type ProposalsUserRankingColumn_Props = {
    proposals: Proposal[];
} & Partial<{
    proposalOrder: number[];
}>;
export declare class ProposalsUserRankingColumn extends BaseComponent<ProposalsUserRankingColumn_Props, {}> {
    render(): any;
}
