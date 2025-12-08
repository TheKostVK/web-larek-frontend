import { IModelProduct } from '../../../types/components/products/model/modelProduct.interface';
import { IViewProductList } from '../../../types/components/products/view/viewProductList.interface';
import { IEvents } from '../../base/events';
import { PRODUCT_EVENTS } from '../../../utils/constants';

class PresenterProductList {
	protected model: IModelProduct;
	protected view: IViewProductList;
	protected events: IEvents;

	constructor(model: IModelProduct, view: IViewProductList, events: IEvents) {
		this.model = model;
		this.view = view;
		this.events = events;
	}

	/**
	 * Инициализация
	 */
	public init(): void {
		this.events.on(PRODUCT_EVENTS.PRODUCTS_LOADED, () => {
			const products = this.model.getProducts();
			this.view.update(products);
			this.view.render();
		});
		this.view.setOnProductClickCallback((productId: string) => {
			if (typeof productId === 'string') {
				const product = this.model.getProductById(productId);

				this.events.emit(PRODUCT_EVENTS.PRODUCT_CLICK, product);
			}
		});
	}
}

export default PresenterProductList;