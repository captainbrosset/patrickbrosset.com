/*
<w3c-badge> web component.

  +------+----------+
  | W3C  |  HTML    |//
  | LOGO |  5.0   \\//
  +------+----------+

Installation:
  Add this to your HTML:
  <script type="module" src="https://patrickbrosset.com/assets/w3c-badge.js"></script>
  Or copy the script to your server.

Usage:
  <w3c-badge language="html" version="5"></w3c-badge>
  Use the language and version attributes to specify the two lines of text in the badge.

Styling:
  Override the following custom properties to change the badge appearance
  --width: badge width (default: 150px, MUST use an absolute unit)
  --background: badge background color (default: #ffcc66)
  --checkmark: checkmark color (default: #990000)
  --text: text color (default: #000)
*/

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      --width: 150px;
      --border: calc(var(--width) / 75);

      width: var(--width);
      aspect-ratio: 3;
      border: var(--border) solid #ccc;
      border-color: #ccc #4f4f4f #4f4f4f #ccc;
      display: inline-grid;
      grid-template-columns: 4fr 5fr;
      gap: calc(var(--width) / 30);
      place-items: center start;
      color: var(--text, #000);
      font-family: system-ui;
      font-weight: bold;
      font-size: calc(var(--width) / 8);
      line-height: 1;
      background-color: var(--background, #ffcc66);
      background-image: linear-gradient(to right, #0005 var(--border), transparent 0), linear-gradient(to bottom, #0005 var(--border), transparent 0);
      background-repeat: no-repeat;
      background-size: var(--border) 100%, 100% var(--border);
      background-position: 100% 0, 0 100%;
      position: relative;
    }

    :host::before {
      content: "";
      background-color: white;
      background-image: linear-gradient(to bottom, #0005 var(--border), transparent 0), url(https://www.w3.org/assets/logos/w3c/w3c-no-bars.svg);
      background-repeat: no-repeat;
      background-size: 100% var(--border), 90%;
      background-position: 0 100%, center;
      place-self: stretch;
    }

    :host::after {
      content: "✔";
      position: absolute;
      right: calc(-1 * var(--width) / 10);
      font-size: calc(var(--width) / 3.75);
      color: var(--checkmark, #990000);
    }
  </style>
  <span></span>
`;

customElements.define(
  "w3c-badge",
  class W3CBadge extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('span').innerHTML = `${this.getAttribute('language')}<br>${this.getAttribute('version')}`;
    }
  }
);
