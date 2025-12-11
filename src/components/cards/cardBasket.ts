import { Card } from './card';
import { IProduct, ICardBasket } from '../../types';
import { SELECTORS } from '../../utils/constants';
import { getElementData } from '../../utils/utils';

/**
 * Класс карточки товара для корзины
 */
export class CardBasket extends Card implements ICardBasket {
	protected itemIndex: HTMLElement;
	protected deleteButton: HTMLElement;
	protected onDeleteCallback: ((itemId: string) => void) | null = null;

	/**
	 * Конструктор класса CardBasket
	 */
	constructor() {
		const template = document.querySelector(SELECTORS.IDS.CARD_BASKET) as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardBasket: шаблон карточки не найден');
		}
		super(template);

		this.itemIndex = this.container.querySelector(SELECTORS.BASKET.ITEM_INDEX) as HTMLElement;
		this.deleteButton = this.container.querySelector(SELECTORS.BASKET.ITEM_DELETE) as HTMLElement;

		if (!this.itemIndex || !this.deleteButton) {
			throw new Error('CardBasket: некорректный шаблон карточки');
		}

		this.deleteButton.addEventListener('click', this.handleDeleteClick);
	}

	protected handleDeleteClick = (evt: MouseEvent): void => {
		evt.stopPropagation();
		if (this.onDeleteCallback) {
			const { id } = getElementData<{ id: string }>(this.container, { id: String });
			this.onDeleteCallback(id);
		}
	};

	public setOnDeleteCallback(callback: (itemId: string) => void): void {
		this.onDeleteCallback = callback;
	}

	public render(product: IProduct, index?: number): void {
		super.render(product);
		if (typeof index === 'number') {
			this.itemIndex.textContent = (index + 1).toString();
		}
	}
}
