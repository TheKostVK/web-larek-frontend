import { ICart } from '../model/modelCart.interface';
import { IViewModal } from '../../viewModal/viewModal.interface';
import { ICardBasket } from '../../cards/card.interface';

/**
 * Интерфейс View корзины
 */
export interface IViewCartModal extends IViewModal<ICart> {
	/**
	 * Устанавливает колбэк на нажатие оформления заказа
	 */
	setOnOrderCallback(callback: () => void): void;

	/**
	 * Обновляет отображение корзины по актуальным данным
	 * @param cartData объект корзины
	 * @param cards опциональный массив готовых карточек товаров
	 */
	update(cartData: ICart, cards?: ICardBasket[]): void;
}