/// <reference types="react" />
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI";
export declare type ProposalUI_Props = {
    proposal: Proposal;
    subNavBarWidth?: number;
};
export declare class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
declare const ProposalUI_Inner_base: any;
export declare class ProposalUI_Inner extends ProposalUI_Inner_base {
    editorUI: ProposalDetailsUI;
    render(): JSX.Element;
}
export {};
