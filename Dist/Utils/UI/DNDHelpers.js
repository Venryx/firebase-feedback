import { Draggable } from "react-beautiful-dnd";
import { GetDOM } from "react-vextensions";
import React from "react";
import { ToJSON } from "js-vextensions";
export function MakeDraggable(getDraggableCompProps) {
    return WrappedComponent => {
        class WrapperComponent extends React.Component {
            UNSAFE_componentWillMount() {
                this.UpdateDraggableCompProps(this.props);
            }
            UNSAFE_componentWillReceiveProps(props) {
                this.UpdateDraggableCompProps(props);
            }
            UpdateDraggableCompProps(props) {
                const { type, draggableInfo, index } = getDraggableCompProps(props);
                this.type = type;
                this.draggableInfo = draggableInfo;
                this.index = index;
            }
            render() {
                return (React.createElement(Draggable, { type: this.type, draggableId: ToJSON(this.draggableInfo), index: this.index }, (provided, snapshot) => {
                    const dragInfo = { provided, snapshot };
                    return React.createElement(WrappedComponent, Object.assign({}, this.props, { ref: c => provided.innerRef(GetDOM(c)), dragInfo: dragInfo }));
                }));
            }
        }
        WrapperComponent.WrappedComponent = WrappedComponent;
        WrapperComponent.displayName = WrappedComponent.displayName;
        return WrapperComponent;
    };
}
//# sourceMappingURL=DNDHelpers.js.map