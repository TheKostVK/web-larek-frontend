import { IOrder } from '../model/modelOrder.interface';

/**
 * Формат ответа сервера при создании заказа
 */
export interface IPostOrderResponse {
	/**
	 * Идентификатор успешно созданного заказа
	 */
	id: string;

	/**
	 * Итоговая стоимость, рассчитанная на сервере
	 */
	total: number;
}

/**
 * Интерфейс API работы с заказами
 */
export interface IOrderApi {
	/**
	 * Отправка данных заказа на сервер
	 * @param order {IOrder} Полные данные заказа
	 * @returns Ответ сервера с id и суммой заказа
	 */
	postOrder(order: IOrder): Promise<IPostOrderResponse>;
}