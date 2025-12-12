import {
	IModelOrder,
	IOrder,
	IAppApi,
	IOrderStep1SubmitHandler,
	IOrderStep2SubmitHandler,
	IPostOrderResponse,
	IProduct,
	IValidator,
	IViewOrderModal,
	ISuccessMessageFactory,
	IOrderStep1FormFactory,
	IOrderStep2FormFactory,
	OrderStep,
} from '../../../types';
import { IEvents } from '../../base/events';
import {
	CART_EVENTS,
	DEFAULT_ORDER_STEP,
	ORDER_EVENTS,
	REG_EXP_EMAIL,
	REG_EXP_PHONE,
	SELECTORS,
	SYSTEM_EVENTS,
	SYSTEM_NAME_SPACE,
} from '../../../utils/constants';
import { cloneTemplate, isCart } from '../../../utils/utils';

class PresenterOrder {
	protected currentStep: OrderStep = DEFAULT_ORDER_STEP;
	protected orderId: string | null = null;
	protected orderErrorMessage: string | null = null;
	protected step2SubmitButton: HTMLButtonElement | null = null;
	protected step2SubmitDefaultText = 'Оплатить';

	protected orderTemplate: HTMLTemplateElement | null = document.querySelector(SELECTORS.IDS.ORDER);
	protected orderContactsTemplate: HTMLTemplateElement | null = document.querySelector(SELECTORS.IDS.CONTACTS);
	protected orderErrorTemplate: HTMLTemplateElement | null = document.querySelector(SELECTORS.IDS.ORDER_ERROR);

	constructor(
		private readonly model: IModelOrder,
		private readonly api: IAppApi,
		private readonly view: IViewOrderModal,
		private readonly events: IEvents,
		private readonly successMessageFactory: ISuccessMessageFactory,
		private readonly orderStep1FormFactory: IOrderStep1FormFactory,
		private readonly orderStep2FormFactory: IOrderStep2FormFactory,
	) {}

	public init(): void {
		this.view.setOnOpenModalCallback(this.openModal);
		this.view.setOnCloseModalCallback(this.closeModal);

		this.events.on(CART_EVENTS.CART_COMPLETE, (cartData: unknown) => {
			if (!isCart(cartData)) return;

			const items: string[] = cartData.items.map((item: IProduct) => item.id);

			this.model.setItems(items);
			this.model.setTotal(cartData.totalPrice);

			const orderData = this.model.getOrderData();
			this.goToStep(DEFAULT_ORDER_STEP, orderData);

			this.openModal();
		});
	}

	protected async submitOrder(): Promise<void> {
		const order: IOrder = this.model.getOrderData();
		this.updateStep2Loading(true);

		try {
			const response: IPostOrderResponse = await this.api.postOrder(order);
			const { id, total } = response;

			this.model.setTotal(total);
			this.orderId = id;

			const updatedOrder = this.model.getOrderData();
			this.goToStep('3', updatedOrder);

			this.events.emit(ORDER_EVENTS.ORDER_SUBMIT);
		} catch (error) {
			console.error('[ORDER] submitOrder error:', error);

			this.orderErrorMessage = error instanceof Error
				? error.message
				: 'Не удалось оформить заказ. Попробуйте позже.';
			const orderData = this.model.getOrderData();
			this.goToStep('4', orderData);
		} finally {
			this.updateStep2Loading(false);
		}
	}

	protected updateStep2Loading(isLoading: boolean): void {
		if (this.currentStep !== '2' || !this.step2SubmitButton) {
			return;
		}

		if (isLoading) {
			this.step2SubmitButton.disabled = true;
			this.step2SubmitButton.textContent = 'Создание заказа...';
		} else {
			this.step2SubmitButton.disabled = false;
			this.step2SubmitButton.textContent = this.step2SubmitDefaultText;
		}
	}

