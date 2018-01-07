import React from "react";
import {DragLayer} from "react-dnd";
import {BaseComponent} from "react-vextensions";
import {ProposalEntryUI} from "../Feedback/ProposalEntryUI";

function getItemStyles(props) {
	const {currentOffset} = props;
	if (!currentOffset)
		return {display: "none"};

	const {x, y} = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform: transform,
		WebkitTransform: transform
	};
}

@DragLayer(monitor=>({
	item: monitor.getItem(),
	itemType: monitor.getItemType(),
	currentOffset: monitor.getSourceClientOffset(),
	isDragging: monitor.isDragging(),
	//canDrop: monitor.canDrop(),
	//canDrop: monitor.getItem() ? Log(monitor.getItem().piece.canDrop) !== false : null, // old; custom
	//monitor: monitor, // old; maybe temp
	canDrop: (()=> {
		const targetIds = monitor.isDragging() ? monitor.getTargetIds() : [];
	    return targetIds.some(a=>monitor.isOverTarget(a) && monitor.canDropOnTarget(a));
	})(),
}))
export class VDragLayer extends BaseComponent<{item?, itemType?, isDragging?, canDrop?}, {}> {
	render() {
		//const {item, itemType, isDragging, monitor} = this.props;
		const {item, itemType, isDragging, canDrop} = this.props;
		if (!isDragging) return null;

	    //var itemUI = itemType == "element" && <PieceDragPreview piece={item.piece} monitor={monitor}/>;
		/*var itemUI =
			itemType == "element" ? <ElementDragPreview element={item.element} canDrop={canDrop}/> :
			itemType == "script" ? <ScriptDragPreview script={item.script} canDrop={canDrop}/> :
			null;*/

		return (
			<div style={{position: "fixed", pointerEvents: "none", zIndex: 100, left: 0, top: 0, width: "100%", height: "100%"}}>
				<div style={E(getItemStyles(this.props))}>
					{itemType == "proposal" &&
						<div style={{width: "33%"}}>
							<ProposalEntryUI proposal={item.proposal} index={0} last={false} columnType={item.columnType} asDragPreview={true}/>
						</div>}
				</div>
			</div>
		);
	}
}