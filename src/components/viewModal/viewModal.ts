import { View } from '../view/view';
import { IViewModal } from '../../types';
import { ensureElement, shouldCloseModalOnClick, shouldCloseModalOnKeyDown } from '../../utils/utils';
import { SELECTORS } from '../../utils/constants';

/**
 * Базовый абстрактный класс для модальных окон
 */
abstract class ViewModal<S extends object> extends View<S> implements IViewModal<S> {
	protected onCloseModalCallback: () => void | null = null;
	protected onOpenModalCallback: () => void | null = null;
	protected scrollY = 0;
	protected modalContentHTML: HTMLElement | null = null;
	protected isBaseEventListeners = false;
	protected renderData: unknown = null;

	public isModalOpen(): boolean {
		return this.el?.classList.contains(SELECTORS.MODAL.ACTIVE) ?? false;
	}

	/**
	 * Конструктор базового класса ViewModal
	 * @param root {HTMLElement | string} - DOM-элемент или селектор контейнера модального окна
	 * @param initialState {S} - начальное состояние компонента типа S
	 */
	protected constructor(root: HTMLElement | string, initialState: S) {
		super(root, initialState);
		this.modalContentHTML = ensureElement(SELECTORS.MODAL.CONTENT, this.el);
	}

	/**
	 * Задаёт функцию коллбек на закрытие модального окна
	 * @param callback {() => void} - функция коллбек
	 */
	public setOnCloseModalCallback(callback: () => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onCloseModalCallback = callback;
	}

	/**
	 * Задаёт функцию коллбек на открытие модального окна
	 * @param callback {() => void} - функция коллбек
	 */
	public setOnOpenModalCallback(callback: () => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onOpenModalCallback = callback;
	}

	public openModal(): void {
		this.scrollY = window.scrollY || window.pageYOffset;

		document.body.style.position = 'fixed';
		document.body.style.top = `-${ this.scrollY }px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';
		document.body.classList.add(SELECTORS.MODAL.OPEN);

		this.el.classList.add(SELECTORS.MODAL.ACTIVE);
		
		if (!this.isBaseEventListeners) {
			this.el.addEventListener('click', this.clickEvent);
			document.body.addEventListener('keydown', this.keyDownEvent);
			this.isBaseEventListeners = true;
		}
	}

	public update(newState: S, renderData?: unknown): void {
		this.state = newState;
		this.renderData = renderData;

		if (renderData !== undefined) {
			if (this.isModalOpen() || this.el) {
				if (!this.isMounted) {
					this.mount();
				} else {
					this.render();
				}
			}
		}
	}

	public closeModal(): void {
		this.el.classList.remove(SELECTORS.MODAL.ACTIVE);
		document.body.classList.remove(SELECTORS.MODAL.OPEN);
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.left = '';
		document.body.style.right = '';
		document.body.style.width = '';

		window.scrollTo({
			top: this.scrollY,
			left: 0,
		});

		this.unmount();
	}

	protected clickEvent = (evt: MouseEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (shouldCloseModalOnClick(evt)) {
			if (this.onCloseModalCallback) {
				this.onCloseModalCallback();
			} else {
				this.closeModal();
			}
			return;
		}
	};

	protected keyDownEvent = (evt: KeyboardEvent): void => {
		if (!(evt.target instanceof HTMLElement)) return;

		if (shouldCloseModalOnKeyDown(evt)) {
			if (this.onCloseModalCallback) {
				this.onCloseModalCallback();
			} else {
				this.closeModal();
			}
			return;
		}
	};

	public unmount(): void {
		this.isMounted = false;

		if (this.isBaseEventListeners) {
			this.el.removeEventListener('click', this.clickEvent);
			document.body.removeEventListener('keydown', this.keyDownEvent);
			this.isBaseEventListeners = false;
		}

		this.removeCustomEventListeners();

		if (this.modalContentHTML) {
			this.modalContentHTML.replaceChildren();
		}
	}

	protected validateElements(): void {
		if (!this.el || !this.modalContentHTML) {
			throw new Error(`${this.constructor.name}: корневой элемент не найден`);
		}
	}

	protected renderContent(content: HTMLElement): void {
		this.validateElements();

		if (!this.modalContentHTML) {
			return;
		}

		this.modalContentHTML.replaceChildren();
		this.modalContentHTML.appendChild(content);
		this.isMounted = true;
	}

	protected setupCustomEventListeners(): void {
	}

	protected removeCustomEventListeners(): void {
	}

	public abstract render(): void;
}

export default ViewModal;