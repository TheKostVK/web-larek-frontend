import ViewModal from '../../viewModal/viewModal';
import { IViewOrderModal } from '../../../types/components/order/view/viewOrderModal.interface';
import { cloneTemplate, ensureElement, isOrder } from '../../../utils/utils';
import { IOrder, OrderStep, PaymentMethod } from '../../../types/components/order/model/modelOrder.interface';
import { DEFAULT_ORDER_STEP, PAYMENT_METHODS, REG_EXP_EMAIL, REG_EXP_PHONE } from '../../../utils/constants';

class ViewOrderModal extends ViewModal<IOrder> implements IViewOrderModal {
	protected orderTemplate: HTMLTemplateElement | null = document.querySelector('#order');
	protected orderContactsTemplate: HTMLTemplateElement | null = document.querySelector('#contacts');
	protected orderSuccessTemplate: HTMLTemplateElement | null = document.querySelector('#success');
	protected orderErrorTemplate: HTMLTemplateElement | null = document.querySelector('#order-error');
	protected currentStep: OrderStep = DEFAULT_ORDER_STEP;

	protected setDataStep1: ((payment: PaymentMethod, address: string) => void) | null = null;
	protected setDataStep2: ((email: string, phone: string) => void) | null = null;
	protected setDataStep3: (() => void) | null = null;

	protected orderId: string | null = null;
	protected orderErrorMessage: string | null = null;
	protected step2SubmitButton: HTMLButtonElement | null = null;
	protected step2SubmitDefaultText = 'Оплатить';

	public constructor() {
		const modalContainer = ensureElement('#modal-container');
		super(modalContainer, {
			items: [],
			payment: PAYMENT_METHODS[0],
			email: '',
			phone: '',
			address: '',
			total: 0,
		});
	}

	public update(orderData: IOrder): void {
		if (!isOrder(orderData)) return;

		this.state = orderData;

		if (this.isMounted) {
			this.render();
		}
	}

	/**
	 * Установка шага извне
	 */
	public setStep(step: OrderStep): void {
		this.currentStep = step;
		if (this.isMounted) {
			this.render();
		}
	}

	/**
	 * Колбэк для шага 1 (выбор оплаты + адрес)
	 */
	public setDataStep1Callback(callback: (payment: PaymentMethod, address: string) => void): void {
		if (typeof callback !== 'function') return;
		this.setDataStep1 = callback;
	}

	/**
	 * Колбэк для шага 2 (email + phone)
	 */
	public setDataStep2Callback(callback: (email: string, phone: string) => void): void {
		if (typeof callback !== 'function') return;
		this.setDataStep2 = callback;
	}

	/**
	 * Колбэк для шага 3 (успешное завершение)
	 */
	public setDataStep3Callback(callback: () => void): void {
		if (typeof callback !== 'function') return;
		this.setDataStep3 = callback;
	}

	// Управление кнопкой шага 2
	public setStep2Loading(isLoading: boolean): void {
		const btn = this.step2SubmitButton;
		if (!btn) return;

		if (isLoading) {
			btn.disabled = true;
			btn.textContent = 'Создание заказа...';
		} else {
			btn.disabled = false;
			btn.textContent = this.step2SubmitDefaultText;
		}
	}

	// Сохранение результата заказа
	public setOrderResult(orderId: string, total: number): void {
		this.orderId = orderId;
		this.state.total = total;

		if (this.isMounted && this.currentStep === '3') {
			this.render();
		}
	}

	// Установка текста ошибки для шага 4
	public setOrderError(message: string): void {
		this.orderErrorMessage = message;

		if (this.isMounted && this.currentStep === '4') {
			this.render();
		}
	}

	/**
	 * Проверка email по регулярному выражению
	 */
	protected isEmailValid(value: string): boolean {
		const trimmed = value.trim();
		if (!trimmed) return false;

		REG_EXP_EMAIL.lastIndex = 0;
		return REG_EXP_EMAIL.test(trimmed);
	}

	/**
	 * Проверка телефона по регулярному выражению
	 */
	protected isPhoneValid(value: string): boolean {
		const trimmed = value.trim();
		if (!trimmed) return false;

		REG_EXP_PHONE.lastIndex = 0;
		return REG_EXP_PHONE.test(trimmed);
	}

