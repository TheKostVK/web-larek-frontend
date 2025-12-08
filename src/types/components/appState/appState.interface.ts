/**
 * Интерфейс корневого состояния приложения Application State
 */
export interface IAppState {
	/**
	 * Инициализация приложения:
	 * - загрузка данных
	 */
	init(): Promise<void>;
}