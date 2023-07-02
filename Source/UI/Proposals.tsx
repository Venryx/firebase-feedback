import React from "react";
import {Button, CheckBox, Column, Row} from "react-vcomponents";
import {ApplyBasicStyles, BaseComponent, BaseComponentWithConnector, GetDOM, BaseComponentPlus} from "react-vextensions";
import {ScrollView} from "react-vscrollview";
import {manager, OnPopulated} from "../Manager";
import {SetProposalOrder} from "../Server/Commands/SetProposalOrder";
import {GetSelectedProposal} from "../Store/main/proposals";
import {GetProposalsOrder, GetProposals} from "../index";
import {Proposal} from "./../Store/firebase/proposals/@Proposal";
import {ShowAddProposalDialog} from "./Feedback/Proposal/ProposalDetailsUI";
import {ProposalEntryUI} from "./Feedback/ProposalEntryUI";
import {ProposalUI} from "./Feedback/ProposalUI";
import {Assert, ToJSON, FromJSON, CE} from "js-vextensions";
import {DragDropContext as DragDropContext_Beautiful, Droppable} from "react-beautiful-dnd";
import {DroppableInfo, DraggableInfo} from "../Utils/UI/DNDStructures";
import {store} from "../Store";
import {observer} from "mobx-react";
import {fire} from "../Utils/Database/Firelink";
import {GetDocs} from "mobx-firelink";
import {runInAction} from "mobx";
import {RunInAction} from "react-vmessagebox/Dist/General";

/*export class ProposalsUI_Outer extends BaseComponent<Props, {}> {
	render() {
		return <ProposalsUI
	}
}*/

@observer
export class ProposalsUI extends BaseComponent<{subNavBarWidth: number}, {}> {
	static defaultProps = {subNavBarWidth: 0};
	
	/*constructor(props) {
		super(props);
		Assert(wrapped, "ProposalsUI is being created before the class has been wrapped by Connect()!");
	}*/
	
	render() {
		let {subNavBarWidth} = this.props;
		const proposals = GetProposals();
		const selectedProposal = GetSelectedProposal();

		if (selectedProposal) {
			return <ProposalUI proposal={selectedProposal} subNavBarWidth={subNavBarWidth}/>;
		}
		
		if (proposals == null) {
			return <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "25px"}}>Loading proposals...</div>;
		}

		return (
			<DragDropContext_Beautiful onDragEnd={this.OnDragEnd}>
				<Row style={ES({marginTop: 10, height: "calc(100% - 10px)", flex: 1, padding: 10, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"})}>
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

			new SetProposalOrder({fire}, {proposalID: draggableInfo.proposalID, userID: manager.GetUserID(), index: targetIndex}).Run();
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

@observer
@ApplyBasicStyles
export class ProposalsColumn extends BaseComponent<{proposals: Proposal[], type: string}, {}> {
	render() {
		let {proposals, type} = this.props;
		let userID = manager.GetUserID();

		const userData = CE(GetDocs({fire: fire}, a=>a.userData)).ToMap(a=>a["_key"], a=>a);
		const showCompleted = store.main.proposals[`${type}s_showCompleted`];

		let shownProposals = proposals.filter(a=>a.type == type && (!a.completedAt || showCompleted));

		//let proposalsOrder = GetProposalsOrder(userID);
		//let proposalOrders = userData ? CE(userData).VValues().map(a=>CE(a.proposalIndexes || {}).VValues(true)) : [];
		let proposalsOrders_perUser = userData ? CE(userData).VValues().map(a=>a.proposalsOrder || []) : [];

		//let proposalsOrder_uncompleted = GetIncompleteProposalsInOrder(proposalsOrder, proposals);
		//let proposalOrders_uncompleted = proposalOrders.map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));
		/*let deletedProposalsInOrdering = proposalOrders.filter(id=>!proposals.find(a=>a._key == id));
		Assert(deletedProposalsInOrdering <= 1, "More than one proposal in your ordering has been deleted!");
		let proposalOrders_uncompleted = proposalOrders.Except(deletedProposalsInOrdering).map(order=>order.filter(id=>!proposals.find(a=>a._key == id).completedAt));*/
		let proposalsOrder_uncompleted_perUser = proposalsOrders_perUser.map(order=>GetIncompleteProposalsInOrder(order, proposals));

		let rankingScores = {};
		for (let proposal of shownProposals) {
			let rankingScore = 0;
			for (let proposalsOrder of proposalsOrder_uncompleted_perUser) {
				let indexInOrder = proposalsOrder.indexOf(proposal._key);
				if (indexInOrder == -1) continue;
				
				rankingScore += GetRankingScoreToAddForUserRankingIndex(indexInOrder);
			}

			// show completed proposals at the top
			if (proposal.completedAt) {
				rankingScore = proposal.completedAt;
			}

			rankingScores[proposal._key] = rankingScore;
		}

		shownProposals = CE(shownProposals).OrderByDescending(a=>rankingScores[a._key]) as Proposal[];

		// calc here, so mobx sees usage
		let proposalEntryUIs = shownProposals.map((proposal, index)=> {
			return <ProposalEntryUI key={index} index={index} last={index == shownProposals.length - 1}
				proposal={proposal} rankingScore={rankingScores[proposal._key]} columnType={type}/>;
		});

		const droppableInfo = new DroppableInfo({type: "ProposalsColumn", proposalType: type});
		return (
			<Column style={ES({flex: 1, height: "100%"})}>
				<Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
					<Row style={{position: "relative", height: 40, padding: 10}}>
						{/*<Pre>Show: </Pre>*/}
						<CheckBox ml={5} text="Show completed" value={showCompleted} onChange={val=>{
							RunInAction("ProposalsColumn.showCompleted.onChange", ()=>store.main.proposals[`${type}s_showCompleted`] = val);
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
						{proposalEntryUIs}
						{provided.placeholder}
					</ScrollView>
				)}</Droppable>
			</Column>
		);
	}
}

@observer
@ApplyBasicStyles
export class ProposalsUserRankingColumn extends BaseComponent<{proposals: Proposal[]}, {}> {
	render() {
		let {proposals} = this.props;
		const proposalOrder = GetProposalsOrder(manager.GetUserID());
		let user = manager.GetUser(manager.GetUserID());

		let proposalOrder_uncompleted = GetIncompleteProposalsInOrder(proposalOrder, proposals);

		proposals = CE(proposals.filter(a=>CE(proposalOrder).Contains(a._key))).OrderBy(a=>proposalOrder.indexOf(a._key));

		// calculate it here (outside of Droppable render-func), because otherwise mobx doesn't know we're watching this data
		let proposalUIs = proposals.map((proposal, index)=> {
			return <ProposalEntryUI key={index} index={index} orderIndex={proposalOrder_uncompleted.indexOf(proposal._key)}
				last={index == proposals.length - 1} proposal={proposal} columnType="userRanking"/>;
		});

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
						{proposalUIs}
						{provided.placeholder}
					</ScrollView>
				)}</Droppable>
			</Column>
		);
	}
}