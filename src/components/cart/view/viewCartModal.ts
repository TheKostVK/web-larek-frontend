import ViewModal from '../../viewModal/viewModal';
import { cloneTemplate, ensureElement, getElementData, isCart } from '../../../utils/utils';
import { ICart, IViewCartModal, ICardBasket, IProduct } from '../../../types';

class ViewCartModal extends ViewModal<ICart> implements IViewCartModal {
	protected cartTemplate: HTMLTemplateElement | null = document.querySelector('#basket');
	protected cartButton: HTMLElement | null = null;
	protected cartCount: HTMLElement | null = null;
	protected onRemoveToCartCallback: (itemId: string) => void | null = null;
	protected onOrderCallback: () => void | null = null;
	protected cardFactory: (product: IProduct, index: number) => ICardBasket;

	public constructor(cardFactory: (product: IProduct, index: number) => ICardBasket) {
		const modalContainer = ensureElement('#modal-container');
		super(modalContainer, {
			items: [],
			itemsCount: 0,
			totalPrice: 0,
		});

		this.cardFactory = cardFactory;

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
			this.cartCount.textContent = cartData.itemsCount.toString();
		}
		
		if (this.isMounted) {
			this.render();
		}
	}

	protected createModalContent(cartData: ICart, cards: ICardBasket[]): HTMLElement {
		if (!this.cartTemplate) {
			throw new Error('ViewCartModal: шаблон корзины не найден');
		}

		const cart = cloneTemplate<HTMLElement>(this.cartTemplate);
		const cartList = cart.querySelector('.basket__list') as HTMLElement | null;
		const cartPrice = cart.querySelector('.basket__price') as HTMLElement | null;
		const orderButton = cart.querySelector('.basket__button') as HTMLButtonElement | null;

		if (!cartList || !cartPrice) {
			throw new Error('ViewCartModal: некорректный шаблон корзины');
		}

		cartPrice.textContent = `${ cartData.totalPrice } синапсов`;

		const isEmpty = cards.length === 0;

		if (orderButton) {
			orderButton.disabled = isEmpty;
		}

		if (isEmpty) {
			cartList.textContent = 'Пусто(';
			return cart;
		}

		cards.forEach((card) => {
			cartList.appendChild(card.getContainer());
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
			const button = evt.target as HTMLButtonElement;
			if (!button.disabled) {
				this.onOrderCallback();
			}
		}
	};

	protected setupCustomEventListeners(): void {
		if (!this.isEventListeners) {
			this.el.addEventListener('click', this.clickToCartEvent);
			this.isEventListeners = true;
		}
	}

	protected removeCustomEventListeners(): void {
		if (this.isEventListeners) {
			this.el.removeEventListener('click', this.clickToCartEvent);
			this.isEventListeners = false;
		}
	}

	public render(cards: ICardBasket[] = []): void {
		if (!cards.length && this.state.items.length > 0) {
			cards = this.state.items.map((item, index) => {
				const card = this.cardFactory(item, index);
				card.render(item, index);
				return card;
			});
		}

		const modalContent: HTMLElement = this.createModalContent(this.state, cards);
		this.renderContent(modalContent);
		this.setupCustomEventListeners();
	}
}

export default ViewCartModal;