import { View } from '../view/view';
import { IViewModal } from '../../types';
import { ensureElement, shouldCloseModalOnClick, shouldCloseModalOnKeyDown } from '../../utils/utils';

abstract class ViewModal<S extends object> extends View<S> implements IViewModal<S> {
	protected onCloseModalCallback: () => void | null = null;
	protected onOpenModalCallback: () => void | null = null;
	protected scrollY = 0;

	public setOnCloseModalCallback(callback: () => void): void {
		if (typeof callback !== 'function') {
			return;
		}

		this.onCloseModalCallback = callback;
	}

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
		document.body.classList.add('modal_open');

		this.el.classList.add('modal_active');
		document.body.classList.add('modal_open');
		this.mount();
	}

	public closeModal(): void {
		this.el.classList.remove('modal_active');
		document.body.classList.remove('modal_open');

		document.body.classList.remove('modal_open');
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
		const modalContentHTML: HTMLElement = ensureElement('.modal__content', this.el);

		if (this.isEventListeners) {
			this.el.removeEventListener('click', this.clickEvent);
			document.body.removeEventListener('keydown', this.keyDownEvent);
			this.isEventListeners = false;
		}

		modalContentHTML.innerHTML = '';
	}

	public abstract render(): void;
}

export default ViewModal;