import { E, CE } from "js-vextensions";
import React from "react";
import { Button, Row } from "react-vcomponents";
import { BaseComponent } from "react-vextensions";
import { manager, OnPopulated } from "../../Manager";
import { SetProposalOrder } from "../../Server/Commands/SetProposalOrder";
import { ACTProposalSelect } from "../../Store/main/proposals";
import { GetRankingScoreToAddForUserRankingIndex } from "../Proposals";
import { MakeDraggable } from "../../Utils/UI/DNDHelpers";
import { DraggableInfo } from "../../Utils/UI/DNDStructures";
import ReactDOM from "react-dom";
let portal;
OnPopulated(() => {
    portal = document.createElement('div');
    document.body.appendChild(portal);
});
let connector = (state, { proposal }) => ({
    creator: proposal && manager.GetUser(proposal.creator),
});
OnPopulated(() => {
    ProposalEntryUI = manager.Connect(connector)(ProposalEntryUI);
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
export class ProposalEntryUI extends BaseComponent {
    render() {
        let { index, last, proposal, orderIndex, rankingScore, creator, columnType, style, dragInfo } = this.props;
        const asDragPreview = dragInfo && dragInfo.snapshot.isDragging;
        let result = (React.createElement("div", Object.assign({}, (dragInfo && dragInfo.provided.draggableProps), (dragInfo && dragInfo.provided.dragHandleProps)),
            React.createElement(Row, { ref: c => this.innerRoot = c, p: "7px 10px", style: E({ background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)" }, last && { borderRadius: "0 0 10px 10px" }, style) },
                React.createElement(manager.Link, { text: proposal.title, actions: [new ACTProposalSelect({ id: proposal._key })], style: ES({ fontSize: "15px", flex: 1 }) }),
                React.createElement("span", { style: { float: "right" } }, columnType == "userRanking"
                    ? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${CE(GetRankingScoreToAddForUserRankingIndex(orderIndex)).RoundTo_Str(.001, null, false)})`)
                    : (proposal.completedAt ? "✔️" : rankingScore ? CE(rankingScore).RoundTo_Str(.001, null, false) : "")),
                columnType == "userRanking" && !asDragPreview &&
                    React.createElement(Button, { text: "X", style: { margin: "-3px 0 -3px 5px", padding: "3px 5px" }, onClick: () => {
                            new SetProposalOrder({ proposalID: proposal._key, userID: manager.GetUserID(), index: -1 }).Run();
                        } }))));
        // if drag preview, we have to put in portal, since otherwise the "filter" effect of ancestors causes the {position:fixed} style to not be relative-to-page
        if (asDragPreview) {
            return ReactDOM.createPortal(result, portal);
        }
        return result;
    }
}
//# sourceMappingURL=ProposalEntryUI.js.map