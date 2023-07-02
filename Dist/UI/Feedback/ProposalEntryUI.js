var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { E, CE } from "js-vextensions";
import React from "react";
import { Button, Row } from "react-vcomponents";
import { BaseComponent } from "react-vextensions";
import { manager, OnPopulated } from "../../Manager.js";
import { SetProposalOrder } from "../../Server/Commands/SetProposalOrder.js";
import { GetRankingScoreToAddForUserRankingIndex } from "../Proposals.js";
import { MakeDraggable } from "../../Utils/UI/DNDHelpers.js";
import { DraggableInfo } from "../../Utils/UI/DNDStructures.js";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { fire } from "../../Utils/Database/Firelink.js";
import { Link } from "../../Utils/ReactComponents/Link.js";
let portal;
OnPopulated(() => {
    portal = document.createElement('div');
    document.body.appendChild(portal);
});
OnPopulated(() => {
    ProposalEntryUI = MakeDraggable((props) => {
        const { columnType, proposal, index } = props;
        return {
            type: "Proposal",
            draggableInfo: new DraggableInfo({ columnType, proposalID: proposal._key }),
            index,
        };
    })(ProposalEntryUI);
});
/*@MakeDraggable((props: ProposalEntryUI_Props)=>{
    const {proposal, index} = props;
    return {
        type: "Proposal",
        draggableInfo: new DraggableInfo({proposalID: proposal._key}),
        index,
    };
})*/
let ProposalEntryUI = class ProposalEntryUI extends BaseComponent {
    render() {
        let { index, last, proposal, orderIndex, rankingScore, columnType, style, dragInfo } = this.props;
        const creator = proposal && manager.GetUser(proposal.creator);
        //posts: proposal && GetProposalPosts(proposal),
        const asDragPreview = dragInfo && dragInfo.snapshot.isDragging;
        let result = (React.createElement("div", Object.assign({}, (dragInfo && dragInfo.provided.draggableProps), (dragInfo && dragInfo.provided.dragHandleProps)),
            React.createElement(Row, { ref: c => this.innerRoot = c, p: "7px 10px", style: E({ background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)" }, last && { borderRadius: "0 0 10px 10px" }, style) },
                React.createElement(Link, { text: proposal.title, actionFunc: s => s.main.proposals.selectedProposalID = proposal._key, style: ES({ fontSize: "15px", flex: 1 }) }),
                React.createElement("span", { style: { float: "right" } }, columnType == "userRanking"
                    ? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${CE(GetRankingScoreToAddForUserRankingIndex(orderIndex)).RoundTo_Str(.001, null, false)})`)
                    : (proposal.completedAt ? "✔️" : rankingScore ? CE(rankingScore).RoundTo_Str(.001, null, false) : "")),
                columnType == "userRanking" && !asDragPreview &&
                    React.createElement(Button, { text: "X", style: { margin: "-3px 0 -3px 5px", padding: "3px 5px" }, onClick: () => {
                            new SetProposalOrder({ fire }, { proposalID: proposal._key, userID: manager.GetUserID(), index: -1 }).Run();
                        } }))));
        // if drag preview, we have to put in portal, since otherwise the "filter" effect of ancestors causes the {position:fixed} style to not be relative-to-page
        if (asDragPreview) {
            return ReactDOM.createPortal(result, portal);
        }
        return result;
    }
};
ProposalEntryUI = __decorate([
    observer
], ProposalEntryUI);
export { ProposalEntryUI };
//# sourceMappingURL=ProposalEntryUI.js.map