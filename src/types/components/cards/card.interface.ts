import { IProduct } from '../products/model/modelProduct.interface';

export interface ICard {
	render(product: IProduct): void;
	getContainer(): HTMLElement;
}

export interface ICardBasket extends ICard {
	render(product: IProduct, index?: number): void;
}

export interface ICardPreview extends ICard {
	render(product: IProduct, inCart?: boolean): void;
}
