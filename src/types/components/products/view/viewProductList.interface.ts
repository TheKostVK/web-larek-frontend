import { IView } from '../../view/view.interface';
import { IProduct } from '../model/modelProduct.interface';

export interface IViewProductList extends IView<IProduct[]> {
	/**
	 * Задаёт коллбек вызов обработки ивентов
	 * @param callback {(productId: string) => void} - коллбек функция
	 */
	setOnProductClickCallback(callback: (productId: string) => void): void;

	/**
	 * Обновление состояния
	 * @param products {IProduct[]} массив товаров
	 * @param cards {HTMLElement[]} опциональный массив готовых карточек товаров
	 */
	update(products: IProduct[], cards?: HTMLElement[]): void;

	/**
	 * Рендер
	 */
	render(): void;
}
