import React from "react";
import { RootState } from "../../Store";
export declare function GetCurrentURL(): any;
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
declare const Link_base: any;
export declare class Link extends Link_base {
    static ValidateProps(props: Link_Props): void;
    handleClick(event: any): void;
    render(): JSX.Element;
}
export {};
