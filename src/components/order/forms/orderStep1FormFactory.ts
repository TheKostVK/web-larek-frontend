import { PaymentMethod, IOrderStep1SubmitHandler, IOrderStep1Form, IOrderStep1FormFactory } from '../../../types';
import { OrderStep1Form } from './orderStep1Form';

/**
 * Фабрика для создания форм шага 1 заказа
 */
export class OrderStep1FormFactory implements IOrderStep1FormFactory {
	/**
	 * Создает экземпляр формы шага 1 заказа
	 * @param form DOM-элемент формы
	 * @param defaultPayment Способ оплаты по умолчанию
	 * @param submitHandler Обработчик отправки формы
	 * @returns Экземпляр формы шага 1
	 */
	public create(form: HTMLFormElement, defaultPayment: PaymentMethod, submitHandler: IOrderStep1SubmitHandler): IOrderStep1Form {
		return new OrderStep1Form(form, defaultPayment, submitHandler);
	}
}

