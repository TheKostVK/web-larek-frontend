import {
	CartCheckRequest,
	IModelProduct,
	IProduct,
} from '../../../types/components/products/model/modelProduct.interface';
import { IEvents } from '../../base/events';
import { IViewProductModal } from '../../../types/components/products/view/viewProductModal.interface';
import { CART_EVENTS, PRODUCT_EVENTS, SYSTEM_EVENTS, SYSTEM_NAME_SPACE } from '../../../utils/constants';
import { isProduct } from '../../../utils/utils';

class PresenterProductModal {
	protected model: IModelProduct;
	protected view: IViewProductModal;
	protected events: IEvents;

	constructor(model: IModelProduct, view: IViewProductModal, events: IEvents) {
		this.model = model;
		this.view = view;
		this.events = events;
	}

	public init(): void {
		this.view.setOnAddToCartCallback((product: IProduct) => this.events.emit(CART_EVENTS.CART_PRODUCT_ADD, product));
		this.view.setOnOpenModalCallback(this.openModal);
		this.view.setOnCloseModalCallback(this.closeModal);

		this.events.on(PRODUCT_EVENTS.PRODUCT_CLICK, async (event) => {
			if (!isProduct(event)) {
				return;
			}

			const inCart: boolean = await this.checkInCart(event.id);

			this.view.setInCartState(inCart);
			this.view.update(event);

			this.openModal();
		});

		this.events.on(CART_EVENTS.CART_PRODUCT_ADD, (event) => {
			if (isProduct(event)) {
				this.closeModal();
			}
		});
	}

	public checkInCart(productId: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			const payload: CartCheckRequest = {
				productId,
				respond: (inCart: boolean) => {
					resolve(inCart);
				},
			};

			this.events.emit<CartCheckRequest>('cart:check-item', payload);
		});
	}

	public closeModal = (): void => {
		this.view.closeModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_CLOSE, { modalName: SYSTEM_NAME_SPACE.PRODUCT_MODAL });
	};

	public openModal = (): void => {
		this.view.openModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_OPEN, { modalName: SYSTEM_NAME_SPACE.PRODUCT_MODAL });
	};
}

export default PresenterProductModal;