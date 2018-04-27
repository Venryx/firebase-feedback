import React from "react";
import {BaseComponent, GetDOM, GetInnerComp} from "react-vextensions";
import {Column, Button} from "react-vcomponents";
import {Row} from "react-vcomponents";
import {Connect} from "../../Utils/Database/FirebaseConnect";
import {Manager} from "../../Manager";
import {VURL, Timer} from "js-vextensions";
import {Proposal} from "./../../Store/firebase/proposals/@Proposal";
import {DragSource, DropTarget} from "react-dnd";
import SetProposalOrder from "../../Server/Commands/SetProposalOrder";
import {ACTProposalSelect} from "../../Store/main/proposals";
import { GetRankingScoreToAddForUserRankingIndex } from "../Proposals";

export type ProposalEntryUI_Props = {index: number, last: boolean, proposal: Proposal, orderIndex?: number, rankingScore?: number, columnType: string, asDragPreview?: boolean, style?}
	& Partial<{creator: User, /*posts: Post[]*/}>;

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
		if (columnType != "userRanking") return false;
		return true;
	},
	drop(props, monitor, dropTarget) {
		if (monitor.didDrop()) return;
		if (Manager.GetUserID() == null) return void Manager.ShowSignInPopup();

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
		isOver: monitor.isOver(), //({shallow: true}),
		draggedItem: monitor.getItem(),
	};
})

@Connect((state, {proposal})=> ({
	creator: proposal && Manager.GetUser(proposal.creator),
	//posts: proposal && GetProposalPosts(proposal),
}))
export class ProposalEntryUI extends BaseComponent<ProposalEntryUI_Props, {shouldDropBefore: boolean}> {
	//newPos_midY;
	ShouldDropBefore() {
		//var mousePos = monitor.getClientOffset().y;
		var dropTargetDOM = GetDOM(this.innerRoot);
		if (dropTargetDOM == null) return true;
		var newPos_midY = (dropTargetDOM.getBoundingClientRect().top + dropTargetDOM.getBoundingClientRect().bottom) / 2;
		//var {newPos_script_midY} = this.state;
		//var newPos_script_midY = this.newPos_midY;
		//if (newPos_midY == null) return true;

		// if over top-half of script, drop before
		//console.log(window["mousePos"].y + ";" + newPos_midY);
		return window["mousePos"] && window["mousePos"].y < newPos_midY;
	}
	updateTimer: Timer;
	ComponentWillReceiveProps(props) {
		// if hovering with item over our component, start auto-updating the ui (to match with place-above-or-below state)
		if (props.isOver) {
			this.updateTimer = new Timer(50, ()=> {
				if (this.mounted) this.Update();
				else if (this.updateTimer) this.updateTimer.Stop();
			});
			this.updateTimer.Start();
		} else {
			if (this.updateTimer) {
				this.updateTimer.Stop();
				this.updateTimer = null;
			}
		}
	}

	innerRoot: Column;
	render() {
		let {index, last, proposal, orderIndex, rankingScore, creator, columnType, asDragPreview, style} = this.props;
		let {connectDragSource, isDragging, connectDropTarget, isOver, draggedItem} = this.props as any; // lazy
		let {shouldDropBefore} = this.state;

		if (isDragging && columnType == "userRanking") return <div/>;
		let dragPreviewUI = columnType == "userRanking" && isOver && !asDragPreview &&
			<ProposalEntryUI proposal={draggedItem.proposal} orderIndex={orderIndex} index={index} last={false}
				columnType={columnType} style={{opacity: .3, borderRadius: 10}} asDragPreview={true}/>;

		let toURL = new VURL(null, ["proposals", proposal._id+""]);
		return connectDragSource(connectDropTarget(<div>
			{shouldDropBefore && dragPreviewUI}
			<Column ref={c=>this.innerRoot = c} p="7px 10px" style={E(
				{background: index % 2 == 0 ? "rgba(30,30,30,.7)" : "rgba(0,0,0,.7)"},
				last && {borderRadius: "0 0 10px 10px"},
				style,
			)}>
				<Row>
					<Manager.Link text={proposal.title} actions={d=>d(new ACTProposalSelect({id: proposal._id}))} style={{fontSize: "15px", flex: 1}}/>
					<span style={{float: "right"}}>
						{columnType == "userRanking"
							? "#" + (index + 1) + (proposal.completedAt ? " (✔️)" : ` (+${GetRankingScoreToAddForUserRankingIndex(orderIndex).RoundTo_Str(.001, null, false)})`)
							: (proposal.completedAt ? "✔️" : rankingScore ? rankingScore.RoundTo_Str(.001, null, false) : "")}
					</span>
					{columnType == "userRanking" && !asDragPreview &&
						<Button text="X" style={{margin: "-3px 0 -3px 5px", padding: "3px 5px"}} onClick={()=> {
							new SetProposalOrder({proposalID: proposal._id, index: -1}).Run();
						}}/>}
				</Row>
			</Column>
			{!shouldDropBefore && dragPreviewUI}
		</div>));
	}

	PostRender() {
		/*var dropTargetDOM = GetDOM(this);
		var newPos_midY = (dropTargetDOM.getBoundingClientRect().top + dropTargetDOM.getBoundingClientRect().bottom) / 2;
		//this.setState({newPos_script_midY: newPos_script_midY});
		this.newPos_midY = newPos_midY;*/
		this.SetState({shouldDropBefore: this.ShouldDropBefore()});
	}
}