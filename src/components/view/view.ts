import { IView } from '../../types';
import { ensureElement } from '../../utils/utils';

/**
 * Базовый абстрактный класс для View
 */
export abstract class View<S extends object> implements IView<S> {
	protected el: HTMLElement | null;
	protected state: S;
	protected isMounted = false;
	protected isEventListeners = false;

	/**
	 * @param root DOM-элемент или селектор корневого элемента
	 * @param initialState начальное состояние компонента
	 */
	protected constructor(root: HTMLElement | string, initialState: S) {
		this.el = ensureElement(root);
		this.state = initialState;
	}

	/**
	 * Смонтировать компонент
	 */
	public mount(): void {
		this.isMounted = true;
		this.render();
	}

	/**
	 * Демонтировать компонент.
	 */
	public unmount(): void {
		this.isMounted = false;
		this.el.innerHTML = '';
	}

	/**
	 * Обновить состояние компонента и перерисовать его
	 * @param newState частичное состояние
	 */
	public update(newState: Partial<S>): void {
		this.state = {
			...this.state,
			...newState,
		};

		if (this.isMounted) {
			this.render();
		}
	}

	/**
	 * Получить корневой DOM-элемент компонента
	 */
	public getElement(): HTMLElement | null {
		return this.el;
	}

	/**
	 * Абстрактный метод отрисовки
	 */
	public abstract render(): void;
}
