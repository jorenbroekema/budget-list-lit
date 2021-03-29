class <%= participantWithoutLastname %>CounterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello, <%= participantName %>!</h1>`;
  }
}

customElements.define('<%= participantNameLowerWithoutLastName %>-counter-component', <%= participantWithoutLastname %>CounterComponent);

export default `<<%= participantNameLowerWithoutLastName %>-counter-component></<%= participantNameLowerWithoutLastName %>-counter-component>`;