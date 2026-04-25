class CheckboxesPage {
  get elements() {
    return {
      header: () => $("h3"),
      // Use nth-of-type so <br> elements between checkboxes don't throw off the count
      checkbox: (num) => $(`#checkboxes input:nth-of-type(${num})`),
    };
  }

  async select(num) {
    const checkbox = await this.elements.checkbox(num);
    // Only click if not already checked — clicking a checked box would uncheck it
    if (!(await checkbox.isSelected())) {
      await checkbox.click();
    }
  }
}

export default new CheckboxesPage();
