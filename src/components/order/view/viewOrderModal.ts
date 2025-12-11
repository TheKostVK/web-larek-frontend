import ViewModal from '../../viewModal/viewModal';
import { isOrder } from '../../../utils/utils';
import { PAYMENT_METHODS, SELECTORS } from '../../../utils/constants';
import {
	IOrder,
	IViewOrderModal,
} from '../../../types';

/**
 * Класс представления модального окна заказа
 */
class ViewOrderModal extends ViewModal<IOrder> implements IViewOrderModal {
	/**
	 * Конструктор класса ViewOrderModal
	 * @param modalContainer {HTMLElement | string} - DOM-элемент или селектор контейнера модального окна
	 */
	public constructor(modalContainer: HTMLElement | string = SELECTORS.IDS.MODAL_CONTAINER) {
		super(modalContainer, {
			items: [],
			payment: PAYMENT_METHODS[0],
			email: '',
			phone: '',
			address: '',
			total: 0,
		});
	}

	public update(orderData: IOrder, content?: HTMLElement): void {
		if (!isOrder(orderData)) return;

		super.update(orderData, content);
	}

	public render(): void {
		const modalContent: HTMLElement = (this.renderData as HTMLElement) || document.createElement('div');
		this.renderContent(modalContent);
	}
}

export default ViewOrderModal;