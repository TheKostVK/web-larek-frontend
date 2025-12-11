import { Form } from '../../base/form';
import { IOrderStep2SubmitHandler, IValidator } from '../../../types';

export class OrderStep2Form extends Form {
	private emailInput: HTMLInputElement | null = null;
	private phoneInput: HTMLInputElement | null = null;
	private submitHandler: IOrderStep2SubmitHandler;
	private emailValidator: IValidator;
	private phoneValidator: IValidator;

	constructor(
		form: HTMLFormElement,
		submitHandler: IOrderStep2SubmitHandler,
		emailValidator: IValidator,
		phoneValidator: IValidator,
	) {
		super(form);
		this.submitHandler = submitHandler;
		this.emailValidator = emailValidator;
		this.phoneValidator = phoneValidator;
		this.emailInput = this.form.querySelector<HTMLInputElement>('input[name="email"]');
		this.phoneInput = this.form.querySelector<HTMLInputElement>('input[name="phone"]');
		this.updateSubmitButton();
	}

	protected init(): void {
		super.init();
	}

	protected validate(): boolean {
		if (!this.emailValidator || !this.phoneValidator) {
			return false;
		}

		const email = this.emailInput?.value.trim() ?? '';
		const phone = this.phoneInput?.value.trim() ?? '';

		const emailValid = this.emailValidator.validate(email);
		const phoneValid = this.phoneValidator.validate(phone);

		return emailValid && phoneValid;
	}

	protected handleSubmit(): void {
		const email = this.emailInput?.value.trim() ?? '';
		const phone = this.phoneInput?.value.trim() ?? '';
		this.submitHandler.handleSubmit(email, phone);
	}
}
