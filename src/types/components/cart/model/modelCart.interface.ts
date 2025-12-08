import { IProduct } from '../../products/model/modelProduct.interface';

export interface ICart {
	items: IProduct[];
	itemsCount: number;
	totalPrice: number;
}

/**
 * Интерфейс модели корзины
 */
export interface IModelCart {
	/**
	 * Инициализация модели из готовых данных корзины
	 */
	init(cartData: ICart): void;

	/**
	 * Добавляет товар в корзину
	 * @param item Товар
	 */
	addItem(item: IProduct): void;

	/**
	 * Удаляет товар по id + пересчитывает состояние корзины
	 * @param itemId Идентификатор товара
	 */
	removeItem(itemId: string): void;

	/**
	 * Полностью очищает корзину
	 */
	clearCart(): void;

	/**
	 * Возвращает итоговую цену корзины
	 */
	getTotalPrice(): number;

	/**
	 * Количество товаров в корзине
	 */
	getItemsCount(): number;

	/**
	 * Список товаров в корзине
	 */
	getItems(): IProduct[];

	/**
	 * Получение товара из корзины по id
	 * @param id {string} - id товара
	 */
	getItemById(id: string): IProduct | null;

	/**
	 * Полные данные корзины
	 */
	getCartData(): ICart;
}