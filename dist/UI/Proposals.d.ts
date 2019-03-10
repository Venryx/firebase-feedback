import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal";
declare type Props = {
    subNavBarWidth: number;
};
declare const ProposalsUI_base: new (..._: any[]) => BaseComponent<Props & Partial<{
    proposals: Proposal[];
    selectedProposal: Proposal;
}>, {}>;
export declare class ProposalsUI extends ProposalsUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    constructor(props: any);
    render(): JSX.Element;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
declare const ProposalsColumn_base: new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
    type: string;
} & Partial<{
    userData: any;
    showCompleted: any;
}>, {}>;
export declare class ProposalsColumn extends ProposalsColumn_base {
    render(): JSX.Element;
}
declare const ProposalsUserRankingColumn_base: new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
} & Partial<{
    proposalOrder: number[];
}>, {}>;
export declare class ProposalsUserRankingColumn extends ProposalsUserRankingColumn_base {
    render(): any;
}
export {};
