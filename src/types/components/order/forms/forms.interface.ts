import { PaymentMethod } from '../model/modelOrder.interface';

/**
 * Интерфейс валидатора для проверки значений
 */
export interface IValidator {
	/**
	 * Проверяет значение на валидность
	 * @param value {string} Значение для проверки
	 * @returns {boolean} true, если значение валидно
	 */
	validate(value: string): boolean;
}

/**
 * Интерфейс обработчика submit для формы шага 1 (способ оплаты и адрес)
 */
export interface IOrderStep1SubmitHandler {
	/**
	 * Обрабатывает submit формы шага 1
	 * @param payment {PaymentMethod} Выбранный способ оплаты
	 * @param address {string} Адрес доставки
	 */
	handleSubmit(payment: PaymentMethod, address: string): void;
}

/**
 * Интерфейс обработчика submit для формы шага 2 (контактные данные)
 */
export interface IOrderStep2SubmitHandler {
	/**
	 * Обрабатывает submit формы шага 2
	 * @param email {string} Email покупателя
	 * @param phone {string} Телефон покупателя
	 */
	handleSubmit(email: string, phone: string): void;
}
