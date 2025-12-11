import { IProduct, ICard, ICardPreview, ICardBasket, ICardFactory } from '../../types';
import { CardProduct } from './cardProduct';
import { CardPreview } from './cardPreview';
import { CardBasket } from './cardBasket';

/**
 * Фабрика для создания карточек товаров
 * Реализует паттерн Factory для централизованного создания карточек разных типов
 */
export class CardFactory implements ICardFactory {
	/**
	 * Создает карточку товара для каталога
	 * @returns экземпляр CardProduct
	 */
	public createProductCard(): ICard {
		return new CardProduct();
	}

	/**
	 * Создает карточку товара для предпросмотра
	 * @returns экземпляр CardPreview
	 */
	public createPreviewCard(): ICardPreview {
		return new CardPreview();
	}

	/**
	 * Создает карточку товара для корзины
	 * @returns экземпляр CardBasket
	 */
	public createBasketCard(): ICardBasket {
		return new CardBasket();
	}
}
