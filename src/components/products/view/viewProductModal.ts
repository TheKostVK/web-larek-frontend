import { IProduct, IViewProductModal } from '../../../types';
import ViewModal from '../../viewModal/viewModal';
import { SELECTORS } from '../../../utils/constants';

/**
 * Класс представления модального окна товара
 */
class ViewProductModal extends ViewModal<IProduct> implements IViewProductModal {
	protected onAddToCartCallback: (product: IProduct) => void | null = null;

	/**
	 * Конструктор класса ViewProductModal
	 * @param modalContainer {HTMLElement | string} - DOM-элемент или селектор контейнера модального окна
	 */
	public constructor(
		modalContainer: HTMLElement | string = SELECTORS.IDS.MODAL_CONTAINER,
	) {
		super(modalContainer, {} as IProduct);
	}

	public setOnAddToCartCallback(callback: (product: IProduct) => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onAddToCartCallback = callback;
	}

	public setInCartState(inCart: boolean): void {
	}

	public update(product: IProduct, content?: HTMLElement): void {
		super.update(product, content);
	}

	protected clickAddToCartEvent = (evt: MouseEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (this.onAddToCartCallback && evt.target.classList.contains(SELECTORS.CARD.BUTTON_CLASS)) {
			if (this.state.price !== null) {
				this.onAddToCartCallback(this.state);
			}
		}
	};

	protected setupCustomEventListeners(): void {
		if (!this.isEventListeners) {
			this.el.addEventListener('click', this.clickAddToCartEvent);
			this.isEventListeners = true;
		}
	}

	protected removeCustomEventListeners(): void {
		if (this.isEventListeners) {
			this.el.removeEventListener('click', this.clickAddToCartEvent);
			this.isEventListeners = false;
		}
	}

	public render(): void {
		if (!this.state || !this.state.id) {
			return;
		}

		const modalContent: HTMLElement = (this.renderData as HTMLElement) || document.createElement('div');
		this.renderContent(modalContent);
		this.setupCustomEventListeners();
	}
}

export default ViewProductModal;