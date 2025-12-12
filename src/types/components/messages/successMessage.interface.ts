/**
 * Интерфейс для компонента успешного сообщения о заказе
 */
export interface ISuccessMessage {
	/**
	 * Устанавливает данные заказа
	 * @param orderId - идентификатор заказа
	 * @param total - итоговая стоимость заказа
	 */
	setOrderData(orderId: string, total: number): void;

	/**
	 * Устанавливает обработчик на кнопку закрытия
	 * @param callback - функция-обработчик
	 */
	setOnCloseCallback(callback: () => void): void;

	/**
	 * Возвращает контейнер сообщения
	 * @returns DOM-элемент контейнера
	 */
	getContainer(): HTMLElement;
}

/**
 * Интерфейс фабрики для создания успешных сообщений о заказе
 */
export interface ISuccessMessageFactory {
	/**
	 * Создает экземпляр успешного сообщения о заказе
	 * @returns экземпляр ISuccessMessage
	 */
	create(): ISuccessMessage;
}

