export interface ItemOption {
    readonly value: string;
    readonly label: string;
}
export declare const sennenskiyUezd: readonly ItemOption[];
export declare const lepelskiyUezd: readonly ItemOption[];
export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ItemOption[];
}
export declare const groupedOptions: readonly GroupedOption[];
declare const FindMetrics: () => JSX.Element;
export default FindMetrics;
