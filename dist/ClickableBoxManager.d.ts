export default class ClickableBoxManager {
    private controlelements;
    private controlselector;
    constructor(parent?: Document);
    InitiateElements(parent?: Document): void;
    InitiateElement(elm: HTMLElement): void;
    GetPrimaryLink(elm: HTMLElement, primaryLinkClasses?: string[]): any;
    AddLinkToBlock(elm: HTMLElement, primaryLink: HTMLLinkElement): void;
}
