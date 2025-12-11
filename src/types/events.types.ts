import { IProduct, ICart, OrderStep } from './index';

/**
 * Типы payload для событий системы
 */

export interface IModalEventPayload {
	modalName: string;
}

export interface IOrderStepEventPayload {
	step: OrderStep;
}

export interface ICartCheckRequestPayload {
	productId: string;
	respond: (inCart: boolean) => void;
}

/**
 * Типы событий для типизации
 */
export type ProductEventsPayload = {
	PRODUCTS_LOADED: void;
	PRODUCTS_LOAD_FAILED: void;
	PRODUCT_CLICK: IProduct;
	PRODUCT_SELECTED: IProduct;
};

export type CartEventsPayload = {
	CART_LOADED: void;
	CART_PRODUCT_ADD: IProduct;
	CART_PRODUCT_DELETE: void;
	CART_COMPLETE: ICart;
	CART_CHECK_ITEM: ICartCheckRequestPayload;
};

export type OrderEventsPayload = {
	ORDER_SUBMIT: void;
	ORDER_STEP: IOrderStepEventPayload;
};

export type SystemEventsPayload = {
	MODAL_OPEN: IModalEventPayload;
	MODAL_CLOSE: IModalEventPayload;
};
