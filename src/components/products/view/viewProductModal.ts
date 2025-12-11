import { IProduct, IViewProductModal, ICardPreview } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import ViewModal from '../../viewModal/viewModal';

class ViewProductModal extends ViewModal<IProduct> implements IViewProductModal {
	protected onAddToCartCallback: (product: IProduct) => void | null = null;
	protected inCart = false;
	protected cardFactory: (product: IProduct, inCart?: boolean) => ICardPreview;

	public constructor(cardFactory: (product: IProduct, inCart?: boolean) => ICardPreview) {
		const modalContainer = ensureElement('#modal-container');
		super(modalContainer, {} as IProduct);
		this.cardFactory = cardFactory;
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
		const card = this.cardFactory(product, this.inCart);
		card.render(product, this.inCart);
		return card.getContainer();
	}

	protected clickAddToCartEvent = (evt: MouseEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (this.onAddToCartCallback && evt.target.classList.contains('card__button')) {
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

		const modalContent: HTMLElement = this.createModalContent(this.state);
		this.renderContent(modalContent);
		this.setupCustomEventListeners();
	}
}

export default ViewProductModal;