import React from "react";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal.js";
export declare class ProposalsUI extends BaseComponent<{
    subNavBarWidth: number;
}, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): React.JSX.Element;
    OnDragEnd: (result: any) => any;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
export declare class ProposalsColumn extends BaseComponent<{
    proposals: Proposal[];
    type: string;
}, {}> {
    render(): React.JSX.Element;
}
export declare class ProposalsUserRankingColumn extends BaseComponent<{
    proposals: Proposal[];
}, {}> {
    render(): React.JSX.Element;
}
