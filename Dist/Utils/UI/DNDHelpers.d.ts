import { DraggableInfo } from "./DNDStructures";
export declare type DragInfo = {
    provided: any;
    snapshot: any;
};
export declare function MakeDraggable(getDraggableCompProps: (props: Object) => {
    type: string;
    draggableInfo: DraggableInfo;
    index: number;
}): (WrappedComponent: any) => any;
