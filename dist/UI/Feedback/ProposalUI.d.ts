import { BaseComponent } from "react-vextensions";
import { Proposal } from "../../Store/firebase/feedback/@Proposal";
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
