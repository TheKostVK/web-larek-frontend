import { cloneTemplate, getClassFromTag, setElementData } from '../../utils/utils';
import { IProduct, ICard } from '../../types';
import { CDN_URL, SELECTORS } from '../../utils/constants';

/**
 * Базовый абстрактный класс для карточек товаров
 */
export abstract class Card implements ICard {
	protected container: HTMLElement;
	protected title: HTMLElement;
	protected price: HTMLElement;
	protected image: HTMLImageElement | null = null;
	protected category: HTMLElement | null = null;

	/**
	 * Конструктор базового класса Card
	 * @param template {HTMLTemplateElement | string} - шаблон карточки (DOM-элемент или селектор)
	 */
	protected constructor(template: HTMLTemplateElement | string) {
		this.container = cloneTemplate<HTMLElement>(template);
		
		this.title = this.container.querySelector(SELECTORS.CARD.TITLE) as HTMLElement;
		this.price = this.container.querySelector(SELECTORS.CARD.PRICE) as HTMLElement;
		this.image = this.container.querySelector(SELECTORS.CARD.IMAGE) as HTMLImageElement | null;
		this.category = this.container.querySelector(SELECTORS.CARD.CATEGORY) as HTMLElement | null;

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
