export default class ClickableBoxManager {
  // The local store of elements that have been initiated
  private controlelements: HTMLElement[] = [];
  // This is the selector which will be used to find the elements to control
  private controlselector = "[data-clickable-box]";
  // The parent element is optional, but it can be used to scope-down where we want to initiate the class.
  constructor(parent = document) {
    this.InitiateElements(parent);
    // Add global event binding, see chapter below
    window.addEventListener("global-markupchange", (e) => {
      this.InitiateElements((e as any)?.detail?.target ?? document);
    });
  }

  public InitiateElements(parent = document) {
    const controlElements = [].slice.call(
      parent.querySelectorAll(this.controlselector)
    );
    // Ignore any elements which have already been initiated. This prevents duplicate initiations.
    const newElements = controlElements.filter((elm) => {
      return (elm as any)["clickablebox"] !== "activated";
    });
    // Run the initiation
    newElements.forEach((elm) => {
      this.InitiateElement(elm);
    });
    // Add the newly initiated elements into the local store of controlled elements
    this.controlelements = ([] as HTMLElement[]).concat(
      this.controlelements,
      newElements
    );
  }
  // Run the actual initiation
  public InitiateElement(elm: HTMLElement) {
    // If for some reason the element was already initiated, then ignore it.
    if ((elm as any)["clickablebox"] === "activated") {
      return; // Element has already been initiated
    }
    // Make sure no other instance of the class can double bind events to the element
    (elm as any)["clickablebox"] = "activated";
    const selectors = (
      elm.getAttribute("data-clickable-box") ||
      "cta-button__link primary btn-primary"
    ).split(" ");
    const primaryLink = this.GetPrimaryLink(elm, selectors);
    if (!primaryLink) {
      return;
    }
    this.AddLinkToBlock(elm, primaryLink);
    // Add any needed event bindings here
  }

  public GetPrimaryLink(elm: HTMLElement, primaryLinkClasses: string[] = []) {
    const links = Array.prototype.slice.call(elm.querySelectorAll("a"));
    if (links.length === 0) {
      return null;
    }
    if (links.length === 1) {
      return links[0];
    }

    const primaryLinks = primaryLinkClasses
      .map((selector) => links.filter((x) => x.classList.contains(selector)))
      .filter((x) => x.length > 0);
    if (primaryLinks.length > 0 && primaryLinks[0][0]) {
      return primaryLinks[0][0];
    }

    return links[0];
  }

  public AddLinkToBlock(elm: HTMLElement, primaryLink: HTMLLinkElement) {
    const clickableLink = document.createElement("a");
    const transferAttributes = ["href", "target", "rel"];
    transferAttributes.forEach((attr) => {
      if (!primaryLink.hasAttribute(attr)) {
        return;
      }
      clickableLink.setAttribute(attr, primaryLink.getAttribute(attr) ?? "");
    });
    clickableLink.setAttribute("data-clickable-box-link", "true");
    clickableLink.setAttribute("role", "presentation");
    clickableLink.setAttribute("title", primaryLink.innerText);
    clickableLink.setAttribute("aria-label", primaryLink.innerText);
    clickableLink.innerHTML = `<span>${primaryLink.innerText}</span>`;
    elm.appendChild(clickableLink);
  }
}