	/**
	 * Инициализация слушателей для шага 1
	 */
	protected bindStep1(form: HTMLFormElement): void {
		const buttonsContainer = form.querySelector<HTMLElement>('.order__buttons');
		const addressInput = form.querySelector<HTMLInputElement>('input[name="address"]');
		const nextButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

		let selectedPayment: PaymentMethod | null = null;
		const ACTIVE_CLASS = 'button_alt-active';

		const updateNextButton = (): void => {
			const address = addressInput?.value.trim() ?? '';
			const isAddressValid = address.length > 0;
			const isPaymentValid = selectedPayment !== null;

			const isValid = isAddressValid && isPaymentValid;

			if (nextButton) {
				nextButton.disabled = !isValid;
			}
		};

		// выбор способа оплаты
		if (buttonsContainer) {
			const payButtons = Array.from(
				buttonsContainer.querySelectorAll<HTMLButtonElement>('button'),
			);

			payButtons.forEach((btn) => {
				btn.addEventListener('click', () => {
					const name = btn.getAttribute('name');
					selectedPayment = name === 'card' ? 'online' : 'offline';

					payButtons.forEach((b) => b.classList.toggle(ACTIVE_CLASS, b === btn));
					updateNextButton();
				});
			});
		}

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			const address = addressInput?.value.trim() ?? '';
			const payment = selectedPayment ?? this.state.payment;

			if (this.setDataStep1) {
				this.setDataStep1(payment, address);
			}
		});

		if (addressInput) {
			addressInput.addEventListener('input', () => {
				updateNextButton();
			});
		}

		updateNextButton();
	}

	/**
	 * Инициализация слушателей для шага 2
	 */
	protected bindStep2(form: HTMLFormElement): void {
		const emailInput = form.querySelector<HTMLInputElement>('input[name="email"]');
		const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]');
		const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

		this.step2SubmitButton = submitButton || null;
		if (submitButton && submitButton.textContent) {
			this.step2SubmitDefaultText = submitButton.textContent;
		}

		const updateSubmitButton = (): void => {
			const email = emailInput?.value.trim() ?? '';
			const phone = phoneInput?.value.trim() ?? '';

			const emailValid = this.isEmailValid(email);
			const phoneValid = this.isPhoneValid(phone);

			const isValid = emailValid && phoneValid;

			if (submitButton) {
				submitButton.disabled = !isValid;
			}
		};

		form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			const email = emailInput?.value.trim() ?? '';
			const phone = phoneInput?.value.trim() ?? '';

			if (this.setDataStep2) {
				this.setDataStep2(email, phone);
			}
		});

		if (emailInput) {
			emailInput.addEventListener('input', () => {
				updateSubmitButton();
			});
		}

		if (phoneInput) {
			phoneInput.addEventListener('input', () => {
				updateSubmitButton();
			});
		}

		updateSubmitButton();
	}

	/**
	 * Инициализация слушателей для шага 3
	 */
	protected bindStep3(root: HTMLElement): void {
		const closeButton = root.querySelector<HTMLButtonElement>('.order-success__close');

		if (closeButton) {
			closeButton.addEventListener('click', () => {
				if (this.setDataStep3) {
					this.setDataStep3();
				}

				if (this.onCloseModalCallback) {
					this.onCloseModalCallback();
				} else {
					this.closeModal();
				}
			});
		}
	}

	protected createModalContent(orderData: IOrder, step: OrderStep): HTMLElement {
		switch (step) {
			case '1': {
				if (!this.orderTemplate) {
					throw new Error('ViewOrderModal: шаблон заказа не найден');
				}

				const form = cloneTemplate<HTMLFormElement>(this.orderTemplate);

				if (!form) {
					throw new Error('ViewOrderModal: некорректный шаблон заказа');
				}

				this.bindStep1(form);

				return form;
			}
			case '2': {
				if (!this.orderContactsTemplate) {
					throw new Error('ViewOrderModal: шаблон контактов не найден');
				}

				const form = cloneTemplate<HTMLFormElement>(this.orderContactsTemplate);

				if (!form) {
					throw new Error('ViewOrderModal: некорректный шаблон контактов');
				}

				this.bindStep2(form);

				return form;
			}
			case '3': {
				if (!this.orderSuccessTemplate) {
					throw new Error('ViewOrderModal: шаблон успеха не найден');
				}

				const root = cloneTemplate<HTMLElement>(this.orderSuccessTemplate);
				const orderPrice = root.querySelector<HTMLElement>('.order-success__description');
				const orderIdEl = root.querySelector<HTMLElement>('.order-success__id');

				if (!root || !orderPrice) {
					throw new Error('ViewOrderModal: некорректный шаблон успеха');
				}

				orderPrice.innerText = `Списано ${ orderData.total } синапсов`;

				if (orderIdEl && this.orderId) {
					orderIdEl.innerText = `Номер заказа: ${ this.orderId }`;
				}

				this.bindStep3(root);

				return root;
			}
			case '4': {
				if (!this.orderErrorTemplate) {
					throw new Error('ViewOrderModal: шаблон ошибки заказа не найден');
				}

				const root = cloneTemplate<HTMLElement>(this.orderErrorTemplate);
				const desc = root.querySelector<HTMLElement>('.order-error__description');
				const closeBtn = root.querySelector<HTMLButtonElement>('.order-error__close');

				if (desc) {
					desc.innerText = this.orderErrorMessage || 'Не удалось оформить заказ. Попробуйте позже.';
				}

				if (closeBtn) {
					closeBtn.addEventListener('click', () => {
						if (this.onCloseModalCallback) {
							this.onCloseModalCallback();
						} else {
							this.closeModal();
						}
					});
				}

				return root;
			}
		}
	}

	public unmount(): void {
		this.isMounted = false;
		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);

		this.el.removeEventListener('click', this.clickEvent);
		document.body.removeEventListener('keydown', this.keyDownEvent);

		this.isEventListeners = false;

		modalContentHTML.innerHTML = '';
	}

	public render(): void {
		if (!this.el) {
			throw new Error('ViewOrderModal: корневой элемент не найден');
		}

		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);
		const modalContent: HTMLElement = this.createModalContent(this.state, this.currentStep);

		modalContentHTML.innerHTML = '';

		if (!this.isEventListeners) {
			this.el.addEventListener('click', this.clickEvent);
			document.body.addEventListener('keydown', this.keyDownEvent);

			this.isEventListeners = true;
		}

		modalContentHTML.appendChild(modalContent);
		this.isMounted = true;
	}
}

export default ViewOrderModal;