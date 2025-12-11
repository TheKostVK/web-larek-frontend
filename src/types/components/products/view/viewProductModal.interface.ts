import { IProduct } from '../model/modelProduct.interface';
import { IViewModal } from '../../viewModal/viewModal.interface';

export interface IViewProductModal extends IViewModal<IProduct> {
	/**
	 * Обновляет состояние модального окна данными товара
	 * @param product Товар, который нужно отобразить
	 * @param content Опциональный готовый контент для отображения
	 */
	update(product: IProduct, content?: HTMLElement): void;

	/**
	 * Размонтирует модальное окно
	 */
	unmount(): void;

	/**
	 * Устанавливает колбэк, который вызывается при добавлении товара в корзину
	 * @param callback {(product: IProduct) => void} - функция принимает товар
	 */
	setOnAddToCartCallback(callback: (product: IProduct) => void): void;

	/**
	 * Устанавливает значение объекта, существует ли он в корзине
	 * @param inCart {boolean} - флаг
	 */
	setInCartState(inCart: boolean): void;

	/**
	 * Рендерит содержимое модального окна
	 */
	render(): void;
}