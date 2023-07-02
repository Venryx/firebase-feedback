import React from "react";
type DraggableCompProps = {
    type: string;
    draggableInfo: DraggableInfo;
    index: number;
};
export type DropProvided = {
    innerRef: (element: HTMLElement) => any;
    placeholder?: React.ReactElement<any>;
    droppableProps: any;
};
export type DropSnapshot = {
    isDraggingOver: boolean;
    draggingOverWith?: string;
};
export type DropInfo = {
    provided: DropProvided;
    snapshot: DropSnapshot;
};
export type DragProvided = {
    draggableProps: any;
    dragHandleProps: any;
};
export type DragSnapshot = {
    isDragging: boolean;
};
export type DragInfo = {
    provided: DragProvided;
    snapshot: DragSnapshot;
};
type DraggableInfo = any;
export declare function MakeDraggable(getDraggableCompProps: (props: Object) => DraggableCompProps): (WrappedComponent: any) => any;
export {};
