import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal";
export declare type ProposalsUI_Props = {
    subNavBarWidth: number;
} & Partial<{
    proposals: Proposal[];
    selectedProposal: Proposal;
}>;
export declare let ProposalsUI: typeof ProposalsUI_NC;
export declare class ProposalsUI_NC extends BaseComponent<ProposalsUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
export declare type ProposalsColumn_Props = {
    proposals: Proposal[];
    type: string;
} & Partial<{
    userData;
    showCompleted: boolean;
}>;
export declare let ProposalsColumn: typeof ProposalsColumn_NC;
export declare class ProposalsColumn_NC extends BaseComponent<ProposalsColumn_Props, {}> {
    render(): JSX.Element;
}
export declare type ProposalsUserRankingColumn_Props = {
    proposals: Proposal[];
} & Partial<{
    proposalOrder: number[];
}>;
export declare let ProposalsUserRankingColumn: typeof ProposalsUserRankingColumn_NC;
export declare class ProposalsUserRankingColumn_NC extends BaseComponent<ProposalsUserRankingColumn_Props, {}> {
    render(): any;
}
