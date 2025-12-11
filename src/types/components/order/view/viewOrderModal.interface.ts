import { IViewModal } from '../../viewModal/viewModal.interface';
import { IOrder, OrderStep } from '../model/modelOrder.interface';

/**
 * Интерфейс View модального окна оформления заказа
 */
export interface IViewOrderModal extends IViewModal<IOrder> {
	/**
	 * Обновляет состояние UI на основе данных заказа
	 * @param orderData {IOrder} Текущее состояние заказа
	 * @param content {HTMLElement} Опциональный готовый контент для отображения
	 */
	update(orderData: IOrder, content?: HTMLElement): void;
}