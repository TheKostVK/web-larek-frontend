import { IProduct, IViewProductList, ICard } from '../../../types';
import { View } from '../../view/view';
import { getElementData } from '../../../utils/utils';

class ViewProductList extends View<IProduct[]> implements IViewProductList {
	protected onProductClickCallback: ((productId: string) => void) | null = null;
	protected cardFactory: (product: IProduct) => ICard;

	constructor(cardFactory: (product: IProduct) => ICard) {
		super('.gallery', []);
		this.cardFactory = cardFactory;
	}

	protected createProductCard(product: IProduct): HTMLElement {
		const card = this.cardFactory(product);
		card.render(product);
		return card.getContainer();
	}

	protected createProductList(products: IProduct[]): HTMLElement[] {
		return products.map((product: IProduct) => this.createProductCard(product));
	}

	public setOnProductClickCallback(callback: (productId: string) => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onProductClickCallback = callback;
	}

	public update(products: IProduct[]): void {
		this.state = products;

		if (this.isMounted) {
			this.render();
		}
	}

	public render(): void {
		if (!this.el) {
			throw new Error('ViewProductList: корневой элемент не найден');
		}

		this.el.replaceChildren();

		const cards: HTMLElement[] = this.createProductList(this.state);

		const fragment = document.createDocumentFragment();

		for (const card of cards) {
			fragment.appendChild(card);
		}

		if (!this.isEventListeners) {
			this.el.addEventListener('click', (evt) => {
				if (!(evt.target instanceof HTMLElement)) return;

				const card = evt.target.closest<HTMLElement>('.card');
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
