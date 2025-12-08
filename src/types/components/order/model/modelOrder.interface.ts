/**
 * Способ оплаты
 */
export type PaymentMethod = 'online' | 'offline';

/**
 * Шаг оформления заказа:
 * 1 — способ оплаты и адрес
 * 2 — контактные данные
 * 3 — успешное завершение
 * 4 — ошибка оформления
 */
export type OrderStep = '1' | '2' | '3' | '4';

/**
 * Полные данные заказа
 */
export interface IOrder {
	/**
	 * Список идентификаторов товаров
	 */
	items: string[];

	/**
	 * Способ оплаты
	 */
	payment: PaymentMethod;

	/**
	 * Email покупателя
	 */
	email: string;

	/**
	 * Телефон покупателя
	 */
	phone: string;

	/**
	 * Адрес доставки
	 */
	address: string;

	/**
	 * Итоговая сумма заказа
	 */
	total: number;
}

/**
 * Интерфейс модели заказа
 */
export interface IModelOrder {
	/**
	 * Устанавливает список товаров заказа
	 * @param items Массив идентификаторов товаров
	 */
	setItems(items: string[]): void;

	/**
	 * Устанавливает способ оплаты
	 * @param method Способ оплаты
	 */
	setPaymentMethod(method: PaymentMethod): void;

	/**
	 * Устанавливает email
	 * @param email Email
	 */
	setEmail(email: string): void;

	/**
	 * Устанавливает телефон
	 * @param phone Телефон
	 */
	setPhone(phone: string): void;

	/**
	 * Устанавливает адрес доставки
	 * @param address Полный адрес доставки заказа
	 */
	setAddress(address: string): void;

	/**
	 * Устанавливает итоговую стоимость заказа
	 * @param total Сумма заказа
	 */
	setTotal(total: number): void;

	/**
	 * Полный сброс данных заказа
	 */
	clearData(): void;

	/**
	 * Получение всех данных заказа
	 */
	getOrderData(): IOrder;
}