import {Timer, VURL, E} from "js-vextensions";
import React from "react";
import {Button, Column, Row} from "react-vcomponents";
import {BaseComponent, GetDOM, GetInnerComp} from "react-vextensions";
import {Manager, manager, OnPopulated} from "../../Manager";
import {SetProposalOrder} from "../../Server/Commands/SetProposalOrder";
import {ACTProposalSelect} from "../../Store/main/proposals";
import {GetRankingScoreToAddForUserRankingIndex} from "../Proposals";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal";
import {MakeDraggable, DragInfo} from "../../Utils/UI/DNDHelpers";
import {DraggableInfo} from "../../Utils/UI/DragAndDropInfo";
import ReactDOM from "react-dom";

let portal: HTMLElement;
OnPopulated(()=> {
	portal = document.createElement('div');
	document.body.appendChild(portal);
});

export type ProposalEntryUI_Props = {index: number, last: boolean, proposal: Proposal, orderIndex?: number, rankingScore?: number, columnType: string, style?} & {dragInfo?: DragInfo}
	& Partial<{creator: User, /*posts: Post[]*/}>;

let connector = (state, {proposal})=> ({
	creator: proposal && manager.GetUser(proposal.creator),
	//posts: proposal && GetProposalPosts(proposal),
});
OnPopulated(()=> {
	(ProposalEntryUI as any) = manager.Connect(connector)(ProposalEntryUI);
	(ProposalEntryUI as any) = MakeDraggable((props: ProposalEntryUI_Props)=>{
		const {columnType, proposal, index} = props;
		return {
			type: "Proposal",
			draggableInfo: new DraggableInfo({columnType, proposalID: proposal._id}),
			index,
		};
	})(ProposalEntryUI);
});

/*@MakeDraggable((props: ProposalEntryUI_Props)=>{
	const {proposal, index} = props;
	return {
		type: "Proposal",
		draggableInfo: new DraggableInfo({proposalID: proposal._id}),
		index,
	};
})*/
export class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
	innerRoot: Column;
	render() {
		let {index, last, proposal, orderIndex, rankingScore, creator, columnType, style, dragInfo} = this.props;
		const asDragPreview = dragInfo && dragInfo.snapshot.isDragging;

		let result = (
			<div {...(dragInfo && dragInfo.provided.draggableProps)} {...(dragInfo && dragInfo.provided.dragHandleProps)}>
				<Row ref={c=>this.innerRoot = c}
						p="7px 10px" style={E(
							{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
							last && {borderRadius: "0 0 10px 10px"},
							style,
						)}>
					<manager.Link text={proposal.title} actions={[new ACTProposalSelect({id: proposal._id})]} style={ES({fontSize: "15px", flex: 1})}/>
					<span style={{float: "right"}}>
						{columnType == "userRanking"
							? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${GetRankingScoreToAddForUserRankingIndex(orderIndex).RoundTo_Str(.001, null, false)})`)
							: (proposal.completedAt ? "✔️" : rankingScore ? rankingScore.RoundTo_Str(.001, null, false) : "")}
					</span>
					{columnType == "userRanking" && !asDragPreview &&
						<Button text="X" style={{margin: "-3px 0 -3px 5px", padding: "3px 5px"}} onClick={()=> {
							new SetProposalOrder({proposalID: proposal._id, userID: manager.GetUserID(), index: -1}).Run();
						}}/>}
				</Row>
			</div>
		);

		// if drag preview, we have to put in portal, since otherwise the "filter" effect of ancestors causes the {position:fixed} style to not be relative-to-page
		if (asDragPreview) {
    		return ReactDOM.createPortal(result, portal);
		}

		return result;
	}
}