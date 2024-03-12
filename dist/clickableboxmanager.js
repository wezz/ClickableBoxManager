var o = Object.defineProperty;
var s = (l, e, n) => e in l ? o(l, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[e] = n;
var c = (l, e, n) => (s(l, typeof e != "symbol" ? e + "" : e, n), n);
class u {
  // The parent element is optional, but it can be used to scope-down where we want to initiate the class.
  constructor(e = document) {
    // The local store of elements that have been initiated
    c(this, "controlelements", []);
    // This is the selector which will be used to find the elements to control
    c(this, "controlselector", "[data-clickable-box]");
    this.InitiateElements(e), window.addEventListener("global-markupchange", (n) => {
      var t;
      this.InitiateElements(((t = n == null ? void 0 : n.detail) == null ? void 0 : t.target) ?? document);
    });
  }
  InitiateElements(e = document) {
    const t = [].slice.call(
      e.querySelectorAll(this.controlselector)
    ).filter((i) => i.clickablebox !== "activated");
    t.forEach((i) => {
      this.InitiateElement(i);
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
    const i = n.map((r) => t.filter((a) => a.classList.contains(r))).filter((r) => r.length > 0);
    return i.length > 0 && i[0][0] ? i[0][0] : t[0];
  }
  AddLinkToBlock(e, n) {
    const t = document.createElement("div");
    t.setAttribute("data-clickable-box-link", "true"), t.setAttribute("aria-hidden", "true"), t.setAttribute("tab-index", "-1"), t.setAttribute("aria-label", n.innerText), t.innerHTML = `<span>${n.innerText}</span>`, t.addEventListener("click", () => {
      n.click();
    }), e.appendChild(t);
  }
}
export {
  u as default
};
