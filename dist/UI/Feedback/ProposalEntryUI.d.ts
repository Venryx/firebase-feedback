import { BaseComponent } from "react-vextensions";
import { Proposal } from "../../Store/firebase/feedback/@Proposal";
export declare type ProposalEntryUI_Props = {
    index: number;
    last: boolean;
    proposal: Proposal;
} & Partial<{
    creator: User;
}>;
export declare class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
    render(): JSX.Element;
}
