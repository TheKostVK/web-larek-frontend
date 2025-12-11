import { Card } from './card';
import { IProduct, ICard } from '../../types';

export class CardProduct extends Card implements ICard {
	protected productTemplate: HTMLTemplateElement | null = document.querySelector('#card-catalog');

	constructor() {
		const template = document.querySelector('#card-catalog') as HTMLTemplateElement | null;
		if (!template) {
			throw new Error('CardProduct: шаблон карточки не найден');
		}
		super(template);
	}

	public render(product: IProduct): void {
		super.render(product);
	}
}
