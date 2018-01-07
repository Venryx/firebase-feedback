import React from "react";
import {BaseComponent, GetInnerComp, ApplyBasicStyles} from "react-vextensions";
import {Row, DropDownTrigger, DropDownContent} from "react-vcomponents";
import {Button} from "react-vcomponents";
import {DropDown} from "react-vcomponents";
import {Column} from "react-vcomponents";
import {ScrollView} from "react-vscrollview";
import {Spinner} from "react-vcomponents";
import {Connect} from "../Utils/Database/FirebaseConnect";
import {Proposal} from "../Store/firebase/feedback/@Proposal";
import {Manager} from "../Manager";
import {ProposalEntryUI} from "./Feedback/ProposalEntryUI";
import {ShowAddProposalDialog} from "./Feedback/Proposal/ProposalDetailsUI";
import {GetProposals} from "../Store/firebase/feedback";
import { GetSelectedProposal } from "../index";
import {ProposalUI} from "./Feedback/ProposalUI";

export type ProposalsUI_Props = {subNavBarWidth: number} & Partial<{proposals: Proposal[], selectedProposal: Proposal}>;
@Connect((state, {}: ProposalsUI_Props)=> {
	return {
		proposals: GetProposals(),
		selectedProposal: GetSelectedProposal(),
	};
})
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
			<Row style={{flex: 1, height: "100%", padding: 10, filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
				<ProposalsColumn proposals={proposals} type="feature"/>
				<ProposalsColumn proposals={proposals} type="issue" ml={10}/>
				<ProposalsUserRankingColumn proposals={proposals} ml={10}/>
			</Row>
		);
	}
}

export type ProposalsColumn_Props = {proposals: Proposal[], type: string} & Partial<{}>;
@Connect((state, {}: ProposalsColumn_Props)=> ({
}))
@ApplyBasicStyles
export class ProposalsColumn extends BaseComponent<ProposalsColumn_Props, {}> {
	render() {
		let {proposals, type} = this.props;
		let userID = Manager.GetUserID();

		proposals = proposals.filter(a=>a.type == type);

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
							return <ProposalEntryUI key={index} index={index} last={index == proposals.length - 1} proposal={proposal}/>;
						})}
					</Column>
				</ScrollView>
			</Column>
		);
	}
}

export type ProposalsUserRankingColumn_Props = {proposals: Proposal[]} & Partial<{}>;
@Connect((state, {}: ProposalsUserRankingColumn_Props)=> ({
}))
@ApplyBasicStyles
export class ProposalsUserRankingColumn extends BaseComponent<ProposalsUserRankingColumn_Props, {}> {
	render() {
		let {proposals} = this.props;
		let user = Manager.GetUser(Manager.GetUserID());

		proposals = []; // todo

		return (
			<Column style={{flex: 1, height: "100%"}}>
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}}>
					<Column className="clickThrough" style={{height: 40, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
						<Row style={{height: 40, padding: 10}}>
							<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>Your ranking</span>
						</Row>
					</Column>
					<Column>
						{proposals.length == 0 &&
							<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
								You have not yet added any proposals to your user-ranking.
							</Row>}
						{proposals.map((proposal, index)=> {
							return <ProposalEntryUI key={index} index={index} last={index == proposals.length - 1} proposal={proposal}/>;
						})}
					</Column>
				</ScrollView>
			</Column>
		);
	}
}