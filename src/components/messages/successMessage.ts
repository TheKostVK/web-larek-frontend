import { cloneTemplate } from '../../utils/utils';
import { SELECTORS } from '../../utils/constants';
import { ISuccessMessage } from '../../types/components/messages/successMessage.interface';

/**
 * Класс для отображения успешного сообщения о заказе
 */
export class SuccessMessage implements ISuccessMessage {
	protected template: HTMLTemplateElement | null = document.querySelector(SELECTORS.IDS.SUCCESS);
	protected container: HTMLElement;
	protected title: HTMLElement | null = null;
	protected orderId: HTMLElement | null = null;
	protected description: HTMLElement | null = null;
	protected closeButton: HTMLButtonElement | null = null;

	/**
	 * Конструктор класса SuccessMessage
	 */
	constructor() {
		if (!this.template) {
			throw new Error('SuccessMessage: шаблон успешного сообщения не найден');
		}

		this.container = cloneTemplate<HTMLElement>(this.template);
		this.title = this.container.querySelector(SELECTORS.ORDER_SUCCESS.TITLE) as HTMLElement | null;
		this.orderId = this.container.querySelector(SELECTORS.ORDER_SUCCESS.ID) as HTMLElement | null;
		this.description = this.container.querySelector(SELECTORS.ORDER_SUCCESS.DESCRIPTION) as HTMLElement | null;
		this.closeButton = this.container.querySelector(SELECTORS.ORDER_SUCCESS.CLOSE) as HTMLButtonElement | null;
	}

	/**
	 * Устанавливает данные заказа
	 * @param orderId {string} - идентификатор заказа
	 * @param total {number} - итоговая стоимость заказа
	 */
	public setOrderData(orderId: string, total: number): void {
		if (this.description) {
			this.description.textContent = `Списано ${ total } синапсов`;
		}

		if (this.orderId) {
			this.orderId.textContent = `Номер заказа: ${ orderId }`;
		}
	}

	/**
	 * Устанавливает обработчик на кнопку закрытия
	 * @param callback {() => void} - функция-обработчик
	 */
	public setOnCloseCallback(callback: () => void): void {
		if (this.closeButton && typeof callback === 'function') {
			this.closeButton.addEventListener('click', callback);
		}
	}

	/**
	 * Возвращает контейнер сообщения
	 * @returns {HTMLElement} - DOM-элемент контейнера
	 */
	public getContainer(): HTMLElement {
		return this.container;
	}
}
