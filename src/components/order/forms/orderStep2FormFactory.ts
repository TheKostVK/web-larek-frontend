import { IOrderStep2SubmitHandler, IValidator, IOrderStep2Form, IOrderStep2FormFactory } from '../../../types';
import { OrderStep2Form } from './orderStep2Form';

/**
 * Фабрика для создания форм шага 2 заказа
 */
export class OrderStep2FormFactory implements IOrderStep2FormFactory {
	/**
	 * Создает экземпляр формы шага 2 заказа
	 * @param form DOM-элемент формы
	 * @param submitHandler Обработчик отправки формы
	 * @param emailValidator Валидатор email
	 * @param phoneValidator Валидатор телефона
	 * @returns Экземпляр формы шага 2
	 */
	public create(form: HTMLFormElement, submitHandler: IOrderStep2SubmitHandler, emailValidator: IValidator, phoneValidator: IValidator): IOrderStep2Form {
		return new OrderStep2Form(form, submitHandler, emailValidator, phoneValidator);
	}
}

