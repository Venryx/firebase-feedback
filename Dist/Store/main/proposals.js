var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Action } from "../../Utils/General/Action";
import { GetProposal } from "../firebase/proposals";
import { observable } from "mobx";
import { store } from "..";
export class ACTProposalSelect extends Action {
}
export class Proposals {
}
__decorate([
    observable
], Proposals.prototype, "selectedProposalID", void 0);
__decorate([
    observable
], Proposals.prototype, "features_showCompleted", void 0);
__decorate([
    observable
], Proposals.prototype, "issues_showCompleted", void 0);
export function GetSelectedProposalID() {
    return store.main.proposals.selectedProposalID;
}
export function GetSelectedProposal() {
    let selectedID = GetSelectedProposalID();
    return GetProposal(selectedID);
}
//# sourceMappingURL=proposals.js.map