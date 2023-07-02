/// <reference types="react" />
import { BaseComponent } from "react-vextensions";
import { Proposal } from "./../../../Store/firebase/proposals/@Proposal.js";
export type _MainType = Proposal;
export type ProposalDetailsUI_Props = {
    baseData: _MainType;
    forNew: boolean;
    enabled?: boolean;
    style?: any;
    onChange?: (newData: _MainType, comp: ProposalDetailsUI) => void;
};
export declare class ProposalDetailsUI extends BaseComponent<ProposalDetailsUI_Props, {
    newData: _MainType;
}> {
    static defaultProps: {
        enabled: boolean;
    };
    ComponentWillMountOrReceiveProps(props: any, forMount: any): void;
    render(): JSX.Element;
    GetValidationError(): any;
    GetNewData(): Proposal;
}
export declare function ShowAddProposalDialog(userID: string, type: string): void;
