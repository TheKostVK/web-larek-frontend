import { IView } from '../view/view.interface';

export interface IViewModal<S extends object> extends IView<S> {
	/**
	 * Задаёт функцию коллбек на закрытие модального окна
	 * @param callback - функция коллбек
	 */
	setOnCloseModalCallback(callback: () => void): void;

	/**
	 * Задаёт функцию коллбек на открытие модального окна
	 * @param callback - функция коллбек
	 */
	setOnOpenModalCallback(callback: () => void): void;

	/**
	 * Открывает модальное окно
	 */
	openModal(): void;

	/**
	 * Закрывает модальное окно
	 */
	closeModal(): void;
}