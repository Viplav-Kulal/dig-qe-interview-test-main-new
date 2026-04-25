class DropdownPage {
  get elements() {
    return {
      header: () => $("h3"),
      dropdown: () => $("select#dropdown"),
      // :checked targets the currently selected option via DOM property, not HTML attribute
      selectedOption: () => $("select#dropdown option:checked"),
    };
  }

  async select(option) {
    const dropdown = await this.elements.dropdown();
    await dropdown.selectByVisibleText(option);
  }

  async selectedOptionText() {
    const selectedOption = await this.elements.selectedOption();
    return await selectedOption.getText();
  }
}

export default new DropdownPage();
