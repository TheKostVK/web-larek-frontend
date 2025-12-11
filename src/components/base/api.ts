export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		if (response.ok) {
			return response.json() as Promise<T>;
		}

		const data = await response.json().catch(() => null);

		if (data && typeof data === 'object' && 'error' in data) {
			const errorData = data as { error?: unknown };
			return Promise.reject(errorData.error ?? response.statusText);
		}

		return Promise.reject(response.statusText);
	}

	protected normalizeUrl(uri: string): string {
		const baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
		const normalizedUri = uri.startsWith('/') ? uri : `/${ uri }`;
		return baseUrl + normalizedUri;
	}

	public get<T>(uri: string): Promise<T> {
		return fetch(this.normalizeUrl(uri), {
			...this.options,
			method: 'GET',
		}).then((response) => this.handleResponse<T>(response));
	}

	public post<T>(
		uri: string,
		data: object,
		method: ApiPostMethods = 'POST'
	): Promise<T> {
		return fetch(this.normalizeUrl(uri), {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then((response) => this.handleResponse<T>(response));
	}
}
