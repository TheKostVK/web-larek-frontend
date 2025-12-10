import {
	IModelOrder,
	IOrder,
	PaymentMethod,
	OrderStep, IOrderApi, IViewOrderModal, IPostOrderResponse, IProduct,
} from '../../../types';
import { IEvents } from '../../base/events';
import {
	CART_EVENTS,
	DEFAULT_ORDER_STEP,
	ORDER_EVENTS,
	SYSTEM_EVENTS,
	SYSTEM_NAME_SPACE,
} from '../../../utils/constants';
import { isCart } from '../../../utils/utils';

class PresenterOrder {
	constructor(
		private readonly model: IModelOrder,
		private readonly modelApi: IOrderApi,
		private readonly view: IViewOrderModal,
		private readonly events: IEvents,
	) {}

	public init(): void {
		this.view.setDataStep1Callback((payment: PaymentMethod, address: string) => {
			this.model.setPaymentMethod(payment);
			this.model.setAddress(address);

			const orderData = this.model.getOrderData();
			this.view.update(orderData);

			this.goToStep('2');
		});

		this.view.setDataStep2Callback((email: string, phone: string) => {
			this.model.setEmail(email);
			this.model.setPhone(phone);

			const orderData = this.model.getOrderData();
			this.view.update(orderData);

			void this.submitOrder();
		});

		this.view.setDataStep3Callback(() => {
			this.events.emit(ORDER_EVENTS.ORDER_SUBMIT);

			this.model.clearData();

			const newOrderData = this.model.getOrderData();
			this.view.update(newOrderData);

			this.goToStep(DEFAULT_ORDER_STEP);
			this.closeModal();
		});

		this.events.on(CART_EVENTS.CART_COMPLETE, (cartData: unknown) => {
			if (!isCart(cartData)) return;

			const items: string[] = cartData.items.map((item: IProduct) => item.id);

			this.model.setItems(items);
			this.model.setTotal(cartData.totalPrice);

			const orderData: IOrder = this.model.getOrderData();
			this.view.update(orderData);

			this.openModal();
		});
	}

	protected async submitOrder(): Promise<void> {
		const order: IOrder = this.model.getOrderData();
		this.view.setStep2Loading(true);

		try {
			const response: IPostOrderResponse = await this.modelApi.postOrder(order);
			const { id, total } = response;

			this.model.setTotal(total);
			const updatedOrder = this.model.getOrderData();

			this.view.setOrderResult(id, total);
			this.view.update(updatedOrder);

			this.events.emit(ORDER_EVENTS.ORDER_SUBMIT);

			this.goToStep('3');
		} catch (error) {
			console.error('[ORDER] submitOrder error:', error);

			const message =
				error instanceof Error
					? error.message
					: 'Не удалось оформить заказ. Попробуйте позже.';

			this.view.setOrderError(message);
			this.goToStep('4');
		} finally {
			this.view.setStep2Loading(false);
		}
	}

	public openModal = (): void => {
		this.goToStep(DEFAULT_ORDER_STEP);
		this.view.openModal();

		this.events.emit(SYSTEM_EVENTS.MODAL_OPEN, {
			modalName: SYSTEM_NAME_SPACE.ORDER_MODAL,
		});
	};

	public closeModal = (): void => {
		this.view.closeModal();
		this.goToStep(DEFAULT_ORDER_STEP);

		this.events.emit(SYSTEM_EVENTS.MODAL_CLOSE, {
			modalName: SYSTEM_NAME_SPACE.ORDER_MODAL,
		});
	};

	protected goToStep(step: OrderStep): void {
		this.view.setStep(step);
		this.events.emit(ORDER_EVENTS.ORDER_STEP, { step });
	}
}

export default PresenterOrder;