	public openModal = (): void => {
		this.view.openModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_OPEN, { modalName: SYSTEM_NAME_SPACE.ORDER_MODAL });
	};

	public closeModal = (): void => {
		this.view.closeModal();
		this.currentStep = DEFAULT_ORDER_STEP;
		this.orderId = null;
		this.orderErrorMessage = null;
		this.events.emit(SYSTEM_EVENTS.MODAL_CLOSE, {
			modalName: SYSTEM_NAME_SPACE.ORDER_MODAL,
		});
	};

	protected goToStep(step: OrderStep, orderData?: IOrder): void {
		this.currentStep = step;
		const data = orderData || this.model.getOrderData();
		const content = this.createStepContent(step, data);

		this.view.update(data, content);
		this.events.emit(ORDER_EVENTS.ORDER_STEP, { step });
	}

	protected createStepContent(step: OrderStep, orderData: IOrder): HTMLElement {
		switch (step) {
			case '1':
				return this.createStep1Content(orderData);
			case '2':
				return this.createStep2Content(orderData);
			case '3':
				return this.createStep3Content(orderData);
			case '4':
				return this.createStep4Content();
			default:
				return document.createElement('div');
		}
	}

	protected createStep1Content(orderData: IOrder): HTMLElement {
		if (!this.orderTemplate) {
			throw new Error('PresenterOrder: шаблон заказа не найден');
		}

		const form = cloneTemplate<HTMLFormElement>(this.orderTemplate);

		if (!form) {
			throw new Error('PresenterOrder: некорректный шаблон заказа');
		}

		const submitHandler: IOrderStep1SubmitHandler = {
			handleSubmit: (payment, address) => {
				this.model.setPaymentMethod(payment);
				this.model.setAddress(address);

				const updatedOrder = this.model.getOrderData();
				this.goToStep('2', updatedOrder);
			},
		};

		this.orderStep1FormFactory.create(form, orderData.payment, submitHandler);

		return form;
	}

	protected createStep2Content(orderData: IOrder): HTMLElement {
		if (!this.orderContactsTemplate) {
			throw new Error('PresenterOrder: шаблон контактов не найден');
		}

		const form = cloneTemplate<HTMLFormElement>(this.orderContactsTemplate);

		if (!form) {
			throw new Error('PresenterOrder: некорректный шаблон контактов');
		}

		const submitHandler: IOrderStep2SubmitHandler = {
			handleSubmit: (email, phone) => {
				this.model.setEmail(email);
				this.model.setPhone(phone);

				const updatedOrder = this.model.getOrderData();
				this.view.update(updatedOrder);

				void this.submitOrder();
			},
		};

		const emailValidator: IValidator = {
			validate: (value: string) => {
				const trimmed = value.trim();
				if (!trimmed) return false;
				REG_EXP_EMAIL.lastIndex = 0;
				return REG_EXP_EMAIL.test(trimmed);
			},
		};

		const phoneValidator: IValidator = {
			validate: (value: string) => {
				const trimmed = value.trim();
				if (!trimmed) return false;
				REG_EXP_PHONE.lastIndex = 0;
				return REG_EXP_PHONE.test(trimmed);
			},
		};

		const formInstance = this.orderStep2FormFactory.create(form, submitHandler, emailValidator, phoneValidator);

		const submitButton = formInstance.getSubmitButton();
		this.step2SubmitButton = submitButton;
		if (submitButton && submitButton.textContent) {
			this.step2SubmitDefaultText = submitButton.textContent;
		}

		return form;
	}

	protected createStep3Content(orderData: IOrder): HTMLElement {
		const successMessage = this.successMessageFactory.create();

		if (this.orderId) {
			successMessage.setOrderData(this.orderId, orderData.total);
		}

		successMessage.setOnCloseCallback(() => {
			this.events.emit(ORDER_EVENTS.ORDER_SUBMIT);

			this.model.clearData();
			this.orderId = null;

			const newOrderData = this.model.getOrderData();
			this.goToStep(DEFAULT_ORDER_STEP, newOrderData);
			this.closeModal();
		});

		return successMessage.getContainer();
	}

	protected createStep4Content(): HTMLElement {
		if (!this.orderErrorTemplate) {
			throw new Error('PresenterOrder: шаблон ошибки заказа не найден');
		}

		const root = cloneTemplate<HTMLElement>(this.orderErrorTemplate);
		const desc = root.querySelector<HTMLElement>(SELECTORS.ORDER_ERROR.DESCRIPTION);
		const closeBtn = root.querySelector<HTMLButtonElement>(SELECTORS.ORDER_ERROR.CLOSE);

		if (desc) {
			desc.textContent = this.orderErrorMessage || 'Не удалось оформить заказ. Попробуйте позже.';
		}

		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				this.closeModal();
			});
		}

		return root;
	}
}

export default PresenterOrder;