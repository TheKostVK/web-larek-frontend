import { Card } from './card';
import { IProduct, ICardBasket } from '../../types';

export class CardBasket extends Card implements ICardBasket {
	protected itemIndex: HTMLElement;
	protected deleteButton: HTMLElement;

	constructor() {
		const template = document.querySelector('#card-basket') as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardBasket: шаблон карточки не найден');
		}
		super(template);

		this.itemIndex = this.container.querySelector('.basket__item-index') as HTMLElement;
		this.deleteButton = this.container.querySelector('.basket__item-delete') as HTMLElement;

		if (!this.itemIndex || !this.deleteButton) {
			throw new Error('CardBasket: некорректный шаблон карточки');
		}
	}

	public render(product: IProduct, index?: number): void {
		super.render(product);
		if (typeof index === 'number') {
			this.itemIndex.textContent = (index + 1).toString();
		}
	}
}
