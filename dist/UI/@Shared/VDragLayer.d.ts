import { BaseComponent } from "react-vextensions";
export declare type DragLayerProps = {
    currentOffset: {
        x: number;
        y: number;
    };
};
export declare class VDragLayer extends BaseComponent<{
    item?: any;
    itemType?: any;
    isDragging?: any;
    canDrop?: any;
} & Partial<DragLayerProps>, {}> {
    render(): JSX.Element;
}
