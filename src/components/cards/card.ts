import { cloneTemplate, getClassFromTag, setElementData } from '../../utils/utils';
import { IProduct, ICard } from '../../types';
import { CDN_URL } from '../../utils/constants';

export abstract class Card implements ICard {
	protected container: HTMLElement;
	protected title: HTMLElement;
	protected price: HTMLElement;
	protected image: HTMLImageElement | null = null;
	protected category: HTMLElement | null = null;

	protected constructor(template: HTMLTemplateElement | string) {
		this.container = cloneTemplate<HTMLElement>(template);
		
		this.title = this.container.querySelector('.card__title') as HTMLElement;
		this.price = this.container.querySelector('.card__price') as HTMLElement;
		this.image = this.container.querySelector('.card__image') as HTMLImageElement | null;
		this.category = this.container.querySelector('.card__category') as HTMLElement | null;

		if (!this.title || !this.price) {
			throw new Error('Card: некорректный шаблон карточки');
		}
	}

	public render(product: IProduct): void {
		this.title.textContent = product.title;
		this.price.textContent = product.price !== null 
			? `${ product.price } синапсов` 
			: 'бесконечность';

		if (this.image) {
			this.image.src = `${ CDN_URL }${ product.image }`;
			this.image.alt = product.title;
		}

		if (this.category) {
			const categoryClass: string = getClassFromTag(product.category);
			this.category.classList.add(categoryClass);
			this.category.textContent = product.category;
		}

		setElementData(this.container, { id: product.id });
	}

	public getContainer(): HTMLElement {
		return this.container;
	}
}
