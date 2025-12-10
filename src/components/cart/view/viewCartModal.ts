import ViewModal from '../../viewModal/viewModal';
import { cloneTemplate, ensureElement, getElementData, isCart, setElementData } from '../../../utils/utils';
import { ICart, IViewCartModal } from '../../../types';

class ViewCartModal extends ViewModal<ICart> implements IViewCartModal {
	protected cartTemplate: HTMLTemplateElement | null = document.querySelector('#basket');
	protected cardProductTemplate: HTMLTemplateElement | null = document.querySelector('#card-basket');
	protected cartButton: HTMLElement | null = null;
	protected cartCount: HTMLElement | null = null;
	protected onRemoveToCartCallback: (itemId: string) => void | null = null;
	protected onOrderCallback: () => void | null = null;

	public constructor() {
		const modalContainer = ensureElement('#modal-container');
		super(modalContainer, {
			items: [],
			itemsCount: 0,
			totalPrice: 0,
		});

		this.cartButton = ensureElement('.header__basket');
		this.cartCount = ensureElement('.header__basket-counter', this.cartButton);

		this.cartButton.addEventListener('click', () => {
			this.onOpenModalCallback();
		});
	}

	public setOnRemoveToCartCallback(callback: (itemId: string) => void): void {
		this.onRemoveToCartCallback = callback;
	}

	public setOnOrderCallback(callback: () => void): void {
		this.onOrderCallback = callback;
	}

	public update(cartData: ICart): void {
		if (!isCart(cartData)) return;

		this.state = cartData;
		if (this.cartCount) {
			this.cartCount.innerText = cartData.itemsCount.toString();
		}

		if (this.isMounted) {
			this.render();
		}
	}

	protected createModalContent(cartData: ICart): HTMLElement {
		if (!this.cartTemplate) {
			throw new Error('ViewCartModal: шаблон корзины не найден');
		}

		const cart = cloneTemplate<HTMLElement>(this.cartTemplate);
		const cartList = cart.querySelector('.basket__list') as HTMLElement | null;
		const cartPrice = cart.querySelector('.basket__price') as HTMLElement | null;

		if (!cartList || !cartPrice) {
			throw new Error('ViewCartModal: некорректный шаблон корзины');
		}

		cartPrice.innerHTML = `${ cartData.totalPrice } синапсов`;

		if (cartData.items.length === 0) {
			cartList.innerText = 'Пусто(';
			return cart;
		}

		cartData.items.forEach((item, index) => {
			const cardProduct: HTMLElement = cloneTemplate<HTMLElement>(this.cardProductTemplate);
			const itemIndex: HTMLElement = cardProduct.querySelector('.basket__item-index');
			const itemTitle: HTMLElement = cardProduct.querySelector('.card__title');
			const itemPrice: HTMLElement = cardProduct.querySelector('.card__price');
			const itemDeleted: HTMLElement = cardProduct.querySelector('.basket__item-delete');

			if (!itemIndex || !itemTitle || !itemPrice || !itemDeleted) {
				throw new Error('ViewCartModal: некорректный шаблон карточки товара');
			}

			itemIndex.innerHTML = (index + 1).toString();
			itemTitle.innerHTML = item.title;
			itemPrice.innerHTML = item.price
				? `${ item.price } синапсов`
				: 'бесконечность';

			setElementData(cardProduct, item);

			cartList.appendChild(cardProduct);
		});

		return cart;
	}

	protected clickToCartEvent = (evt: MouseEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (this.onRemoveToCartCallback && evt.target.classList.contains('basket__item-delete')) {
			const card = evt.target.closest<HTMLElement>('.basket__item');
			const { id } = getElementData<{ id: string }>(card, { id: String });

			this.onRemoveToCartCallback(id);
		}

		if (this.onOrderCallback && evt.target.classList.contains('basket__button')) {
			this.onOrderCallback();
		}
	};

	public unmount(): void {
		this.isMounted = false;
		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);

		this.el.removeEventListener('click', this.clickEvent);
		document.body.removeEventListener('keydown', this.keyDownEvent);

		this.el.removeEventListener('click', this.clickToCartEvent);

		this.isEventListeners = false;

		modalContentHTML.innerHTML = '';
	}

	public render(): void {
		if (!this.el) {
			throw new Error('ViewCartModal: корневой элемент не найден');
		}

		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);
		const modalContent: HTMLElement = this.createModalContent(this.state);

		modalContentHTML.innerHTML = '';

		if (!this.isEventListeners) {
			this.el.addEventListener('click', this.clickEvent);
			document.body.addEventListener('keydown', this.keyDownEvent);

			this.el.addEventListener('click', this.clickToCartEvent);

			this.isEventListeners = true;
		}

		modalContentHTML.appendChild(modalContent);
		this.isMounted = true;
	}
}

export default ViewCartModal;