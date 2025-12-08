import { IViewProductList } from '../../../types/components/products/view/viewProductList.interface';
import { View } from '../../view/view';
import { IProduct } from '../../../types/components/products/model/modelProduct.interface';
import { cloneTemplate, getClassFromTag, getElementData, setElementData } from '../../../utils/utils';
import { CDN_URL } from '../../../utils/constants';

class ViewProductList extends View<IProduct[]> implements IViewProductList {
	protected productTemplate: HTMLTemplateElement | null = document.querySelector('#card-catalog');
	protected onProductClickCallback: ((productId: string) => void) | null = null;

	constructor() {
		super('.gallery', []);
	}

	protected createProductCard(product: IProduct): HTMLElement {
		if (!this.productTemplate) {
			throw new Error('ViewProductList: шаблон карточки не найден');
		}

		const card = cloneTemplate<HTMLElement>(this.productTemplate);
		const tag = card.querySelector('.card__category') as HTMLElement;
		const title = card.querySelector('.card__title') as HTMLElement;
		const price = card.querySelector('.card__price') as HTMLElement;
		const img = card.querySelector('.card__image') as HTMLImageElement;

		if (!tag || !title || !price || !img) {
			throw new Error('ViewProductList: некорректный шаблон карточки товара');
		}

		const categoryClass: string = getClassFromTag(product.category);

		tag.classList.add(categoryClass);
		title.innerText = product.title;
		price.innerText = product.price !== null ? `${ product.price } синапсов` : 'бесконечность';

		img.src = `${ CDN_URL }${ product.image }`;
		img.alt = product.title;

		setElementData(card, product);

		return card;
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

		this.el.innerHTML = '';

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
