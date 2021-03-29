class VladCounterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello, Vlad!</h1>`;
  }
}

customElements.define('vlad-counter-component', VladCounterComponent);

export default `<vlad-counter-component></vlad-counter-component>`;