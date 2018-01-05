import React from "react";
import {BaseComponent, GetInnerComp} from "react-vextensions";
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

export const columnWidths = [.7, .2]; //, .1];

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
			<Column style={{flex: 1}}>
				{/*<ActionBar_Left subforum={subforum} subNavBarWidth={subNavBarWidth}/>
				<ActionBar_Right subforum={subforum} subNavBarWidth={subNavBarWidth}/>*/}
				<ScrollView ref="scrollView" scrollVBarStyle={{width: 10}} style={{flex: 1}}>
					<Column style={{width: 960, margin: "50px auto 20px auto", filter: "drop-shadow(rgb(0, 0, 0) 0px 0px 10px)"}}>
						<Column className="clickThrough" style={{height: 80, background: "rgba(0,0,0,.7)", borderRadius: "10px 10px 0 0"}}>
							<Row style={{height: 40, padding: 10}}>
								<span style={{position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 18}}>Proposals</span>
								<Button text="Add proposal" ml="auto" onClick={()=> {
									if (userID == null) return Manager.ShowSignInPopup();
									ShowAddProposalDialog(userID);
								}}/>
							</Row>
							<Row style={{height: 40, padding: 10}}>
								<span style={{flex: columnWidths[0], fontWeight: 500, fontSize: 17}}>Title</span>
								<span style={{flex: columnWidths[1], fontWeight: 500, fontSize: 17}}>Creator</span>
								{/*<span style={{flex: columnWidths[2], fontWeight: 500, fontSize: 17}}>Posts</span>*/}
							</Row>
						</Column>
						<Column>
							{proposals.length == 0 &&
								<Row p="7px 10px" style={{background: "rgba(30,30,30,.7)", borderRadius: "0 0 10px 10px"}}>
									There are currently no proposals.
								</Row>}
							{proposals.map((proposal, index)=> {
								return <ProposalEntryUI key={index} index={index} last={index == proposals.length - 1} proposal={proposal}/>;
							})}
						</Column>
					</Column>
				</ScrollView>
			</Column>
		);
	}
}