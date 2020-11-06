import { LitElement, html, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { jorenStyles } from './styles.js';

class JorenComponent extends LitElement {
  static get styles() {
    return css`
      ${jorenStyles}
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
        reflect: true,
        attribute: 'my-title',
      },
      bool: {
        type: Boolean,
        reflect: true,
      },
      list: {
        attribute: false,
        hasChanged: (oldVal, newVal) => {
          return JSON.stringify(oldVal) !== JSON.stringify(newVal);
        },
      },
    };
  }

  constructor() {
    super();
    this.bool = true;
    this.title = 'Hello, World!';
    this.list = [
      { name: 'foo', index: 0 },
      { name: 'foo', index: 1 },
    ];
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <h2>${this.bool ? 'true' : 'false'}</h2>
      <ul>
        ${repeat(
          this.list,
          (item) => item.index,
          (item) => html`<li>${item.name}</li>`,
        )}
      </ul>
      <div class="card">
        <slot name="content"></slot>
      </div>
    `;
  }
}
customElements.define('joren-component', JorenComponent);

export default html`
  <joren-component .title=${'foo'}>
    <p slot="content">Bar</p>
  </joren-component>
`;
