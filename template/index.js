import { html, LitElement } from 'lit-element';

class <%= participantName %>Component extends LitElement {}
customElements.define('<%= participantNameLower %>-component', <%= participantName %>Component);

export default html`<<%= participantNameLower %>-component></<%= participantNameLower %>-component>`;
