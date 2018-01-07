import React from "react";
import {BaseComponent, GetInnerComp, ApplyBasicStyles} from "react-vextensions";
import {Row, DropDownTrigger, DropDownContent} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {DropDown} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Spinner} from "react-vcomponents";
import {Connect} from "../Utils/Database/FirebaseConnect";
import {Proposal} from "./../Store/firebase/proposals/@Proposal";
import {Manager} from "../Manager";
import {ProposalEntryUI} from "./Feedback/ProposalEntryUI";
import {ShowAddProposalDialog} from "./Feedback/Proposal/ProposalDetailsUI";
import {ProposalUI} from "./Feedback/ProposalUI";
import {GetSelectedProposal} from "../Store/main";
import {GetProposals} from "../Store/firebase/proposals";
import {DragDropContext, DropTarget} from "react-dnd";
//import HTML5Backend from "react-dnd-html5-backend";
//import TouchBackend from "react-dnd-touch-backend";
import MouseBackend from "react-dnd-mouse-backend";
import {VDragLayer} from "./@Shared/VDragLayer";
import SetProposalOrder from "../Server/Commands/SetProposalOrder";
import { GetProposalIndexes, GetProposalOrder } from "../index";
import {GetData} from "../Utils/Database/DatabaseHelpers";

// temp fix for "isOver({shallow: true})"
var DragDropMonitor = require("dnd-core/lib/DragDropMonitor").default;
DragDropMonitor.prototype.GetTargetComponents = function() {
    return this.getTargetIds().map(targetID=>this.registry.handlers[targetID].component);
};
/*var createTargetMonitor = require("react-dnd/lib/createTargetMonitor").default;
var TargetMonitor = createTargetMonitor({getMonitor: function() {}}).constructor;
TargetMonitor.prototype.GetTargetComponent = function() {
    return this.internalMonitor.registry.handlers[this.targetId].component;
};*/

export type ProposalsUI_Props = {subNavBarWidth: number} & Partial<{proposals: Proposal[], selectedProposal: Proposal}>;
@Connect((state, {}: ProposalsUI_Props)=> {
	return {
		proposals: GetProposals(),
		selectedProposal: GetSelectedProposal(),
	};
})
//@DragDropContext(HTML5Backend)
//@DragDropContext(TouchBackend({enableMouseEvents: true}))
@DragDropContext(MouseBackend)
export class ProposalsUI extends BaseComponent<ProposalsUI_Props, {}> {
	static defaultProps = {subNavBarWidth: 0};
	render() {
		let {proposals, subNavBarWidth, selectedProposal} = this.props;
		let userID = Manager.GetUserID();

		if (selectedProposal) {
			return <ProposalUI proposal={selectedProposal} subNavBarWidth={subNavBarWidth}/>;
		}
		
		if (proposals == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 25}}>Loading proposals...</div>;
		}

		return (
			<Row style={{marginTop: 10, flex: 1, height: "100%", padding: 10, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
				<ProposalsColumn proposals={proposals} type="feature"/>
				<ProposalsColumn proposals={proposals} type="issue" ml={10}/>
				<ProposalsUserRankingColumn proposals={proposals} ml={10}/>
				<VDragLayer/>
			</Row>
		);
	}
}

export function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number) {
	let rankingScoreToAdd = 1;
	for (var i = 0; i < indexInRankingOrder; i++) {
		rankingScoreToAdd *= .66;
	}
	return rankingScoreToAdd;
}

