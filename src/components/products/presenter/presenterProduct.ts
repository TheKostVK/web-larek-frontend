import {
	CartCheckRequest,
	IModelProduct,
	IProduct,
	IViewProductList,
	IViewProductModal,
	ICardFactory,
} from '../../../types';
import { IEvents } from '../../base/events';
import { CART_EVENTS, PRODUCT_EVENTS, SYSTEM_EVENTS, SYSTEM_NAME_SPACE } from '../../../utils/constants';

class PresenterProduct {
	protected model: IModelProduct;
	protected viewList: IViewProductList;
	protected viewModal: IViewProductModal;
	protected events: IEvents;
	protected cardFactory: ICardFactory;

	constructor(
		model: IModelProduct,
		viewList: IViewProductList,
		viewModal: IViewProductModal,
		events: IEvents,
		cardFactory: ICardFactory,
	) {
		this.model = model;
		this.viewList = viewList;
		this.viewModal = viewModal;
		this.events = events;
		this.cardFactory = cardFactory;
	}

	public init(): void {
		this.initList();
		this.initModal();
	}

	protected initList(): void {
		this.events.on(PRODUCT_EVENTS.PRODUCTS_LOADED, () => {
			const products = this.model.getProducts();
			const cards = this.createCards(products);

			this.viewList.update(products, cards);
			this.viewList.render();
		});

		this.viewList.setOnProductClickCallback(async (productId: string) => {
			if (typeof productId === 'string') {
				const product = this.model.getProductById(productId);
				const inCart: boolean = await this.checkInCart(product.id);

				this.openModal();

				const content = this.createContent(product, inCart);
				this.viewModal.update(product, content);
			}
		});
	}

	protected initModal(): void {
		this.viewModal.setOnAddToCartCallback((product: IProduct) => {
			this.closeModal();

			this.events.emit(CART_EVENTS.CART_PRODUCT_ADD, product);
		});

		this.viewModal.setOnOpenModalCallback(this.openModal);
		this.viewModal.setOnCloseModalCallback(this.closeModal);
	}

	protected createCards(products: IProduct[]): HTMLElement[] {
		return products.map((product) => {
			const card = this.cardFactory.createProductCard();
			card.render(product);
			return card.getContainer();
		});
	}

	protected createContent(product: IProduct, inCart: boolean): HTMLElement {
		const card = this.cardFactory.createPreviewCard();
		card.render(product, inCart);
		return card.getContainer();
	}

	public checkInCart(productId: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			const payload: CartCheckRequest = {
				productId,
				respond: (inCart: boolean) => {
					resolve(inCart);
				},
			};

			this.events.emit<CartCheckRequest>(CART_EVENTS.CART_CHECK_ITEM, payload);
		});
	}

	public closeModal = (): void => {
		this.viewModal.closeModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_CLOSE, { modalName: SYSTEM_NAME_SPACE.PRODUCT_MODAL });
	};

	public openModal = (): void => {
		this.viewModal.openModal();
		this.events.emit(SYSTEM_EVENTS.MODAL_OPEN, { modalName: SYSTEM_NAME_SPACE.PRODUCT_MODAL });
	};
}

export default PresenterProduct;
