import { IEvents } from '../components/base/events';
import { IProduct } from '../types/components/products/model/modelProduct.interface';
import { ICart } from '../types/components/cart/model/modelCart.interface';
import { IOrder, PaymentMethod } from '../types/components/order/model/modelOrder.interface';
import { PAYMENT_METHODS } from './constants';

export function pascalToKebab(value: string): string {
	return value.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function isSelector(x: unknown): x is string {
	return typeof x === 'string' && x.length > 1;
}

export function isEmpty(value: unknown): boolean {
	return value === null || value === undefined;
}

export function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Проверяет, должен ли клик привести к закрытию модального окна
 */
export function shouldCloseModalOnClick(evt: MouseEvent): boolean {
	const target = evt.target as HTMLElement | null;
	if (!target) {
		return false;
	}

	if (target.closest('.modal__close')) {
		return true;
	}

	if (!target.closest('.modal__container')) {
		return true;
	}

	return false;
}

/**
 * Проверяет, должен ли модальное окно закрываться по нажатию клавиши
 */
export function shouldCloseModalOnKeyDown(evt: KeyboardEvent): boolean {
	return evt.key === 'Escape';
}

/**
 * Проверка соответствия объекта типу PaymentMethod
 */
export function isPaymentMethod(value: unknown): value is PaymentMethod {
	return typeof value === 'string' && PAYMENT_METHODS.includes(value as PaymentMethod);
}

/**
 * Проверка соответствия объекта интерфейсу IEvents
 */
export function isIEvents(obj: unknown): obj is IEvents {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}
	
	const eventObj = obj as Record<string, unknown>;
	return (
		typeof eventObj.on === 'function' &&
		typeof eventObj.emit === 'function' &&
		typeof eventObj.trigger === 'function'
	);
}

/**
 * Проверка соответствия объекта интерфейсу IProduct
 */
export function isProduct(obj: unknown): obj is IProduct {
	if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
		return false;
	}

	const p = obj as Record<string, unknown>;

	return (
		typeof p.id === 'string' &&
		typeof p.title === 'string' &&
		typeof p.description === 'string' &&
		typeof p.category === 'string' &&

		(p.price === null || typeof p.price === 'number') &&

		typeof p.image === 'string'
	);
}

/**
 * Проверяет, что объект соответствует типу ICart.
 *
 * @param obj Неизвестный объект
 * @returns true — если obj является ICart
 */
export function isCart(obj: unknown): obj is ICart {
	if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
		return false;
	}

	const c = obj as Record<string, unknown>;

	if (!Array.isArray(c.items) || !c.items.every(isProduct)) {
		return false;
	}

	return (
		typeof c.itemsCount === 'number' && typeof c.totalPrice === 'number'
	);
}

/**
 * Проверяет, что объект соответствует типу IOrder.
 *
 * @param obj Неизвестный объект
 * @returns true — если obj является IOrder
 */
export function isOrder(obj: unknown): obj is IOrder {
	if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
		return false;
	}

	const o = obj as Record<string, unknown>;

	if (!('items' in o) ||
		!('payment' in o) ||
		!('email' in o) ||
		!('phone' in o) ||
		!('address' in o) ||
		!('total' in o)
	) {
		return false;
	}

	return (
		isStringArray(o.items) &&
		isPaymentMethod(o.payment) &&
		typeof o.email === 'string' &&
		typeof o.phone === 'string' &&
		typeof o.address === 'string' &&
		typeof o.total === 'number' && Number.isFinite(o.total) && o.total >= 0
	);
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document as unknown as HTMLElement,
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement)) as T[];
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[];
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement;
	}
	throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(
	selectorElement: SelectorElement<T>,
	context?: HTMLElement,
): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context);
		if (elements.length > 1) {
			console.warn(`selector ${ selectorElement } return more then one element`);
		}
		if (elements.length === 0) {
			throw new Error(`selector ${ selectorElement } return nothing`);
		}
		return elements.pop() as T;
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement as T;
	}
	throw new Error('Unknown selector element');
}

export function cloneTemplate<T extends HTMLElement>(
	query: string | HTMLTemplateElement,
): T {
	const template = ensureElement(query) as HTMLTemplateElement;
	return template.content.firstElementChild.cloneNode(true) as T;
}

export function bem(
	block: string,
	element?: string,
	modifier?: string,
): { name: string; class: string } {
	let name = block;
	if (element) name += `__${ element }`;
	if (modifier) name += `_${ modifier }`;
	return {
		name,
		class: `.${ name }`,
	};
}

/**
 * Возвращает класс по названию тега
 * @param tagName {string} тег из объекта товара
 */
export function getClassFromTag(
	tagName: string,
): string {
	const data = tagName.replace(/-скил$/i, '');

	switch (data) {
		case 'другое': {
			return `card__category_other`;
		}
		case 'дополнительное': {
			return `card__category_additional`;
		}
		case 'кнопка': {
			return `card__category_button`;
		}
		case 'софт': {
			return `card__category_soft`;
		}
		case 'hard': {
			return `card__category_hard`;
		}
	}

	return 'card__category';
}

export function getObjectProperties(
	obj: object,
	filter?: (name: string, prop: PropertyDescriptor) => boolean,
): string[] {
	return Object.entries(
		Object.getOwnPropertyDescriptors(Object.getPrototypeOf(obj)),
	)
		.filter(([name, prop]: [string, PropertyDescriptor]) =>
			filter ? filter(name, prop) : name !== 'constructor',
		)
		.map(([name, prop]) => name);
}

/**
 * Устанавливает dataset атрибуты элемента
 */
export function setElementData<T extends Record<string, unknown> | object>(
	el: HTMLElement,
	data: T,
) {
	for (const key in data) {
		el.dataset[key] = String(data[key]);
	}
}

/**
 * Получает типизированные данные из dataset-атрибутов элемента
 */
export function getElementData<T extends object>(
	el: HTMLElement,
	scheme: { [K in keyof T]: (value: string | undefined) => T[K] },
): T {
	const data = {} as Partial<T>;

	(Object.keys(scheme) as (keyof T)[]).forEach((key) => {
		const raw = el.dataset[key as string];
		const convert = scheme[key];

		data[key] = convert(raw);
	});

	return data as T;
}

/**
 * Проверка на простой объект
 */
export function isPlainObject(obj: unknown): obj is object {
	const prototype = Object.getPrototypeOf(obj);
	return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
	return typeof v === 'boolean';
}

/**
 * Фабрика DOM-элементов в простейшей реализации
 * здесь не учтено много факторов
 * в интернет можно найти более полные реализации
 */
export function createElement<T extends HTMLElement>(
	tagName: keyof HTMLElementTagNameMap,
	props?: Partial<Record<keyof T, string | boolean | object>>,
	children?: HTMLElement | HTMLElement[],
): T {
	const element = document.createElement(tagName) as T;
	if (props) {
		for (const key in props) {
			const value = props[key];
			if (isPlainObject(value) && key === 'dataset') {
				setElementData(element, value);
			} else {
				const elementKey = key as keyof HTMLElement;
				if (elementKey in element) {
					const elementValue = element[elementKey];
					if (typeof elementValue === 'string' || typeof elementValue === 'boolean') {
						(element as Record<string, unknown>)[key] = isBoolean(value) ? value : String(value);
					}
				}
			}
		}
	}
	if (children) {
		for (const child of Array.isArray(children) ? children : [children]) {
			element.append(child);
		}
	}
	return element;
}
