import { IModelOrder, IOrder, PaymentMethod } from '../../../types/components/order/model/modelOrder.interface';
import { isPaymentMethod, isStringArray } from '../../../utils/utils';
import { PAYMENT_METHODS, REG_EXP_EMAIL, REG_EXP_PHONE } from '../../../utils/constants';

class ModelOrder implements IModelOrder {
	protected orderData: IOrder = {
		items: [],
		payment: PAYMENT_METHODS[0],
		email: '',
		phone: '',
		address: '',
		total: 0,
	};

	public setItems(items: string[]): void {
		if (!isStringArray(items)) return;

		this.orderData.items = items;
		this.orderData.total = items.length;
	}

	public setPaymentMethod(method: PaymentMethod): void {
		if (!isPaymentMethod(method)) return;

		this.orderData.payment = method;
	}

	public setEmail(email: string): void {
		REG_EXP_EMAIL.lastIndex = 0;

		if (typeof email !== 'string' || !REG_EXP_EMAIL.test(email)) {
			throw new Error('Некорректный email');
		}

		this.orderData.email = email;
	}

	public setPhone(phone: string): void {
		REG_EXP_PHONE.lastIndex = 0;

		if (typeof phone !== 'string' || !REG_EXP_PHONE.test(phone)) {
			throw new Error('Некорректный номер телефона');
		}

		this.orderData.phone = phone;
	}

	public setAddress(address: string): void {
		if (typeof address !== 'string') return;

		this.orderData.address = address;
	}

	public setTotal(total: number): void {
		if (typeof total !== 'number') return;

		this.orderData.total = total;
	}

	public clearData(): void {
		this.orderData = {
			items: [],
			payment: PAYMENT_METHODS[0],
			email: '',
			phone: '',
			address: '',
			total: 0,
		};
	}

	public getOrderData(): IOrder {
		return this.orderData;
	}
}

export default ModelOrder;