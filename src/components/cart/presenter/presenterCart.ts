import { IEvents } from '../../base/events';
import { CART_EVENTS, SYSTEM_EVENTS, SYSTEM_NAME_SPACE } from '../../../utils/constants';
import { isProduct } from '../../../utils/utils';
import { CartCheckRequest, IModelCart, IProduct, IViewCartModal, ICardBasket } from '../../../types';

class PresenterCart {
	protected model: IModelCart;
	protected view: IViewCartModal;
	protected events: IEvents;

	constructor(model: IModelCart, view: IViewCartModal, events: IEvents) {
		this.model = model;
		this.view = view;
		this.events = events;
	}

	public init(): void {
		this.view.setOnOpenModalCallback(this.openModal);
		this.view.setOnCloseModalCallback(this.closeModal);
		this.view.setOnRemoveToCartCallback((itemId: string) => {
			if (typeof itemId === 'string') {
				this.model.removeItem(itemId);

				const cartData = this.model.getCartData();
				this.view.update(cartData);
			}

			this.events.emit(CART_EVENTS.CART_PRODUCT_DELETE);
		});
		this.view.setOnOrderCallback(() => {
			const cartData = this.model.getCartData();
			this.model.clearCart();

			const newCartData = this.model.getCartData();
			this.view.update(newCartData);
			this.closeModal();

			this.events.emit(CART_EVENTS.CART_COMPLETE, cartData);
		});
		this.events.on(CART_EVENTS.CART_LOADED, () => {
			const cartData = this.model.getCartData();
			this.view.update(cartData);
			this.view.render();
		});
		this.events.on(CART_EVENTS.CART_PRODUCT_ADD, (event) => {
			if (isProduct(event)) {
				this.model.addItem(event);

				const cartData = this.model.getCartData();
				this.view.update(cartData);
			}
		});
		this.events.on<CartCheckRequest>(CART_EVENTS.CART_CHECK_ITEM, (payload) => {
			if (!payload) return;

			const { productId, respond } = payload;

			const product: IProduct | null = this.model.getItemById(productId);

			respond(!!product);
		});
	}

	public closeModal = (): void => {
		this.view.closeModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_CLOSE, { modalName: SYSTEM_NAME_SPACE.CART_MODAL });
	};

	public openModal = (): void => {
		this.view.openModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_OPEN, { modalName: SYSTEM_NAME_SPACE.CART_MODAL });
	};
}

export default PresenterCart;