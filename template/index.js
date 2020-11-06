class <%= participantName %>Component extends HTMLElement {}
customElements.define('<%= participantNameLower %>-component', <%= participantName %>Component);

export default `<<%= participantNameLower %>-component></<%= participantNameLower %>-component>`;
