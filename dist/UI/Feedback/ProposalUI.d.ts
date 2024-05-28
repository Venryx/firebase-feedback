import React from "react";
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal.js";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI.js";
export type ProposalUI_Props = {
    proposal: Proposal;
    subNavBarWidth?: number;
};
export declare class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): React.JSX.Element;
}
export declare class ProposalUI_Inner extends BaseComponent<{
    proposal: Proposal;
}, {
    editing: boolean;
    dataError: string;
}> {
    static initialState: {
        editing: boolean;
    };
    editorUI: ProposalDetailsUI;
    render(): React.JSX.Element;
}
