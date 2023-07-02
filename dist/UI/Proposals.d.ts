import React from "react";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal";
declare const ProposalsUI_base: (new (..._: any[]) => BaseComponent<{
    subNavBarWidth: number;
}, {}, object>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsUI extends ProposalsUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): React.JSX.Element;
    OnDragEnd: (result: any) => any;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
declare const ProposalsColumn_base: (new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
    type: string;
}, {}, object>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsColumn extends ProposalsColumn_base {
    render(): React.JSX.Element;
}
declare const ProposalsUserRankingColumn_base: (new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
}, {}, object>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsUserRankingColumn extends ProposalsUserRankingColumn_base {
    render(): React.JSX.Element;
}
export {};