export type ProposalsColumn_Props = {proposals: Proposal[], type: string} & Partial<{userData}>;
@Connect((state, {}: ProposalsColumn_Props)=> ({
	userData: GetData("userData"),
}))
@ApplyBasicStyles
export class ProposalsColumn extends BaseComponent<ProposalsColumn_Props, {}> {
	render() {
		let {proposals, type, userData} = this.props;
		let userID = Manager.GetUserID();

		proposals = proposals.filter(a=>a.type == type);

		let proposalOrders = userData ? userData.VValues().map(a=>(a.proposalIndexes || {}).VValues(true)) : [];
		let rankingScores = {};
		for (let proposal of proposals) {
			let rankingScore = 0;
			for (let proposalOrder of proposalOrders) {
				let indexInOrder = proposalOrder.indexOf(proposal._id);
				if (indexInOrder == -1) continue;
				
				rankingScore += GetRankingScoreToAddForUserRankingIndex(indexInOrder);
			}
			rankingScores[proposal._id] = rankingScore;
		}

		proposals = proposals.OrderByDescending(a=>rankingScores[a._id]);

		return (
			<Column style={{flex: 1, height: "100%"}}>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}}>
					<Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
						<Row style={{height: 40, padding: 10}}>
							<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>
								{type.replace(/^(.)/, (m,s0)=>s0.toUpperCase())}s
							</span>
							<Button text={type == "feature" ? "Propose feature" : "Report issue"} ml="auto" onClick={()=> {
								if (userID == null) return Manager.ShowSignInPopup();
								ShowAddProposalDialog(userID, type);
							}}/>
						</Row>
					</Column>
					<Column>
						{proposals.length == 0 &&
							<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
								There are currently no {type == "feature" ? "feature proposals" : "issue reports"}.
							</Row>}
						{proposals.map((proposal, index)=> {
							return <ProposalEntryUI key={index} index={index} last={index == proposals.length - 1}
								proposal={proposal} rankingScore={rankingScores[proposal._id]} columnType={type}/>;
						})}
					</Column>
				</ScrollView>
			</Column>
		);
	}
}

export type ProposalsUserRankingColumn_Props = {proposals: Proposal[]} & Partial<{proposalOrder: number[]}>;
@Connect((state, {}: ProposalsUserRankingColumn_Props)=> ({
	proposalOrder: GetProposalOrder(Manager.GetUserID()),
}))
@DropTarget("proposal", {
	canDrop(props, monitor) {
		let draggedEntry = monitor.getItem().proposal;
		let {proposal: dropOnEntry, columnType} = props;
		//if (!monitor.isOver({shallow: true})) return false;

		//console.log("Can drop?");

		return true;
	},
	drop(props, monitor, dropTarget) {
		if (monitor.didDrop()) return;
		var draggedItem = monitor.getItem();
		new SetProposalOrder({proposalID: draggedItem.proposal._id, index: Number.MAX_SAFE_INTEGER}).Run();
	}
},
(connect, monitor)=> {
	//var dropTarget = monitor.GetTargetComponent();
	var targetComps = monitor.internalMonitor.GetTargetComponents();
	
	//let isOver_shallow = monitor.isOver({shallow: true});
	let IsProposalEntry = a=>a.props.index != null && !a.props.asDragPreview;
	let isOver_shallow = monitor.isOver() && !targetComps.Any(IsProposalEntry); // we're over this list shallowly, if not over any proposal-entries
	//console.log(ToJSON(targetComps.map(a=>a.props.index)));

	return {
		connectDropTarget: connect.dropTarget(),
		isOver: isOver_shallow,
		draggedItem: monitor.getItem(),
	};
})
@ApplyBasicStyles
export class ProposalsUserRankingColumn extends BaseComponent<ProposalsUserRankingColumn_Props, {}> {
	render() {
		let {proposals, proposalOrder,} = this.props;
		let {connectDropTarget, isOver, draggedItem} = this.props as any;
		let user = Manager.GetUser(Manager.GetUserID());

		proposals = proposals.filter(a=>proposalOrder.Contains(a._id)).OrderBy(a=>proposalOrder.indexOf(a._id));

		let dragPreviewUI = isOver &&
			<ProposalEntryUI proposal={draggedItem.proposal} index={0} last={true} columnType="userRanking" style={{opacity: .3, borderRadius: 10}} asDragPreview={true}/>;

		return connectDropTarget(<div style={{flex: 1, height: "100%"}}>
			<Column style={{flex: 1, height: "100%"}}>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}}>
					<Column className="clickThrough" style={{background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
						<Row style={{height: 40, padding: 10}}>
							<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>Your ranking</span>
						</Row>
						<div style={{padding: 10, paddingTop: 0, alignItems: "center", fontSize: 13, textAlign: "center"}}>
							Drag proposals onto this list to "vote" for them. Items at the top get the highest score increase.
						</div>
					</Column>
					<Column>
						{proposals.length == 0 && !dragPreviewUI &&
							<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
								You have not yet added any proposals to your ranking.
							</Row>}
						{proposals.map((proposal, index)=> {
							return <ProposalEntryUI key={index} index={index} last={index == proposals.length - 1} proposal={proposal} columnType="userRanking"/>;
						})}
						{dragPreviewUI}
					</Column>
				</ScrollView>
			</Column>
		</div>);
	}
}