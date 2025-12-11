import { IProduct, IViewProductModal } from '../../../types';
import {
	cloneTemplate,
	ensureElement,
	getClassFromTag,
	setElementData,
} from '../../../utils/utils';
import { CDN_URL } from '../../../utils/constants';
import ViewModal from '../../viewModal/viewModal';

class ViewProductModal extends ViewModal<IProduct> implements IViewProductModal {
	protected modalContentTemplate: HTMLTemplateElement | null = document.querySelector('#card-preview');
	protected onAddToCartCallback: (product: IProduct) => void | null = null;
	protected inCart = false;

	public constructor() {
		const modalContainer = ensureElement('#modal-container');
		super(modalContainer, {} as IProduct);
	}

	public setOnAddToCartCallback(callback: (product: IProduct) => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onAddToCartCallback = callback;
	}

	public setInCartState(inCart: boolean): void {
		if (typeof inCart !== 'boolean') return;

		this.inCart = inCart;
	}

	public update(product: IProduct): void {
		this.state = product;

		if (this.isMounted) {
			this.render();
		}
	}

	protected createModalContent(product: IProduct): HTMLElement {
		if (!this.modalContentTemplate) {
			throw new Error('ViewProductModal: шаблон контента товара не найден');
		}

		const card = cloneTemplate<HTMLElement>(this.modalContentTemplate);

		const tag = card.querySelector('.card__category') as HTMLElement | null;
		const title = card.querySelector('.card__title') as HTMLElement | null;
		const description = card.querySelector('.card__text') as HTMLElement | null;
		const price = card.querySelector('.card__price') as HTMLElement | null;
		const img = card.querySelector('.card__image') as HTMLImageElement | null;
		const cardButton = card.querySelector('.card__button') as HTMLButtonElement | null;

		if (!tag || !title || !description || !price || !img || !cardButton) {
			throw new Error('ViewProductModal: некорректный шаблон карточки товара');
		}

		const categoryClass: string = getClassFromTag(product.category);
		const forSale: boolean = product.price !== null;

		tag.classList.add(categoryClass);
		tag.innerText = product.category;
		title.innerText = product.title;
		description.innerText = product.description;
		price.innerText = forSale ? `${ product.price } синапсов` : 'бесконечность';

		if (!forSale) {
			cardButton.textContent = 'Недоступен к покупке';
			cardButton.disabled = true;
		} else if (this.inCart) {
			cardButton.textContent = 'В корзине';
			cardButton.disabled = true;
		}

		img.src = `${ CDN_URL }${ product.image }`;
		img.alt = product.title;

		setElementData(card, { id: product.id });

		return card;
	}

	protected clickAddToCartEvent = (evt: MouseEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (this.onAddToCartCallback && evt.target.classList.contains('card__button')) {
			if (this.state.price !== null) {
				this.onAddToCartCallback(this.state);
			}
		}
	};

	public unmount(): void {
		this.isMounted = false;
		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);

		this.el.removeEventListener('click', this.clickEvent);
		document.body.removeEventListener('keydown', this.keyDownEvent);

		this.el.removeEventListener('click', this.clickAddToCartEvent);

		this.isEventListeners = false;

		modalContentHTML.replaceChildren();
	}

	public render(): void {
		if (!this.el) {
			throw new Error('ViewProductModal: корневой элемент не найден');
		}

		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);
		const modalContent: HTMLElement = this.createModalContent(this.state);

		modalContentHTML.replaceChildren();

		if (!this.isEventListeners) {
			this.el.addEventListener('click', this.clickEvent);
			document.body.addEventListener('keydown', this.keyDownEvent);

			this.el.addEventListener('click', this.clickAddToCartEvent);

			this.isEventListeners = true;
		}

		modalContentHTML.appendChild(modalContent);
		this.isMounted = true;
	}
}

export default ViewProductModal;