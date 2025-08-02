import { LitElement, html, css } from 'lit';

export class MyComponent extends LitElement {
  static styles = css`
    .container {
      background: #fff;
      font-size: 16px;
      border-radius: 8px;
      padding: 16px;
      color: #222;
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>Lit Component from MCP Server</h2>
        <p>This uses design tokens from MCP server.</p>
      </div>
    `;
  }
}

customElements.define('my-component', MyComponent);
