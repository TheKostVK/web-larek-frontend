import { Api, ApiListResponse } from '../base/api';
import { IAppApi, IProduct, IOrder, IPostOrderResponse } from '../../types';

/**
 * Единый API-сервис приложения
 */
export class AppApi extends Api implements IAppApi {
	constructor(baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
	}

	/**
	 * Получение списка товаров
	 */
	public async getProducts(): Promise<IProduct[]> {
		try {
			const response = await this.get<ApiListResponse<IProduct>>('product/');
			return response.items;
		} catch (error) {
			throw error instanceof Error ? error : new Error(String(error));
		}
	}

	/**
	 * Получение информации о конкретном товаре
	 * @param id Идентификатор товара
	 */
	public async getProductById(id: string): Promise<IProduct> {
		try {
			return await this.get<IProduct>(`product/${ id }`);
		} catch (error) {
			throw error instanceof Error ? error : new Error(String(error));
		}
	}

	/**
	 * Отправка данных заказа на сервер
	 * @param order Данные заказа
	 */
	public async postOrder(order: IOrder): Promise<IPostOrderResponse> {
		try {
			return await this.post<IPostOrderResponse>('order/', order);
		} catch (error) {
			throw error instanceof Error ? error : new Error(String(error));
		}
	}
}
