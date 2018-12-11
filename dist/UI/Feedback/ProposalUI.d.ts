import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../Store/firebase/proposals/@Proposal";
import { ProposalDetailsUI } from "./Proposal/ProposalDetailsUI";
export declare type ProposalUI_Props = {
    proposal: Proposal;
    subNavBarWidth?: number;
} & Partial<{}>;
export declare class ProposalUI extends BaseComponent<ProposalUI_Props, {}> {
    static defaultProps: {
        subNavBarWidth: number;
    };
    render(): JSX.Element;
}
export declare type ProposalUI_Inner_Props = {
    proposal: Proposal;
} & Partial<{
    creator: User;
}>;
export declare let ProposalUI_Inner: typeof ProposalUI_Inner_NC;
export declare class ProposalUI_Inner_NC extends BaseComponent<ProposalUI_Inner_Props, {
    editing: boolean;
    dataError: string;
}> {
    editorUI: ProposalDetailsUI;
    render(): JSX.Element;
}
