import React from "react";
import {BaseComponent} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {Manager} from "../../Manager";
import {VURL} from "js-vextensions";
import {Link} from "../@Shared/Link";
import {Proposal} from "../../Store/firebase/feedback/@Proposal";
import {columnWidths} from "../Proposals";
import {ACTProposalSelect} from "../../Store/feedback";

export type ProposalEntryUI_Props = {index: number, last: boolean, proposal: Proposal} & Partial<{creator: User, /*posts: Post[]*/}>;
@Connect((state, {proposal})=> ({
	creator: proposal && Manager.GetUser(proposal.creator),
	//posts: proposal && GetProposalPosts(proposal),
}))
export class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
	render() {
		let {index, last, proposal, creator} = this.props;
		let toURL = new VURL(null, ["proposals", proposal._id+""]);
		return (
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					<Link text={proposal.title} actions={d=>d(new ACTProposalSelect({id: proposal._id}))} style={{fontSize: 17, flex: columnWidths[0]}}/>
					<span style={{flex: columnWidths[1]}}>{creator ? creator.displayName : "..."}</span>
					{/*<span style={{flex: columnWidths[2]}}>{posts ? posts.length : "..."}</span>*/}
				</Row>
			</Column>
		);
	}
}