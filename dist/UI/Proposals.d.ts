/// <reference types="react" />
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../Store/firebase/proposals/@Proposal";
declare const ProposalsUI_base: (new (..._: any[]) => BaseComponent<{
    subNavBarWidth: number;
}, {}, unknown>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsUI extends ProposalsUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
    OnDragEnd: (result: any) => any;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
declare const ProposalsColumn_base: (new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
    type: string;
}, {}, unknown>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsColumn extends ProposalsColumn_base {
    render(): JSX.Element;
}
declare const ProposalsUserRankingColumn_base: (new (..._: any[]) => BaseComponent<{
    proposals: Proposal[];
}, {}, unknown>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class ProposalsUserRankingColumn extends ProposalsUserRankingColumn_base {
    render(): JSX.Element;
}
export {};
