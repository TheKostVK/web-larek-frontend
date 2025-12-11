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