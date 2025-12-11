import { IProduct, IViewProductList } from '../../../types';
import { View } from '../../view/view';
import { getElementData } from '../../../utils/utils';
import { SELECTORS } from '../../../utils/constants';

/**
 * Класс представления списка товаров
 */
class ViewProductList extends View<IProduct[]> implements IViewProductList {
	protected onProductClickCallback: ((productId: string) => void) | null = null;
	protected renderData: HTMLElement[] | null = null;

	/**
	 * Конструктор класса ViewProductList
	 */
	constructor() {
		super(SELECTORS.GALLERY.GALLERY, []);
	}

	public setOnProductClickCallback(callback: (productId: string) => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onProductClickCallback = callback;
	}

	public update(products: IProduct[], cards?: HTMLElement[]): void {
		this.state = products;
		this.renderData = cards || null;

		if (this.isMounted) {
			this.render();
		}
	}

	public render(): void {
		if (!this.el) {
			throw new Error('ViewProductList: корневой элемент не найден');
		}

		this.el.replaceChildren();

		if (!this.renderData || this.renderData.length === 0) {
			this.isMounted = true;
			return;
		}

		const fragment = document.createDocumentFragment();

		for (const card of this.renderData) {
			fragment.appendChild(card);
		}

		if (!this.isEventListeners) {
			this.el.addEventListener('click', (evt) => {
				if (!(evt.target instanceof HTMLElement)) return;

				const card = evt.target.closest<HTMLElement>(SELECTORS.CARD.CARD);
				if (!card || !this.onProductClickCallback) return;

				const { id } = getElementData<{ id: string }>(card, { id: String });

				this.onProductClickCallback(id);
			});

			this.isEventListeners = true;
		}

		this.el.appendChild(fragment);
		this.isMounted = true;
	}
}

export default ViewProductList;
