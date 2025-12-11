import { IProduct } from '../products/model/modelProduct.interface';
import { IOrder } from '../order/model/modelOrder.interface';
import { IPostOrderResponse } from '../order/api/orederApi.interface';

/**
 * Единый интерфейс API приложения
 */
export interface IAppApi {
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

	/**
	 * Отправка данных заказа на сервер
	 * @param order {IOrder} Полные данные заказа
	 * @returns Ответ сервера с id и суммой заказа
	 */
	postOrder(order: IOrder): Promise<IPostOrderResponse>;
}
