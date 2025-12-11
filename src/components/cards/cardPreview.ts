import { Card } from './card';
import { IProduct, ICardPreview } from '../../types';

export class CardPreview extends Card implements ICardPreview {
	protected description: HTMLElement;
	protected button: HTMLButtonElement;

	constructor() {
		const template = document.querySelector('#card-preview') as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardPreview: шаблон карточки не найден');
		}
		super(template);

		this.description = this.container.querySelector('.card__text') as HTMLElement;
		this.button = this.container.querySelector('.card__button') as HTMLButtonElement;

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
