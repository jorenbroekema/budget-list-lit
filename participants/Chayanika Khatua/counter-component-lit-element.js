import { LitElement, html, css } from 'lit-element';

class Counter extends LitElement {
  static get styles() {
    return css`
      * {
        font-size: large;
      }
      .positive {
        color: green;
      }
      .negative {
        color: red;
      }
    `;
  }

  static get properties() {
    return {
      value: {
        reflect: true,
        type: Number,
      },
    }
  }

  constructor () {
    super();
    this.value = 0;
    console.log('constructor');
  }

  increment() {
    console.log('increment element')
    this.value++;
  }

  decrement() {
    console.log('decrement')
    this.value--;
  }

  render() {
    return html`
      <div>
        <p class=${this.value > 0 ? 'positive' : 'negative'}>${this.value}</p>
        <button id="incButton" @click="${this.increment}">+</button>
        <button id="decButton" @click="${this.decrement}">-</button>
      </div>
      <!-- <slot name="custom-message"> -->
  </slot>
    `;
  }
}

customElements.define('custom-counter', Counter);