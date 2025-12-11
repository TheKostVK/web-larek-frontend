import { Card } from './card';
import { IProduct, ICard } from '../../types';
import { SELECTORS } from '../../utils/constants';

/**
 * Класс карточки товара для каталога
 */
export class CardProduct extends Card implements ICard {
	/**
	 * Конструктор класса CardProduct
	 */
	constructor() {
		const template = document.querySelector(SELECTORS.IDS.CARD_CATALOG) as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardProduct: шаблон карточки не найден');
		}
		super(template);
	}

	public render(product: IProduct): void {
		super.render(product);
	}
}
