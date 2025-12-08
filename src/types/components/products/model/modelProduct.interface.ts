/**
 * DTO товара
 */
export interface IProduct {
	/**
	 * Идентификатор товара
	 */
	id: string;

	/**
	 * Название товара
	 */
	title: string;

	/**
	 * Описание товара
	 */
	description: string;

	/**
	 * Категория товара
	 */
	category: string;

	/**
	 * Цена товара
	 */
	price: number | null;

	/** 
	 Путь к изображению товара 
	 */
	image: string;
}

export type CartCheckRequest = {
	productId: string;
	respond: (inCart: boolean) => void;
};

/**
 * Модель работы с товарами
 */
export interface IModelProduct {
	/**
	 * Полностью перезаписывает список товаров в модели
	 * @param products {IProduct[]} товары
	 */
	setProducts(products: IProduct[]): void;

	/**
	 * Получение списка товаров
	 */
	getProducts(): IProduct[];

	/**
	 * Получение товара по id
	 * @param id {string} - id искомого товара
	 */
	getProductById(id: string): IProduct | undefined;

	/**
	 * Получение количества товаров в модели
	 */
	getProductsCount(): number;
}
