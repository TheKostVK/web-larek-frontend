import { Api } from '../../base/api';
import { IOrder, IOrderApi, IPostOrderResponse } from '../../../types';

class OrderApi extends Api implements IOrderApi {
	protected static readonly URI = 'order/';
	protected isLoading = false;
	protected error: Error | null = null;

	constructor(baseUrl: string, options: RequestInit = {}) {
		super(`${ baseUrl }/${ OrderApi.URI }`, options);
	}

	public async postOrder(order: IOrder): Promise<IPostOrderResponse> {
		this.isLoading = true;
		this.error = null;

		try {
			return await this.post<IPostOrderResponse>('', order);
		} catch (error) {
			this.error = error instanceof Error ? error : new Error(String(error));
			throw this.error;
		} finally {
			this.isLoading = false;
		}
	}
}

export default OrderApi;