import React from "react";
import {Button, CheckBox, Column, Row} from "react-vcomponents";
import {ApplyBasicStyles, BaseComponent, BaseComponentWithConnector, GetDOM} from "react-vextensions";
import {ScrollView} from "react-vscrollview";
import {State} from "../General";
import {manager, OnPopulated} from "../Manager";
import {SetProposalOrder} from "../Server/Commands/SetProposalOrder";
import {GetProposals} from "../Store/firebase/proposals";
import {GetSelectedProposal} from "../Store/main/proposals";
import {GetData} from "../Utils/Database/DatabaseHelpers";
import {ACTSet, GetProposalOrder} from "../index";
import {Proposal} from "./../Store/firebase/proposals/@Proposal";
import {ShowAddProposalDialog} from "./Feedback/Proposal/ProposalDetailsUI";
import {ProposalEntryUI} from "./Feedback/ProposalEntryUI";
import {ProposalUI} from "./Feedback/ProposalUI";
import {Assert, ToJSON, FromJSON} from "js-vextensions";
import {DragDropContext as DragDropContext_Beautiful, Droppable} from "react-beautiful-dnd";
import {DroppableInfo, DraggableInfo} from "../Utils/UI/DragAndDropInfo";

/*export class ProposalsUI_Outer extends BaseComponent<Props, {}> {
	render() {
		return <ProposalsUI
	}
}*/

type Props = {subNavBarWidth: number};
let ProposalsUI_connector = (state, {}: Props)=> {
	return {
		proposals: GetProposals(),
		selectedProposal: GetSelectedProposal(),
	};
};
let wrapped = false;
OnPopulated(()=> {
	(ProposalsUI as any) = manager.Connect(ProposalsUI_connector)(ProposalsUI)
	wrapped = true;
});
export class ProposalsUI extends BaseComponentWithConnector(ProposalsUI_connector, {}) {
	static defaultProps = {subNavBarWidth: 0};
	
	constructor(props) {
		super(props);
		Assert(wrapped, "ProposalsUI is being created before the class has been wrapped by Connect()!");
	}
	
