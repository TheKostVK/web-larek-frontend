import { Form } from '../../base/form';
import { PaymentMethod, IOrderStep1SubmitHandler, IOrderStep1Form } from '../../../types';
import { SELECTORS, ATTRIBUTES } from '../../../utils/constants';

/**
 * Класс формы первого шага заказа (оплата и адрес)
 */
export class OrderStep1Form extends Form implements IOrderStep1Form {
	private selectedPayment: PaymentMethod | null = null;
	private addressInput: HTMLInputElement | null = null;
	private buttonsContainer: HTMLElement | null = null;
	private payButtons: HTMLButtonElement[] = [];
	private defaultPayment: PaymentMethod;
	private submitHandler: IOrderStep1SubmitHandler;
	private readonly ACTIVE_CLASS = SELECTORS.BUTTON.ALT_ACTIVE;

	/**
	 * Конструктор класса OrderStep1Form
	 * @param form {HTMLFormElement} - DOM-элемент формы
	 * @param defaultPayment {PaymentMethod} - способ оплаты по умолчанию
	 * @param submitHandler {IOrderStep1SubmitHandler} - обработчик отправки формы
	 */
	constructor(
		form: HTMLFormElement,
		defaultPayment: PaymentMethod,
		submitHandler: IOrderStep1SubmitHandler,
	) {
		super(form);
		this.defaultPayment = defaultPayment;
		this.submitHandler = submitHandler;
		this.addressInput = this.form.querySelector<HTMLInputElement>(`input[name="${ATTRIBUTES.NAME.ADDRESS}"]`);
		this.buttonsContainer = this.form.querySelector<HTMLElement>(SELECTORS.ORDER.BUTTONS);
		if (this.buttonsContainer) {
			this.payButtons = Array.from(this.buttonsContainer.querySelectorAll<HTMLButtonElement>(SELECTORS.BUTTON.BUTTON));
		}
		this.setupPaymentButtons();
		this.updateSubmitButton();
	}

	protected init(): void {
		super.init();
	}

	protected setupPaymentButtons(): void {
		if (!this.buttonsContainer || this.payButtons.length === 0) return;

		this.payButtons.forEach((btn) => {
			btn.addEventListener('click', () => {
				const name = btn.getAttribute('name');
				this.selectedPayment = name === ATTRIBUTES.NAME.CARD ? 'online' : 'offline';

				this.payButtons.forEach((b) => b.classList.toggle(this.ACTIVE_CLASS, b === btn));
				this.updateSubmitButton();
			});
		});
	}

	protected validate(): boolean {
		const address = this.addressInput?.value.trim() ?? '';
		const isAddressValid = address.length > 0;
		const isPaymentValid = this.selectedPayment !== null;

		return isAddressValid && isPaymentValid;
	}

	protected handleSubmit(): void {
		const address = this.addressInput?.value.trim() ?? '';
		const payment = this.selectedPayment ?? this.defaultPayment;
		this.submitHandler.handleSubmit(payment, address);
	}
}
