import { IView } from '../view/view.interface';

export interface IViewModal<S extends object> extends Omit<IView<S>, 'update'> {
	/**
	 * Проверяет, открыто ли модальное окно
	 * @returns true, если модальное окно открыто
	 */
	isModalOpen(): boolean;

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
	 * Обновляет состояние и данные для рендеринга, вызывает render если модальное окно открыто
	 * @param newState - новое состояние компонента
	 * @param renderData - опциональные данные для рендеринга
	 */
	update(newState: S, renderData?: unknown): void;

	/**
	 * Закрывает модальное окно и размонтирует его
	 */
	closeModal(): void;
}