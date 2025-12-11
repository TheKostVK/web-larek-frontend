import ViewModal from '../../viewModal/viewModal';
import { cloneTemplate, ensureElement, isOrder } from '../../../utils/utils';
import { DEFAULT_ORDER_STEP, PAYMENT_METHODS, REG_EXP_EMAIL, REG_EXP_PHONE } from '../../../utils/constants';
import {
	IOrder,
	IViewOrderModal,
	OrderStep,
	PaymentMethod,
	IOrderStep1SubmitHandler,
	IOrderStep2SubmitHandler,
	IValidator,
} from '../../../types';
import { OrderStep1Form, OrderStep2Form } from '../forms';

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
		const submitHandler: IOrderStep1SubmitHandler = {
			handleSubmit: (payment, address) => {
				if (this.setDataStep1) {
					this.setDataStep1(payment, address);
				}
			},
		};

		new OrderStep1Form(form, this.state.payment, submitHandler);
	}

	/**
	 * Инициализация слушателей для шага 2
	 */
	protected bindStep2(form: HTMLFormElement): void {
		const submitHandler: IOrderStep2SubmitHandler = {
			handleSubmit: (email, phone) => {
				if (this.setDataStep2) {
					this.setDataStep2(email, phone);
				}
			},
		};

		const emailValidator: IValidator = {
			validate: (value: string) => this.isEmailValid(value),
		};

		const phoneValidator: IValidator = {
			validate: (value: string) => this.isPhoneValid(value),
		};

		const formInstance = new OrderStep2Form(form, submitHandler, emailValidator, phoneValidator);

		const submitButton = formInstance.getSubmitButton();
		this.step2SubmitButton = submitButton;
		if (submitButton && submitButton.textContent) {
			this.step2SubmitDefaultText = submitButton.textContent;
		}
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

	public render(): void {
		const modalContent: HTMLElement = this.createModalContent(this.state, this.currentStep);
		this.renderContent(modalContent);
	}
}

export default ViewOrderModal;