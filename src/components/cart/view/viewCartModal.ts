import ViewModal from '../../viewModal/viewModal';
import { cloneTemplate, ensureElement, isCart } from '../../../utils/utils';
import { ICart, IViewCartModal, ICardBasket, IProduct } from '../../../types';
import { SELECTORS } from '../../../utils/constants';

/**
 * Класс представления модального окна корзины
 */
class ViewCartModal extends ViewModal<ICart> implements IViewCartModal {
	protected cartTemplate: HTMLTemplateElement | null = document.querySelector(SELECTORS.IDS.BASKET);
	protected cartButton: HTMLElement | null = null;
	protected cartCount: HTMLElement | null = null;
	protected onOrderCallback: () => void | null = null;

	/**
	 * Конструктор класса ViewCartModal
	 * @param modalContainer {HTMLElement | string} - DOM-элемент или селектор контейнера модального окна
	 */
	public constructor(modalContainer: HTMLElement | string) {
		super(modalContainer, {
			items: [],
			itemsCount: 0,
			totalPrice: 0,
		});

		this.cartButton = ensureElement(SELECTORS.HEADER.BASKET);
		this.cartCount = ensureElement(SELECTORS.HEADER.BASKET_COUNTER, this.cartButton);

		this.cartButton.addEventListener('click', () => {
			this.onOpenModalCallback();
		});
	}

	public setOnOrderCallback(callback: () => void): void {
		this.onOrderCallback = callback;
	}

	public update(cartData: ICart, cards?: ICardBasket[]): void {
		if (!isCart(cartData)) return;

		if (this.cartCount) {
			this.cartCount.textContent = cartData.itemsCount.toString();
		}

		super.update(cartData, cards);
	}

	protected createModalContent(cartData: ICart, cards: ICardBasket[]): HTMLElement {
		if (!this.cartTemplate) {
			throw new Error('ViewCartModal: шаблон корзины не найден');
		}

		const cart = cloneTemplate<HTMLElement>(this.cartTemplate);
		const cartList = ensureElement(SELECTORS.BASKET.LIST, cart);
		const cartPrice = ensureElement(SELECTORS.BASKET.PRICE, cart);
		const orderButton = cart.querySelector(SELECTORS.BASKET.BUTTON) as HTMLButtonElement | null;

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

		if (this.onOrderCallback && evt.target.classList.contains(SELECTORS.BASKET.BUTTON_CLASS)) {
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

	/**
	 * Рендерит текущее состояние корзины в DOM
	 */
	public render(): void {
		const cards: ICardBasket[] = (this.renderData as ICardBasket[]) || [];
		const modalContent: HTMLElement = this.createModalContent(this.state, cards);
		this.renderContent(modalContent);
		this.setupCustomEventListeners();
	}
}

export default ViewCartModal;