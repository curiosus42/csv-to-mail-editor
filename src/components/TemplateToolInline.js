class TemplateToolInline {
  constructor({ api, config }) {
    this.api = api;
    this.readOnly = true;
    this.placeholders = config.placeholders;
    this.action = document.createElement("div");
    this.action.hidden = true;

    this.placeholders.forEach((pl) => {
      const option = document.createElement("button");
      option.innerHTML = `{${pl}}`;
      option.setAttribute(
        "class",
        "border rounded-xl text-orange-500 px-1 ml-2 mb-2 bg-slate-100"
      );
      option.value = pl;
      option.addEventListener("click", () => {
        this.placeholder = pl;
        this.insertNode.innerHTML = `{${pl}}`;
        this.action.hidden = true;
      });

      this.action.append(option);
    });
    this.placeholder = "empty";
    this.insertNode = document.createElement("span");
  }

  static get isInline() {
    return true;
  }

  surround(range) {
    // Insert new element
    range.insertNode(this.insertNode);
  }

  renderActions() {
    return this.action;
  }

  checkState(selection) {}

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.textContent = "P";
    this.button.innerHTML = this.button.innerHTML =
      '<svg fill="none"  viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>';

    this.button.onclick = () => (this.action.hidden = !this.action.hidden);

    return this.button;
  }
}

export default TemplateToolInline;
