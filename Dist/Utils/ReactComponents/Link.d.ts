import { VURL } from "js-vextensions";
import React from "react";
import { BaseComponent } from "react-vextensions";
import { Lib_RootState } from "../../Store/index.js";
export declare function GetCurrentURL(): VURL;
export type ActionFunc<StoreType> = (store: StoreType) => void;
export type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actionFunc?: ActionFunc<Lib_RootState>;
} & Omit<React.HTMLProps<HTMLAnchorElement>, "href">;
export declare class Link extends BaseComponent<Link_Props, {}> {
    static ValidateProps(props: Link_Props): void;
    handleClick(event: any): void;
    render(): React.JSX.Element;
}
