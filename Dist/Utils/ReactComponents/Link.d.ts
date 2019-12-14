import { VURL } from "js-vextensions";
import React from "react";
import { BaseComponent } from "react-vextensions";
import { RootState } from "../../Store";
export declare function GetCurrentURL(): VURL;
export declare type ActionFunc<StoreType> = (store: StoreType) => void;
export declare type Link_Props = {
    onClick?: any;
    style?: any;
    text?: string;
    to?: string;
    target?: string;
    replace?: boolean;
    actionFunc?: ActionFunc<RootState>;
} & Omit<React.HTMLProps<HTMLAnchorElement>, "href">;
declare const Link_base: (new (..._: any[]) => BaseComponent<Link_Props, {}, unknown>) & {
    renderCount: number;
    lastRenderTime: number;
};
export declare class Link extends Link_base {
    static ValidateProps(props: Link_Props): void;
    handleClick(event: any): void;
    render(): JSX.Element;
}
export {};
