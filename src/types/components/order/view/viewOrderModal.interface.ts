import { IViewModal } from '../../viewModal/viewModal.interface';
import { IOrder, OrderStep } from '../model/modelOrder.interface';

/**
 * Интерфейс View модального окна оформления заказа
 */
export interface IViewOrderModal extends IViewModal<IOrder> {
	/**
	 * Обновляет состояние UI на основе данных заказа
	 * @param orderData {IOrder} Текущее состояние заказа
	 */
	update(orderData: IOrder): void;

	/**
	 * Устанавливает активный шаг оформления
	 * @param step {OrderStep} Номер шага
	 */
	setStep(step: OrderStep): void;

	/**
	 * Колбэк перехода с шага 1
	 * @param callback (payment, address) → void
	 */
	setDataStep1Callback(callback: (payment: string, address: string) => void): void;

	/**
	 * Колбэк перехода с шага 2 (email + телефон)
	 * @param callback (email, phone) → void
	 */
	setDataStep2Callback(callback: (email: string, phone: string) => void): void;

	/**
	 * Колбэк шага 3 (успешное завершение)
	 */
	setDataStep3Callback(callback: () => void): void;

	/**
	 * Демонтирует представление
	 */
	unmount(): void;

	/**
	 * Рендерит UI текущего шага оформления
	 */
	render(): void;

	/**
	 * Отображает состояние загрузки на шаге 2
	 * @param isLoading {boolean}
	 */
	setStep2Loading(isLoading: boolean): void;

	/**
	 * Отображает результат успешного оформления заказа на шаге 3
	 * @param orderId {string} Идентификатор сформированного заказа
	 * @param total {string} Итоговая стоимость заказа
	 */
	setOrderResult(orderId: string, total: number): void;

	/**
	 * Переключает UI на шаг ошибки (4) и отображает сообщение
	 * @param message {string} Текст ошибки от сервера или системы
	 */
	setOrderError(message: string): void;
}