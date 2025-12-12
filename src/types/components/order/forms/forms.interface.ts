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

/**
 * Интерфейс формы шага 1 заказа
 */
export interface IOrderStep1Form {
	/**
	 * Возвращает кнопку отправки формы
	 * @returns {HTMLButtonElement | null} Кнопка отправки или null
	 */
	getSubmitButton(): HTMLButtonElement | null;
}

/**
 * Интерфейс формы шага 2 заказа
 */
export interface IOrderStep2Form {
	/**
	 * Возвращает кнопку отправки формы
	 * @returns {HTMLButtonElement | null} Кнопка отправки или null
	 */
	getSubmitButton(): HTMLButtonElement | null;
}

/**
 * Интерфейс фабрики для создания формы шага 1 заказа
 */
export interface IOrderStep1FormFactory {
	/**
	 * Создает экземпляр формы шага 1 заказа
	 * @param form {HTMLFormElement} DOM-элемент формы
	 * @param defaultPayment {PaymentMethod} Способ оплаты по умолчанию
	 * @param submitHandler {IOrderStep1SubmitHandler} Обработчик отправки формы
	 * @returns {IOrderStep1Form} Экземпляр формы шага 1
	 */
	create(form: HTMLFormElement, defaultPayment: PaymentMethod, submitHandler: IOrderStep1SubmitHandler): IOrderStep1Form;
}

/**
 * Интерфейс фабрики для создания формы шага 2 заказа
 */
export interface IOrderStep2FormFactory {
	/**
	 * Создает экземпляр формы шага 2 заказа
	 * @param form {HTMLFormElement} DOM-элемент формы
	 * @param submitHandler {IOrderStep2SubmitHandler} Обработчик отправки формы
	 * @param emailValidator {IValidator} Валидатор email
	 * @param phoneValidator {IValidator} Валидатор телефона
	 * @returns {IOrderStep2Form} Экземпляр формы шага 2
	 */
	create(form: HTMLFormElement, submitHandler: IOrderStep2SubmitHandler, emailValidator: IValidator, phoneValidator: IValidator): IOrderStep2Form;
}
