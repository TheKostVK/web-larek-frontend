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
	 */
	update(products: IProduct[]): void;

	/**
	 * Рендер
	 */
	render(): void;
}
