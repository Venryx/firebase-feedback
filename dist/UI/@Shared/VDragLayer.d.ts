import { BaseComponent } from "react-vextensions";
export declare type DragLayerProps = {
    currentOffset: {
        x: number;
        y: number;
    };
};
export declare class VDragLayer extends BaseComponent<{
    item?;
    itemType?;
    isDragging?;
    canDrop?;
} & Partial<DragLayerProps>, {}> {
    render(): JSX.Element;
}
