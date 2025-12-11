import { Card } from './card';
import { IProduct, ICardPreview } from '../../types';
import { SELECTORS } from '../../utils/constants';

/**
 * Класс карточки товара для предпросмотра
 */
export class CardPreview extends Card implements ICardPreview {
	protected description: HTMLElement;
	protected button: HTMLButtonElement;

	/**
	 * Конструктор класса CardPreview
	 */
	constructor() {
		const template = document.querySelector(SELECTORS.IDS.CARD_PREVIEW) as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardPreview: шаблон карточки не найден');
		}
		super(template);

		this.description = this.container.querySelector(SELECTORS.CARD.TEXT) as HTMLElement;
		this.button = this.container.querySelector(SELECTORS.CARD.BUTTON) as HTMLButtonElement;

		if (!this.description || !this.button) {
			throw new Error('CardPreview: некорректный шаблон карточки');
		}
	}

	public render(product: IProduct, inCart: boolean = false): void {
		super.render(product);
		
		this.description.textContent = product.description;

		const forSale: boolean = product.price !== null;

		if (!forSale) {
			this.button.textContent = 'Недоступен к покупке';
			this.button.disabled = true;
		} else if (inCart) {
			this.button.textContent = 'В корзине';
			this.button.disabled = true;
		} else {
			this.button.textContent = 'В корзину';
			this.button.disabled = false;
		}
	}
}
