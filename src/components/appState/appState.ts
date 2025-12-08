import { IModelProduct, IProduct } from '../../types/components/products/model/modelProduct.interface';
import { IModelCart } from '../../types/components/cart/model/modelCart.interface';
import { IModelOrder } from '../../types/components/order/model/modelOrder.interface';
import { IAppState } from '../../types/components/appState/appState.interface';
import { IEvents } from '../base/events';
import { IProductApi } from '../../types/components/products/api/productApi.interface';
import { CART_EVENTS, PRODUCT_EVENTS, settings, SYSTEM_EVENTS } from '../../utils/constants';
import { isCart, isProduct } from '../../utils/utils';


class AppState implements IAppState {
	protected modelProduct: IModelProduct;
	protected modelCart: IModelCart;
	protected modelOrder: IModelOrder;
	protected events: IEvents;

	protected productApi: IProductApi;

	protected openedModal: string | null;

	constructor(modelProduct: IModelProduct, modelCart: IModelCart, modelOrder: IModelOrder, events: IEvents, productApi: IProductApi) {
		this.modelProduct = modelProduct;
		this.modelCart = modelCart;
		this.modelOrder = modelOrder;
		this.events = events;

		this.productApi = productApi;

		this.openedModal = null;
	}

	public async init(): Promise<void> {
		await this.loadProducts();
		this.loadCart();

		this.events.on(SYSTEM_EVENTS.MODAL_OPEN, ({ modalName }: { modalName: string }) => {
			if (typeof modalName !== 'string') return;

			if (this.openedModal === null) {
				this.openedModal = modalName;
			}
		});

		this.events.on(SYSTEM_EVENTS.MODAL_CLOSE, ({ modalName }: { modalName: string }) => {
			if (typeof modalName !== 'string') return;

			if (this.openedModal === modalName) {
				this.openedModal = null;
			}
		});
	}

	protected async loadProducts(): Promise<void> {
		try {
			const products = await this.productApi.getProducts();

			this.modelProduct.setProducts(products);
			this.events.emit(PRODUCT_EVENTS.PRODUCTS_LOADED);
		} catch (error) {
			this.events.emit(PRODUCT_EVENTS.PRODUCTS_LOAD_FAILED);
			throw new Error(error);
		}
	};

	protected loadCart(): void {
		const cartDataLs = JSON.parse(localStorage.getItem(settings.cartStorageKey));
		localStorage.setItem(settings.cartStorageKey, JSON.stringify([]));

		if (!isCart(cartDataLs)) return;

		cartDataLs.items.forEach((item: IProduct) => {
			if (isProduct(item)) {
				this.modelCart.addItem(item);
			}
		});

		this.events.emit(CART_EVENTS.CART_LOADED);
	};
}

export default AppState;