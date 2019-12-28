/// <reference types="react" />
declare const ProposalsUI_base: any;
export declare class ProposalsUI extends ProposalsUI_base {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
    OnDragEnd: (result: any) => any;
}
export declare function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number): number;
declare const ProposalsColumn_base: any;
export declare class ProposalsColumn extends ProposalsColumn_base {
    render(): JSX.Element;
}
declare const ProposalsUserRankingColumn_base: any;
export declare class ProposalsUserRankingColumn extends ProposalsUserRankingColumn_base {
    render(): JSX.Element;
}
export {};
