import { settings } from '../../utils/constants';

export abstract class Form {
	protected form: HTMLFormElement;
	protected submitButton: HTMLButtonElement | null = null;
	protected inputElements: HTMLInputElement[] = [];

	constructor(form: HTMLFormElement) {
		this.form = form;
		this.init();
	}

	protected init(): void {
		this.submitButton = this.form.querySelector<HTMLButtonElement>(
			settings.validationSettings.submitButtonSelector,
		);
		this.inputElements = Array.from(
			this.form.querySelectorAll<HTMLInputElement>(settings.validationSettings.inputSelector),
		);

		this.setupEventListeners();
		this.updateSubmitButton();
	}

	protected setupEventListeners(): void {
		this.form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.handleSubmit();
		});

		this.inputElements.forEach((input) => {
			input.addEventListener('input', () => {
				this.updateSubmitButton();
			});
		});
	}

	protected updateSubmitButton(): void {
		const isValid = this.validate();
		if (this.submitButton) {
			this.submitButton.disabled = !isValid;
		}
	}

	public setSubmitButtonDisabled(disabled: boolean): void {
		if (this.submitButton) {
			this.submitButton.disabled = disabled;
		}
	}

	public getSubmitButton(): HTMLButtonElement | null {
		return this.submitButton;
	}

	public getForm(): HTMLFormElement {
		return this.form;
	}

	protected abstract validate(): boolean;

	protected abstract handleSubmit(): void;
}
