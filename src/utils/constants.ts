import { OrderStep, PaymentMethod } from '../types/components/order/model/modelOrder.interface';

export const API_URL = `${ process.env.API_ORIGIN }/api/weblarek`;
export const CDN_URL = `${ process.env.API_ORIGIN }/content/weblarek`;

export const settings = {
	cartStorageKey: 'cart-v1',
	validationSettings: {
		formSelector: '.form',
		inputSelector: '.form__input',
		submitButtonSelector: 'button[type="submit"]',
		inactiveButtonClass: 'button_disabled',
		inputErrorClass: 'form__input_error',
		errorClass: 'form__field-error--show',
	},
};

export const SYSTEM_NAME_SPACE = {
	PRODUCT_MODAL: 'PRODUCT_MODAL',
	CART_MODAL: 'CART_MODAL',
	ORDER_MODAL: 'ORDER_MODAL',
} as const;

export const SYSTEM_EVENTS = {
	MODAL_OPEN: 'MODAL_OPEN',
	MODAL_CLOSE: 'MODAL_CLOSE',
} as const;

export const ORDER_EVENTS = {
	ORDER_SUBMIT: 'ORDER_SUBMIT',
	ORDER_STEP: 'ORDER_STEP',
} as const;

export const CART_EVENTS = {
	CART_LOADED: 'CART_LOADED',
	CART_PRODUCT_ADD: 'CART_PRODUCT_ADD',
	CART_PRODUCT_DELETE: 'CART_PRODUCT_DELETE',
	CART_COMPLETE: 'CART_COMPLETE',
	CART_CHECK_ITEM: 'CART_CHECK_ITEM',
} as const;

export const PRODUCT_EVENTS = {
	PRODUCTS_LOADED: 'PRODUCTS_LOADED',
	PRODUCTS_LOAD_FAILED: 'PRODUCTS_LOAD_FAILED',

	PRODUCT_CLICK: 'PRODUCT_CLICK',
	PRODUCT_SELECTED: 'PRODUCT_SELECTED',
} as const;

export const PAYMENT_METHODS: PaymentMethod[] = ['online', 'offline'];
export const ORDER_STEP: OrderStep[] = ['1', '2', '3', '4'];
export const DEFAULT_ORDER_STEP: OrderStep = ORDER_STEP[0];
export const REG_EXP_EMAIL = /^[\wА-Яа-яёЁ.%+-]+@[A-Za-zА-Яа-яёЁ0-9-]+(?:\.[A-Za-zА-Яа-яёЁ0-9-]+)+$/;
export const REG_EXP_PHONE = /^(\+7|8)\D*\d{3}\D*\d{3}\D*\d{2}\D*\d{2}$/;

/**
 * Селекторы DOM элементов
 */
export const SELECTORS = {
	// ID элементов
	IDS: {
		MODAL_CONTAINER: '#modal-container',
		CARD_CATALOG: '#card-catalog',
		CARD_PREVIEW: '#card-preview',
		CARD_BASKET: '#card-basket',
		BASKET: '#basket',
		ORDER: '#order',
		CONTACTS: '#contacts',
		SUCCESS: '#success',
		ORDER_ERROR: '#order-error',
	},

	// Классы модального окна
	MODAL: {
		MODAL: '.modal',
		CONTAINER: '.modal__container',
		CONTENT: '.modal__content',
		CLOSE: '.modal__close',
		ACTIVE: 'modal_active',
		OPEN: 'modal_open',
		TITLE: '.modal__title',
		ACTIONS: '.modal__actions',
	},

	// Классы галереи
	GALLERY: {
		GALLERY: '.gallery',
		ITEM: '.gallery__item',
	},

	// Классы карточки
	CARD: {
		CARD: '.card',
		TITLE: '.card__title',
		PRICE: '.card__price',
		IMAGE: '.card__image',
		CATEGORY: '.card__category',
		TEXT: '.card__text',
		BUTTON: '.card__button',
		BUTTON_CLASS: 'card__button',
		ROW: '.card__row',
		COLUMN: '.card__column',
		FULL: 'card_full',
		COMPACT: 'card_compact',
	},

	// Классы хедера
	HEADER: {
		HEADER: '.header',
		CONTAINER: '.header__container',
		LOGO: '.header__logo',
		LOGO_IMAGE: '.header__logo-image',
		BASKET: '.header__basket',
		BASKET_COUNTER: '.header__basket-counter',
	},

	// Классы корзины
	BASKET: {
		BASKET: '.basket',
		LIST: '.basket__list',
		ITEM: '.basket__item',
		ITEM_INDEX: '.basket__item-index',
		ITEM_DELETE: '.basket__item-delete',
		ITEM_DELETE_CLASS: 'basket__item-delete',
		BUTTON: '.basket__button',
		BUTTON_CLASS: 'basket__button',
		PRICE: '.basket__price',
	},

	// Классы формы
	FORM: {
		FORM: '.form',
		INPUT: '.form__input',
		LABEL: '.form__label',
		ERRORS: '.form__errors',
	},

	// Классы заказа
	ORDER: {
		ORDER: '.order',
		FIELD: '.order__field',
		BUTTONS: '.order__buttons',
		BUTTON: '.order__button',
	},

	// Классы успешного заказа
	ORDER_SUCCESS: {
		ORDER_SUCCESS: '.order-success',
		TITLE: '.order-success__title',
		ID: '.order-success__id',
		DESCRIPTION: '.order-success__description',
		CLOSE: '.order-success__close',
	},

	// Классы ошибки заказа
	ORDER_ERROR: {
		ORDER_ERROR: '.order-error',
		TITLE: '.order-error__title',
		DESCRIPTION: '.order-error__description',
		CLOSE: '.order-error__close',
	},

	// Классы кнопок
	BUTTON: {
		BUTTON: '.button',
		BUTTON_CLASS: 'button',
		ALT: 'button_alt',
		ALT_ACTIVE: 'button_alt-active',
		DISABLED: 'button_disabled',
	},

	// Классы страницы
	PAGE: {
		PAGE: '.page',
		WRAPPER: '.page__wrapper',
	},
} as const;

/**
 * Атрибуты элементов
 */
export const ATTRIBUTES = {
	NAME: {
		ADDRESS: 'address',
		EMAIL: 'email',
		PHONE: 'phone',
		CARD: 'card',
		CASH: 'cash',
	},
	TYPE: {
		SUBMIT: 'submit',
		BUTTON: 'button',
		TEXT: 'text',
	},
} as const;

/**
 * Теги HTML
 */
export const TAGS = {
	BUTTON: 'button',
	INPUT: 'input',
	FORM: 'form',
	TEMPLATE: 'template',
} as const;