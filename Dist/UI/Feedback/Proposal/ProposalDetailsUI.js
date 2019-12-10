var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetErrorMessagesUnderElement, Clone, E } from "js-vextensions";
import React from "react";
import { Column, Pre, Row, RowLR, TextInput } from "react-vcomponents";
import { BaseComponent, GetDOM } from "react-vextensions";
import { MarkdownEditor, MarkdownToolbar } from "react-vmarkdown";
import { ShowMessageBox } from "react-vmessagebox";
import { manager } from "../../..";
import { AddProposal } from "../../../Server/Commands/AddProposal";
import { Proposal } from "./../../../Store/firebase/proposals/@Proposal";
import { store } from "../../../Store";
let aa = { MarkdownEditor };
let MTName = "Proposal";
export class ProposalDetailsUI extends BaseComponent {
    ComponentWillMountOrReceiveProps(props, forMount) {
        if (forMount || props.baseData != this.props.baseData) { // if base-data changed
            this.SetState({ newData: Clone(props.baseData) });
        }
    }
    render() {
        let { forNew, enabled, style, onChange, creator } = this.props;
        let { newData } = this.state;
        let Change = _ => {
            if (onChange)
                onChange(this.GetNewData(), this);
            this.Update();
        };
        let splitAt = 50, width = 600;
        return (React.createElement(Column, { style: style },
            React.createElement(RowLR, { splitAt: splitAt, style: { width } },
                React.createElement(Pre, null, "Title: "),
                React.createElement(TextInput, { required: true, enabled: enabled, style: { width: "100%" }, value: newData.title, onChange: val => Change(newData.title = val) })),
            React.createElement(Row, { mt: 5 }, "Text:"),
            React.createElement(Row, { mt: 5 },
                React.createElement(Column, { style: { width: "100%" } },
                    enabled &&
                        React.createElement(MarkdownToolbar, { editor: () => this.refs.editor },
                            React.createElement(manager.Link, { to: "https://guides.github.com/features/mastering-markdown", style: { marginLeft: 10 } }, "How to add links, images, etc.")),
                    React.createElement(aa.MarkdownEditor, { ref: "editor", toolbar: false, value: newData.text || "", onChange: val => Change(newData.text = val), options: E({
                            scrollbarStyle: "overlay",
                            lineWrapping: true,
                            readOnly: !enabled,
                            placeholder: "Write your reply..."
                        }) })))));
    }
    GetValidationError() {
        return GetErrorMessagesUnderElement(GetDOM(this))[0];
    }
    GetNewData() {
        let { newData } = this.state;
        return Clone(newData);
    }
}
ProposalDetailsUI.defaultProps = { enabled: true };
export function ShowAddProposalDialog(userID, type) {
    let newEntry = new Proposal({ type });
    let detailsUI;
    let error = null;
    let Change = (..._) => boxController.UpdateUI();
    let boxController = ShowMessageBox({
        title: type == "feature" ? "Propose feature" : "Report issue", cancelButton: true,
        message: () => {
            boxController.options.okButtonClickable = error == null;
            return (React.createElement(Column, { style: { width: 600 } },
                React.createElement(ProposalDetailsUI, { ref: c => detailsUI = c, baseData: newEntry, forNew: true, onChange: val => Change(newEntry = val, error = detailsUI.GetValidationError()) }),
                error && error != "Please fill out this field." && React.createElement(Row, { mt: 5, style: { color: "rgba(200,70,70,1)" } }, error)));
        },
        onOK: () => __awaiter(this, void 0, void 0, function* () {
            let id = yield new AddProposal({ data: newEntry }).Run();
            store.main.proposals.selectedProposalID = id;
        })
    });
}
//# sourceMappingURL=ProposalDetailsUI.js.map