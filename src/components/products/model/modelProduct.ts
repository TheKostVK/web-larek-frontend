import { IModelProduct, IProduct } from '../../../types';

class ModelProduct implements IModelProduct {
	protected products: IProduct[] = [];
	protected itemsCount = 0;

	constructor(initialProducts: IProduct[] = []) {
		if (!Array.isArray(initialProducts)) {
			throw new Error('ModelProduct: initialProducts должно быть массивом товаров');
		}

		this.setProducts(initialProducts);
	}

	public setProducts(products: IProduct[]): void {
		if (!Array.isArray(products)) {
			throw new Error('ModelProduct: products должно быть массивом товаров');
		}

		this.products = products;
		this.itemsCount = products.length;
	}

	public getProducts(): IProduct[] {
		return this.products;
	}

	public getProductById(id: string): IProduct | undefined {
		if (typeof id !== 'string') {
			throw new Error('ModelProduct: неверный тип id');
		}

		return this.products.find((product) => product.id === id);
	}

	public getProductsCount(): number {
		return this.itemsCount;
	}
}

export default ModelProduct;
