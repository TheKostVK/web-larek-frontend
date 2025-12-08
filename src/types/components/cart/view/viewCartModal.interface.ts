import { ICart } from '../model/modelCart.interface';
import { IViewModal } from '../../viewModal/viewModal.interface';

/**
 * Интерфейс View корзины
 */
export interface IViewCartModal extends IViewModal<ICart> {
	/**
	 * Устанавливает колбэк на удаление товара из корзины
	 * @param callback {itemId: string} - принимает id товара
	 */
	setOnRemoveToCartCallback(callback: (itemId: string) => void): void;

	/**
	 * Устанавливает колбэк на нажатие оформления заказа
	 */
	setOnOrderCallback(callback: () => void): void;

	/**
	 * Обновляет отображение корзины по актуальным данным
	 * @param cartData объект корзины
	 */
	update(cartData: ICart): void;

	/**
	 * Демонтирует view корзины
	 */
	unmount(): void;

	/**
	 * Рендерит текущее состояние корзины в DOM
	 */
	render(): void;
}