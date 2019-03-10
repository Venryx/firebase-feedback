import React from "react";
import {DragLayer} from "react-dnd";
import {BaseComponent} from "react-vextensions";
import {ProposalEntryUI} from "../Feedback/ProposalEntryUI";
import {E} from "js-vextensions";

export type DragLayerProps = {currentOffset: {x: number, y: number}};

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
export class VDragLayer extends BaseComponent<{item?, itemType?, isDragging?, canDrop?} & Partial<DragLayerProps>, {}> {
	render() {
		//const {item, itemType, isDragging, monitor} = this.props;
		const {currentOffset, item, itemType, isDragging, canDrop} = this.props;
		if (!isDragging) return null;

		return (
			<div style={{position: "fixed", pointerEvents: "none", zIndex: 100, left: 0, top: 0, width: "100%", height: "100%"}}>
				<div style={E(
					{
						transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
						WebkitTransform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
					},
					!currentOffset && {display: "none"},
				)}>
					{itemType == "proposal" &&
						<div style={{width: "33%"}}>
							<ProposalEntryUI proposal={item.proposal} index={0} last={false} columnType={item.columnType} asDragPreview={true} style={{borderRadius: 10}}/>
						</div>}
				</div>
			</div>
		);
	}
}