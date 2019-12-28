import React from "react";
declare type DraggableCompProps = {
    type: string;
    draggableInfo: DraggableInfo;
    index: number;
};
export declare type DropProvided = {
    innerRef: (element: HTMLElement) => any;
    placeholder?: React.ReactElement<any>;
    droppableProps: any;
};
export declare type DropSnapshot = {
    isDraggingOver: boolean;
    draggingOverWith?: string;
};
export declare type DropInfo = {
    provided: DropProvided;
    snapshot: DropSnapshot;
};
export declare type DragProvided = {
    draggableProps: any;
    dragHandleProps: any;
};
export declare type DragSnapshot = {
    isDragging: boolean;
};
export declare type DragInfo = {
    provided: DragProvided;
    snapshot: DragSnapshot;
};
declare type DraggableInfo = any;
export declare function MakeDraggable(getDraggableCompProps: (props: Object) => DraggableCompProps): (WrappedComponent: any) => any;
export {};