	render() {
		let {proposals, subNavBarWidth, selectedProposal} = this.props;

		if (selectedProposal) {
			return <ProposalUI proposal={selectedProposal} subNavBarWidth={subNavBarWidth}/>;
		}
		
		if (proposals == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px"}}>Loading proposals...</div>;
		}

		return (
			<DragDropContext_Beautiful onDragEnd={this.OnDragEnd}>
				<Row style={ES({marginTop: 10, flex: 1, padding: 10, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"})}>
					<ProposalsColumn proposals={proposals} type="feature"/>
					<ProposalsColumn proposals={proposals} type="issue" ml={10}/>
					<ProposalsUserRankingColumn proposals={proposals} ml={10}/>
				</Row>
			</DragDropContext_Beautiful>
		);
	}
	OnDragEnd = result=>{
		const sourceDroppableInfo = FromJSON(result.source.droppableId) as DroppableInfo;
		const sourceIndex = result.source.index as number;
		const targetDroppableInfo = result.destination && FromJSON(result.destination.droppableId) as DroppableInfo;
		let targetIndex = result.destination && result.destination.index as number;
		const draggableInfo = FromJSON(result.draggableId) as DraggableInfo;

		if (targetDroppableInfo == null) {
		} else if (targetDroppableInfo.type == "ProposalsUserRankingColumn") {
			if (manager.GetUserID() == null) return void manager.ShowSignInPopup();
			
			// if we're moving an item to later in the same list, increment the target-index again (since react-beautiful-dnd pre-applies target-index adjustment, unlike the rest of our code that uses SetBookEventIndex/Array.Move())
			if (sourceDroppableInfo.type == targetDroppableInfo.type && sourceIndex < targetIndex) {
				targetIndex++;
			}

			new SetProposalOrder({proposalID: draggableInfo.proposalID, userID: manager.GetUserID(), index: targetIndex}).Run();
		}
	};
}

export function GetRankingScoreToAddForUserRankingIndex(indexInRankingOrder: number) {
	let rankingScoreToAdd = 1;
	for (var i = 0; i < indexInRankingOrder; i++) {
		rankingScoreToAdd *= .9;
	}
	return rankingScoreToAdd;
}

function GetIncompleteProposalsInOrder(order: string[], proposals: Proposal[]) {
	return order.filter(id=> {
		let proposalReferencedInOrder = proposals.find(a=>a._key == id);
		// for some reason, proposalReferencedInOrder is null for a just-deleted proposal
		return proposalReferencedInOrder && !proposalReferencedInOrder.completedAt;
	});
}

let ProposalsColumn_connector = (state, {type}: {proposals: Proposal[], type: string})=> ({
	userData: (GetData({collection: true}, "userData") || {}).Props().filter(a=>a.value != null).ToMap(a=>a.name, a=>a.value),
	showCompleted: State(`proposals/${type}s_showCompleted`),
});
OnPopulated(()=>(ProposalsColumn as any) = manager.Connect(ProposalsColumn_connector)(ProposalsColumn));
@ApplyBasicStyles
export class ProposalsColumn extends BaseComponentWithConnector(ProposalsColumn_connector, {}) {
	render() {
		let {proposals, type, userData, showCompleted} = this.props;
		let userID = manager.GetUserID();

		let shownProposals = proposals.filter(a=>a.type == type && (!a.completedAt || showCompleted));

		let proposalOrders = userData ? userData.VValues().map(a=>(a.proposalIndexes || {}).VValues(true)) : [];
		//let proposalOrders_uncompleted = proposalOrders.map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));
		/*let deletedProposalsInOrdering = proposalOrders.filter(id=>!proposals.find(a=>a._key == id));
		Assert(deletedProposalsInOrdering <= 1, "More than one proposal in your ordering has been deleted!");
		let proposalOrders_uncompleted = proposalOrders.Except(deletedProposalsInOrdering).map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));*/
		let proposalOrders_uncompleted = proposalOrders.map(order=>GetIncompleteProposalsInOrder(order, proposals));

		let rankingScores = {};
		for (let proposal of shownProposals) {
			let rankingScore = 0;
			for (let proposalOrder of proposalOrders_uncompleted) {
				let indexInOrder = proposalOrder.indexOf(proposal._key);
				if (indexInOrder == -1) continue;
				
				rankingScore += GetRankingScoreToAddForUserRankingIndex(indexInOrder);
			}

			// show completed proposals at the top
			if (proposal.completedAt) {
				rankingScore = proposal.completedAt;
			}

			rankingScores[proposal._key] = rankingScore;
		}

		shownProposals = shownProposals.OrderByDescending(a=>rankingScores[a._key]);

		const droppableInfo = new DroppableInfo({type: "ProposalsColumn", proposalType: type});
		return (
			<Column style={ES({flex: 1, height: "100%"})}>
				<Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
					<Row style={{position: "relative", height: 40, padding: 10}}>
						{/*<Pre>Show: </Pre>*/}
						<CheckBox ml={5} text="Show completed" checked={showCompleted} onChange={val=>{
							store.dispatch(new ACTSet(`proposals/${type}s_showCompleted`, val));
						}}/>
						<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "18px"}}>
							{type.replace(/^(.)/, (m,s0)=>s0.toUpperCase())}s
						</span>
						<Button text={type == "feature" ? "Propose feature" : "Report issue"} ml="auto" onClick={()=> {
							if (userID == null) return manager.ShowSignInPopup();
							ShowAddProposalDialog(userID, type);
						}}/>
					</Row>
				</Column>
				<Droppable type="Proposal" droppableId={ToJSON(droppableInfo)}>{(provided, snapshot)=>(
					<ScrollView ref={c=>provided.innerRef(GetDOM(c))} scrollVBarStyle={{width: 10}} style={ES({flex: 1})}>
						{shownProposals.length == 0 && provided.placeholder == null &&
							<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
								There are currently no {type == "feature" ? "feature proposals" : "issue reports"}.
							</Row>}
						{shownProposals.map((proposal, index)=> {
							return <ProposalEntryUI key={index} index={index} last={index == shownProposals.length - 1}
								proposal={proposal} rankingScore={rankingScores[proposal._key]} columnType={type}/>;
						})}
						{provided.placeholder}
					</ScrollView>
				)}</Droppable>
			</Column>
		);
	}
}

let ProposalsUserRankingColumn_connector = (state, {}: {proposals: Proposal[]})=> ({
	proposalOrder: GetProposalOrder(manager.GetUserID()),
});
OnPopulated(()=>(ProposalsUserRankingColumn as any) = manager.Connect(ProposalsUserRankingColumn_connector)(ProposalsUserRankingColumn));
@ApplyBasicStyles
export class ProposalsUserRankingColumn extends BaseComponentWithConnector(ProposalsUserRankingColumn_connector, {}) {
	render() {
		let {proposals, proposalOrder,} = this.props;
		let user = manager.GetUser(manager.GetUserID());

		let proposalOrder_uncompleted = GetIncompleteProposalsInOrder(proposalOrder, proposals);

		proposals = proposals.filter(a=>proposalOrder.Contains(a._key)).OrderBy(a=>proposalOrder.indexOf(a._key));

		const droppableInfo = new DroppableInfo({type: "ProposalsUserRankingColumn", userID: user ? user._key : null});
		return (
			<Column style={ES({flex: 1, height: "100%"})}>
				<Column className="clickThrough" style={{background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
					<Row style={{position: "relative", height: 40, padding: 10}}>
						<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "18px"}}>Your ranking</span>
					</Row>
					<div style={{padding: 10, paddingTop: 0, alignItems: "center", fontSize: "13px", textAlign: "center"}}>
						Drag proposals onto this list to "vote" for them. Items at the top get the highest score increase.
					</div>
				</Column>
				<Droppable type="Proposal" droppableId={ToJSON(droppableInfo)}>{(provided, snapshot)=>(
					<ScrollView ref={c=>provided.innerRef(GetDOM(c))} scrollVBarStyle={{width: 10}} style={ES({flex: 1})}>
						{proposals.length == 0 && provided.placeholder == null &&
							<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
								You have not yet added any proposals to your ranking.
							</Row>}
						{proposals.map((proposal, index)=> {
							return <ProposalEntryUI key={index} index={index} orderIndex={proposalOrder_uncompleted.indexOf(proposal._key)}
								last={index == proposals.length - 1} proposal={proposal} columnType="userRanking"/>;
						})}
						{provided.placeholder}
					</ScrollView>
				)}</Droppable>
			</Column>
		);
	}
}