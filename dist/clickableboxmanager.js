var o = Object.defineProperty;
var s = (i, e, n) => e in i ? o(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n;
var a = (i, e, n) => (s(i, typeof e != "symbol" ? e + "" : e, n), n);
class b {
  // The parent element is optional, but it can be used to scope-down where we want to initiate the class.
  constructor(e = document) {
    // The local store of elements that have been initiated
    a(this, "controlelements", []);
    // This is the selector which will be used to find the elements to control
    a(this, "controlselector", "[data-clickable-box]");
    this.InitiateElements(e), window.addEventListener("global-markupchange", (n) => {
      var t;
      this.InitiateElements(((t = n == null ? void 0 : n.detail) == null ? void 0 : t.target) ?? document);
    });
  }
  InitiateElements(e = document) {
    const t = [].slice.call(
      e.querySelectorAll(this.controlselector)
    ).filter((l) => l.clickablebox !== "activated");
    t.forEach((l) => {
      this.InitiateElement(l);
    }), this.controlelements = [].concat(
      this.controlelements,
      t
    );
  }
  // Run the actual initiation
  InitiateElement(e) {
    if (e.clickablebox === "activated")
      return;
    e.clickablebox = "activated";
    const n = (e.getAttribute("data-clickable-box") || "cta-button__link primary btn-primary").split(" "), t = this.GetPrimaryLink(e, n);
    t && this.AddLinkToBlock(e, t);
  }
  GetPrimaryLink(e, n = []) {
    const t = Array.prototype.slice.call(e.querySelectorAll("a"));
    if (t.length === 0)
      return null;
    if (t.length === 1)
      return t[0];
    const l = n.map((r) => t.filter((c) => c.classList.contains(r))).filter((r) => r.length > 0);
    return l.length > 0 && l[0][0] ? l[0][0] : t[0];
  }
  AddLinkToBlock(e, n) {
    const t = document.createElement("a");
    ["href", "target", "rel"].forEach((r) => {
      n.hasAttribute(r) && t.setAttribute(r, n.getAttribute(r) ?? "");
    }), t.setAttribute("data-clickable-box-link", "true"), t.setAttribute("role", "presentation"), t.setAttribute("title", n.innerText), t.setAttribute("aria-label", n.innerText), t.innerHTML = `<span>${n.innerText}</span>`, e.appendChild(t);
  }
}
export {
  b as default
};
