import { ISuccessMessage, ISuccessMessageFactory } from '../../types/components/messages/successMessage.interface';
import { SuccessMessage } from './successMessage';

/**
 * Фабрика для создания успешных сообщений о заказе
 */
export class SuccessMessageFactory implements ISuccessMessageFactory {
	/**
	 * Создает экземпляр успешного сообщения о заказе
	 * @returns экземпляр SuccessMessage
	 */
	public create(): ISuccessMessage {
		return new SuccessMessage();
	}
}

