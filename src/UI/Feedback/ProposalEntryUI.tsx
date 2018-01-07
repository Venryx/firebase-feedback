import React from "react";
import {BaseComponent, FindDOM, GetInnerComp} from "react-vextensions";
import {Column} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {Manager} from "../../Manager";
import {VURL} from "js-vextensions";
import {Link} from "../@Shared/Link";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal";
import {DragSource, DropTarget} from "react-dnd";
import SetProposalOrder from "../../Server/Commands/SetProposalOrder";
import {ACTProposalSelect} from "../../Store/main";
import { GetRankingScoreToAddForUserRankingIndex } from "../Proposals";

export type ProposalEntryUI_Props = {index: number, last: boolean, proposal: Proposal, rankingScore?: number, columnType: string} & Partial<{creator: User, /*posts: Post[]*/}>;

@DragSource("proposal",
	{beginDrag: ({proposal, columnType})=>({proposal, columnType})},
	(connect, monitor)=>({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
@DropTarget("proposal", {
	canDrop(props, monitor) {
		let draggedEntry = monitor.getItem().proposal;
		let {proposal: dropOnEntry, columnType} = props;
		//if (!monitor.isOver({shallow: true})) return false;

		if (dropOnEntry == draggedEntry) return false; // if we're dragging item onto itself, reject
		//if (dropOnEntry.AncestorScripts.Contains(draggedScript)) return false; // if we're dragging an ancestor-script onto a descendent, reject
		if (dropOnEntry.type != columnType && columnType != "userRanking") return false;
		return true;
	},
	drop(props, monitor, dropTarget) {
		if (monitor.didDrop()) return;

		var draggedItem = monitor.getItem();
		var {proposal: dropOnProposal, columnType} = props;
	
		var dropBefore = GetInnerComp(dropTarget).ShouldDropBefore();
		let newIndex = dropBefore ? props.index : props.index + 1; 

		//if (draggedItem.columnType != "userRanking" && columnType == "userRanking") {
		new SetProposalOrder({proposalID: draggedItem.proposal._id, index: newIndex}).Run();
	}
},
(connect, monitor)=> {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver({shallow: true})
	};
})

@Connect((state, {proposal})=> ({
	creator: proposal && Manager.GetUser(proposal.creator),
	//posts: proposal && GetProposalPosts(proposal),
}))
export class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {}> {
	newPos_midY;
	ShouldDropBefore() {
		//var mousePos = monitor.getClientOffset().y;
		/*var dropTargetDOM = FindDOM_(this);
		var newPos_script_midY = dropTargetDOM.position_Vector2i().y + (dropTargetDOM.height() / 2);*/
		//var {newPos_script_midY} = this.state;
		var newPos_script_midY = this.newPos_midY;
		if (newPos_script_midY == null) return true;

		// if over top-half of script, drop before
		//Log(g.mousePos.y + ";" + newPos_script_midY);
		return window["mousePos"] && window["mousePos"].y < newPos_script_midY;
	}
	render() {
		let {index, last, proposal, rankingScore, creator, columnType} = this.props;
		var {connectDragSource, isDragging, connectDropTarget, isOver} = this.props as any; // lazy

		let toURL = new VURL(null, ["proposals", proposal._id+""]);
		return connectDragSource(connectDropTarget(<div>
			<Column p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"}
			)}>
				<Row>
					<Link text={proposal.title} actions={d=>d(new ACTProposalSelect({id: proposal._id}))} style={{fontSize: 15, flex: 1}}/>
					<span style={{float: "right"}}>
						{columnType == "userRanking"
							? `#${index + 1} (+${GetRankingScoreToAddForUserRankingIndex(index).RoundTo_Str(.001, null, false)})`
							: rankingScore.RoundTo_Str(.001, null, false)}
					</span>
				</Row>
			</Column>
		</div>));
	}

	PostRender() {
		var dropTargetDOM = FindDOM(this);
		var newPos_midY = (dropTargetDOM.getBoundingClientRect().top + dropTargetDOM.getBoundingClientRect().bottom) / 2;
		//this.setState({newPos_script_midY: newPos_script_midY});
		this.newPos_midY = newPos_midY;
	}
}