class InputsPage {
  get elements() {
    return {
      header: () => $("h3"),
      // Use a semantic CSS selector instead of a fragile absolute XPath
      input: () => $("input[type='number']"),
    };
  }

  async set(value) {
    await (await this.elements.input()).setValue(value);
  }
}

export default new InputsPage();
