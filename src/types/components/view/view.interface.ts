/**
 * Базовый интерфейс для всех View
 */
export interface IView<S extends object> {
	/**
	 * Монтирование элемента в DOM
	 */
	mount(): void;

	/**
	 * Демонтирование элемента из DOM
	 */
	unmount(): void;

	/**
	 * Обновление состояния view и повторный рендер
	 * @param newState частичное состояние
	 */
	update(newState: Partial<S>): void;

	/**
	 * Получение корневого HTML-элемента View
	 */
	getElement(): HTMLElement | null;

	/**
	 * Рендер компонента
	 */
	render(): void;
}