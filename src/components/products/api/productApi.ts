import { Api, ApiListResponse } from '../../base/api';
import { IProduct, IProductApi } from '../../../types';

/**
 * API для работы с товарами
 */
export class ProductApi extends Api implements IProductApi {
	protected static readonly URI = 'product/';
	protected isLoading = false;
	protected error: Error | null = null;

	constructor(baseUrl: string, options: RequestInit = {}) {
		super(`${ baseUrl }/${ ProductApi.URI }`, options);
	}

	/**
	 * Получение списка товаров
	 */
	public async getProducts(): Promise<IProduct[]> {
		this.isLoading = true;
		this.error = null;

		try {
			const response = await this.get<ApiListResponse<IProduct>>('');
			return response.items;
		} catch (error) {
			this.error = error instanceof Error ? error : new Error(String(error));
			throw this.error;
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Получение информации о конкретном товаре
	 * @param id Идентификатор товара
	 */
	public async getProductById(id: string): Promise<IProduct> {
		this.isLoading = true;
		this.error = null;

		try {
			return await this.get<IProduct>(id);
		} catch (error) {
			this.error = error instanceof Error ? error : new Error(String(error));
			throw this.error;
		} finally {
			this.isLoading = false;
		}
	}
}
