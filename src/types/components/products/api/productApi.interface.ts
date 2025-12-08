import { IProduct } from '../model/modelProduct.interface';

/**
 * Интерфейс API для работы с товарами
 */
export interface IProductApi {
	/**
	 * Получение списка всех товаров
	 * @returns Промис с массивом объектов товаров
	 */
	getProducts(): Promise<IProduct[]>;

	/**
	 * Получение одного товара по его идентификатору
	 * @param id {string} Идентификатор товара
	 * @returns Промис с найденным товаром
	 */
	getProductById(id: string): Promise<IProduct>;
}