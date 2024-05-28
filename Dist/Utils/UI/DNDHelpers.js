import { Draggable } from "@hello-pangea/dnd";
import { GetDOM, ShallowChanged } from "react-vextensions";
import { ToJSON } from "js-vextensions";
import React from "react";
export function MakeDraggable(getDraggableCompProps) {
    return WrappedComponent => {
        class WrapperComponent extends React.Component {
            constructor() {
                super(...arguments);
                Object.defineProperty(this, "compProps", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "firstDragInfoForCurrentData", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: {}
                });
            }
            UNSAFE_componentWillMount() {
                this.UpdateDraggableCompProps(this.props);
            }
            UNSAFE_componentWillReceiveProps(props) {
                this.UpdateDraggableCompProps(props);
            }
            /*type: string;
            draggableInfo: DraggableInfo;
            index: number;*/
            UpdateDraggableCompProps(props) {
                /*const {type, draggableInfo, index} = getDraggableCompProps(props);
                this.type = type;
                this.draggableInfo = draggableInfo;
                this.index = index;*/
                //this.compProps = E({enabled: true}, getDraggableCompProps(props));
                this.compProps = getDraggableCompProps(props);
                //this.firstDragInfoForCurrentData = {} as DragInfo; // not sure if this is needed
            }
            render() {
                //if (this.compProps == null || !this.compProps.enabled) {
                if (this.compProps == null) {
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, { dragInfo: null }));
                }
                const draggableID = ToJSON(this.compProps.draggableInfo);
                return (React.createElement(Draggable /*type={this.compProps.type}*/, { key: draggableID, draggableId: draggableID, index: this.compProps.index }, (provided, snapshot) => {
                    let dragInfo = { provided, snapshot };
                    // if drag-info data actually changed, store ref to first object with that data
                    if (ShallowChanged(dragInfo, this.firstDragInfoForCurrentData)) {
                        //if (ToJSON(dragInfo) != ToJSON(this.firstDragInfoForCurrentData)) {
                        this.firstDragInfoForCurrentData = dragInfo;
                    }
                    else {
                        // if drag-info *hasn't* changed data-wise, use the stable-ref object we stored (so we don't cause unneeded re-render)
                        dragInfo = this.firstDragInfoForCurrentData;
                    }
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, { ref: c => provided.innerRef(GetDOM(c)), dragInfo: dragInfo }));
                    // test
                    /*return (
                        <div ref={c=>provided.innerRef(c as any)}
                                {...(dragInfo && dragInfo.provided.draggableProps)}
                                {...(dragInfo && dragInfo.provided.dragHandleProps)}
                                style={E(
                                    {width: 350, background: HSLA(0, 0, 0, .5), whiteSpace: "normal"},
                                    dragInfo && dragInfo.provided.draggableProps.style,
                                )}>
                            {ToJSON(dragInfo).substr(0, 30)}
                        </div>
                    );*/
                }));
            }
        }
        Object.defineProperty(WrapperComponent, "WrappedComponent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: WrappedComponent
        });
        Object.defineProperty(WrapperComponent, "displayName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: WrappedComponent.displayName
        });
        return WrapperComponent;
    };
}
//# sourceMappingURL=DNDHelpers.js.map