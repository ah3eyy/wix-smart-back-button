import { initSmartBack } from '../../../../utils/initSmartBack';

class SmartBackButtonElement extends HTMLElement {
  private buttonElement: HTMLButtonElement | null = null;
  private static globalInitialized = false;

  static get observedAttributes() {
    return ['fallback-url', 'button-label', 'button-size', 'button-priority'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // Initialize navigation tracking globally once (when first widget is installed)
    if (!SmartBackButtonElement.globalInitialized) {
      initSmartBack();
      SmartBackButtonElement.globalInitialized = true;
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private goBack() {
    window.history.back();
  }

  private getButtonLabel(): string {
    const customLabel = this.getAttribute('button-label');
    if (customLabel) {
      return customLabel;
    }

    return 'Go Back';
  }

  private getButtonStyles() {
    const size = this.getAttribute('button-size') || 'medium';
    const priority = this.getAttribute('button-priority') || 'secondary';
    
    const sizeStyles: Record<string, string> = {
      small: 'padding: 6px 12px; font-size: 14px;',
      medium: 'padding: 8px 16px; font-size: 16px;',
      large: 'padding: 12px 24px; font-size: 18px;',
    };
    
    const priorityStyles: Record<string, string> = {
      primary: 'background-color: #007bff; color: white; border: 1px solid #007bff;',
      secondary: 'background-color: transparent; color: #007bff; border: 1px solid #007bff;',
      basic: 'background-color: transparent; color: #333; border: 1px solid #ccc;',
    };
    
    return `
      ${sizeStyles[size] || sizeStyles.medium}
      ${priorityStyles[priority] || priorityStyles.secondary}
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: inherit;
      transition: all 0.2s ease;
    `;
  }

  render() {

    const label = this.getButtonLabel();
    const styles = this.getButtonStyles();

    this.innerHTML = `
      <style>
        smart-back-button button {
          ${styles}
        }
        smart-back-button button:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }
        smart-back-button button:active {
          transform: translateY(0);
        }
        smart-back-button .back-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
        }
        smart-back-button .back-icon svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <button type="button" aria-label="Go back to previous page">
        <span class="back-icon">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>${this.escapeHtml(label)}</span>
      </button>
    `;

    // Attach click handler
    this.buttonElement = this.querySelector('button');
    if (this.buttonElement) {
      this.buttonElement.addEventListener('click', () => this.goBack());
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Register the custom element
if (typeof window !== 'undefined' && !customElements.get('smart-back-button')) {
  customElements.define('smart-back-button', SmartBackButtonElement);
}

export default SmartBackButtonElement;
