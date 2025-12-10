import { isCart, isProduct } from '../../../utils/utils';
import { settings } from '../../../utils/constants';
import { ICart, IModelCart, IProduct } from '../../../types';

class ModelCart implements IModelCart {
	protected cartData: ICart = {
		items: [],
		itemsCount: 0,
		totalPrice: 0,
	};

	public init(cartData: ICart): void {
		if (!isCart(cartData)) return;

		this.cartData = cartData;
	}

	public addItem(item: IProduct): void {
		if (!isProduct(item)) return;

		if (this.getItemById(item.id) !== null) return;

		this.cartData.items.push(item);
		this.cartData.itemsCount = this.cartData.items.length;
		this.cartData.totalPrice += item.price;

		localStorage.setItem(settings.cartStorageKey, JSON.stringify(this.getCartData()));
	}

	public removeItem(itemId: string): void {
		if (typeof itemId !== 'string') return;

		if (this.getItemById(itemId) === null) return;

		this.cartData.items = this.cartData.items.filter(item => item.id !== itemId);
		this.cartData.itemsCount = this.cartData.items.length;
		this.cartData.totalPrice = this.cartData.items.reduce<number>((acc, item) => acc + item.price, 0);

		localStorage.setItem(settings.cartStorageKey, JSON.stringify(this.getCartData()));
	}

	public clearCart(): void {
		this.cartData = {
			items: [],
			itemsCount: 0,
			totalPrice: 0,
		};

		localStorage.setItem(settings.cartStorageKey, JSON.stringify(this.getCartData()));
	}

	public getTotalPrice(): number {
		return this.cartData.totalPrice;
	}

	public getItemsCount(): number {
		return this.cartData.itemsCount;
	}

	public getItems(): IProduct[] {
		return this.cartData.items;
	}

	public getItemById(id: string): IProduct | null {
		if (typeof id !== 'string' || !id.trim()) {
			return null;
		}

		const item = this.cartData.items.find(product => product.id === id);

		return item ?? null;
	}

	public getCartData(): ICart {
		return this.cartData;
	}
}

export default ModelCart;