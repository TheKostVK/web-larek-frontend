# UML-документация классов и интерфейсов

## Базовые классы

### {abstract} View\<S>
**Расположение:** `src/components/view/view.ts`  
**Реализует:** `IView<S>`

**Зависит от:**
- `IView<S>` (интерфейс)

**Зависит от него:**
- `ViewModal<S>`
- `ViewProductList`

**Поля:**
```
# el: HTMLElement | null
# state: S
# isMounted: boolean
# isEventListeners: boolean
```

**Методы:**
```
+ constructor(root: HTMLElement | string, initialState: S)
+ mount(): void
+ unmount(): void
+ update(newState: Partial<S>): void
+ getElement(): HTMLElement | null
{abstract} + render(): void
```

---

### {abstract} ViewModal\<S>
**Расположение:** `src/components/viewModal/viewModal.ts`  
**Реализует:** `IViewModal<S>`  
**Наследуется от:** `View<S>`

**Зависит от:**
- `View<S>` (базовый класс)
- `IViewModal<S>` (интерфейс)

**Зависит от него:**
- `ViewProductModal`
- `ViewCartModal`
- `ViewOrderModal`

**Поля:**
```
# onCloseModalCallback: () => void | null
# onOpenModalCallback: () => void | null
# scrollY: number
# modalContentHTML: HTMLElement | null
# isBaseEventListeners: boolean
# renderData: unknown
```

**Методы:**
```
+ constructor(root: HTMLElement | string, initialState: S)
+ isModalOpen(): boolean
+ setOnCloseModalCallback(callback: () => void): void
+ setOnOpenModalCallback(callback: () => void): void
+ openModal(): void
+ update(newState: S, renderData?: unknown): void
+ closeModal(): void
+ unmount(): void
# clickEvent(evt: MouseEvent): void
# keyDownEvent(evt: KeyboardEvent): void
# validateElements(): void
# renderContent(content: HTMLElement): void
# setupCustomEventListeners(): void
# removeCustomEventListeners(): void
{abstract} + render(): void
```

---

### Api
**Расположение:** `src/components/base/api.ts`

**Зависит от:**
- (нет внешних зависимостей)

**Зависит от него:**
- `AppApi`

**Поля:**
```
+ readonly baseUrl: string
# options: RequestInit
```

**Конструктор:**
- `baseUrl: string` — базовый URL API
- `options: RequestInit = {}` — опции для HTTP‑запросов (опциональный, по умолчанию пустой объект)

**Методы:**
```
+ constructor(baseUrl: string, options?: RequestInit)
# handleResponse<T>(response: Response): Promise<T>
# normalizeUrl(uri: string): string
+ get<T>(uri: string): Promise<T>
+ post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>
```

---

### {abstract} Form
**Расположение:** `src/components/base/form.ts`

**Зависит от:**
- (нет внешних зависимостей)

**Зависит от него:**
- `OrderStep1Form`
- `OrderStep2Form`

**Поля:**
```
# form: HTMLFormElement
# submitButton: HTMLButtonElement | null
# inputElements: HTMLInputElement[]
```

**Конструктор:**
- `form: HTMLFormElement` — DOM-элемент формы

**Методы:**
```
+ constructor(form: HTMLFormElement)
# init(): void
# setupEventListeners(): void
# updateSubmitButton(): void
+ setSubmitButtonDisabled(disabled: boolean): void
+ getSubmitButton(): HTMLButtonElement | null
+ getForm(): HTMLFormElement
{abstract} # validate(): boolean
{abstract} # handleSubmit(): void
```

---

### EventEmitter
**Расположение:** `src/components/base/events.ts`  
**Реализует:** `IEvents`

**Зависит от:**
- `IEvents` (интерфейс)

**Зависит от него:**
- `AppState`
- `PresenterProduct`
- `PresenterCart`
- `PresenterOrder`

**Поля:**
```
- _events: Map<EventName, Set<Subscriber>>
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ on<T>(eventName: EventName, callback: (event: T) => void): void
+ off(eventName: EventName, callback: Subscriber): void
+ emit<T>(eventName: string, data?: T): void
+ onAll(callback: (event: EmitterEvent) => void): void
+ offAll(): void
+ trigger<T>(eventName: string, context?: Partial<T>): (event: object) => void
```

---

## Карточки товаров

### {abstract} Card
**Расположение:** `src/components/cards/card.ts`  
**Реализует:** `ICard`

**Зависит от:**
- `ICard` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `CardProduct`
- `CardBasket`
- `CardPreview`

**Поля:**
```
# container: HTMLElement
# title: HTMLElement
# price: HTMLElement
# image: HTMLImageElement | null
# category: HTMLElement | null
```

**Конструктор:**
- `template: HTMLTemplateElement | string` — шаблон карточки или селектор шаблона

**Методы:**
```
# constructor(template: HTMLTemplateElement | string)
+ render(product: IProduct): void
+ getContainer(): HTMLElement
```

---

### CardProduct
**Расположение:** `src/components/cards/cardProduct.ts`  
**Реализует:** `ICard`  
**Наследуется от:** `Card`

**Зависит от:**
- `Card` (базовый класс)
- `ICard` (интерфейс)

**Зависит от него:**
- `CardFactory`

**Поля:**
```
(наследуются от Card)
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ render(product: IProduct): void
```

---

### CardBasket
**Расположение:** `src/components/cards/cardBasket.ts`  
**Реализует:** `ICardBasket`  
**Наследуется от:** `Card`

**Зависит от:**
- `Card` (базовый класс)
- `ICardBasket` (интерфейс)

**Зависит от него:**
- `CardFactory`

**Поля:**
```
(наследуются от Card)
# itemIndex: HTMLElement
# deleteButton: HTMLElement
# onDeleteCallback: ((itemId: string) => void) | null
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ setOnDeleteCallback(callback: (itemId: string) => void): void
+ render(product: IProduct, index?: number): void
# handleDeleteClick(evt: MouseEvent): void
```

---

### CardPreview
**Расположение:** `src/components/cards/cardPreview.ts`  
**Реализует:** `ICardPreview`  
**Наследуется от:** `Card`

**Зависит от:**
- `Card` (базовый класс)
- `ICardPreview` (интерфейс)

**Зависит от него:**
- `CardFactory`

**Поля:**
```
(наследуются от Card)
# description: HTMLElement
# button: HTMLButtonElement
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ render(product: IProduct, inCart?: boolean): void
```

---

### CardFactory
**Расположение:** `src/components/cards/cardFactory.ts`  
**Реализует:** `ICardFactory`

**Зависит от:**
- `ICardFactory` (интерфейс)
- `ICard` (интерфейс)
- `ICardPreview` (интерфейс)
- `ICardBasket` (интерфейс)
- `CardProduct` (класс)
- `CardPreview` (класс)
- `CardBasket` (класс)

**Зависит от него:**
- `PresenterProduct`
- `PresenterCart`

**Поля:**
```
(нет полей)
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ createProductCard(): ICard
+ createPreviewCard(): ICardPreview
+ createBasketCard(): ICardBasket
```

---

## Модели (Model)

### ModelProduct
**Расположение:** `src/components/products/model/modelProduct.ts`  
**Реализует:** `IModelProduct`

**Зависит от:**
- `IModelProduct` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `PresenterProduct`
- `AppState`

**Поля:**
```
# products: IProduct[]
# itemsCount: number
```

**Конструктор:**
- `initialProducts: IProduct[] = []` — начальный массив товаров (опциональный, по умолчанию пустой массив)

**Методы:**
```
+ constructor(initialProducts?: IProduct[])
+ setProducts(products: IProduct[]): void
+ getProducts(): IProduct[]
+ getProductById(id: string): IProduct | undefined
+ getProductsCount(): number
```

---

### ModelCart
**Расположение:** `src/components/cart/model/modelCart.ts`  
**Реализует:** `IModelCart`

**Зависит от:**
- `IModelCart` (интерфейс)
- `ICart` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `PresenterCart`
- `AppState`

**Поля:**
```
# cartData: ICart
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ init(cartData: ICart): void
+ addItem(item: IProduct): void
+ removeItem(itemId: string): void
+ clearCart(): void
+ getTotalPrice(): number
+ getItemsCount(): number
+ getItems(): IProduct[]
+ getItemById(id: string): IProduct | null
+ getCartData(): ICart
```

---

### ModelOrder
**Расположение:** `src/components/order/model/modelOreder.ts`  
**Реализует:** `IModelOrder`

**Зависит от:**
- `IModelOrder` (интерфейс)
- `IOrder` (интерфейс)
- `PaymentMethod` (тип)

**Зависит от него:**
- `PresenterOrder`
- `AppState`

**Поля:**
```
# orderData: IOrder
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ setItems(items: string[]): void
+ setPaymentMethod(method: PaymentMethod): void
+ setEmail(email: string): void
+ setPhone(phone: string): void
+ setAddress(address: string): void
+ setTotal(total: number): void
+ clearData(): void
+ getOrderData(): IOrder
```

---

## Презентеры (Presenter)

### PresenterProduct
**Расположение:** `src/components/products/presenter/presenterProduct.ts`

**Зависит от:**
- `IModelProduct` (интерфейс)
- `IViewProductList` (интерфейс)
- `IViewProductModal` (интерфейс)
- `IEvents` (интерфейс)
- `ICardFactory` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- (нет классов, используется через инициализацию)

**Поля:**
```
# model: IModelProduct
# viewList: IViewProductList
# viewModal: IViewProductModal
# events: IEvents
# cardFactory: ICardFactory
```

**Конструктор:**
- `model: IModelProduct` — модель каталога товаров
- `viewList: IViewProductList` — представление списка товаров
- `viewModal: IViewProductModal` — представление модального окна товара
- `events: IEvents` — система событий (EventBus)
- `cardFactory: ICardFactory` — фабрика для создания карточек товаров

**Методы:**
```
+ constructor(model: IModelProduct, viewList: IViewProductList, viewModal: IViewProductModal, events: IEvents, cardFactory: ICardFactory)
+ init(): void
# initList(): void
# initModal(): void
# createCards(products: IProduct[]): HTMLElement[]
# createContent(product: IProduct, inCart: boolean): HTMLElement
+ checkInCart(productId: string): Promise<boolean>
+ closeModal(): void
+ openModal(): void
```

---

### PresenterCart
**Расположение:** `src/components/cart/presenter/presenterCart.ts`

**Зависит от:**
- `IModelCart` (интерфейс)
- `IViewCartModal` (интерфейс)
- `IEvents` (интерфейс)
- `ICardFactory` (интерфейс)
- `ICardBasket` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- (нет классов, используется через инициализацию)

**Поля:**
```
# model: IModelCart
# view: IViewCartModal
# events: IEvents
# cardFactory: ICardFactory
```

**Конструктор:**
- `model: IModelCart` — модель корзины
- `view: IViewCartModal` — представление модального окна корзины
- `events: IEvents` — система событий (EventBus)
- `cardFactory: ICardFactory` — фабрика для создания карточек товаров

**Методы:**
```
+ constructor(model: IModelCart, view: IViewCartModal, events: IEvents, cardFactory: ICardFactory)
+ init(): void
+ closeModal(): void
+ openModal(): void
# createCards(items: IProduct[]): ICardBasket[]
```

---

### PresenterOrder
**Расположение:** `src/components/order/presenter/presenterOrder.ts`

**Зависит от:**
- `IModelOrder` (интерфейс)
- `IAppApi` (интерфейс)
- `IViewOrderModal` (интерфейс)
- `IEvents` (интерфейс)
- `ISuccessMessageFactory` (интерфейс)
- `IOrderStep1FormFactory` (интерфейс)
- `IOrderStep2FormFactory` (интерфейс)
- `IOrder` (интерфейс)
- `IOrderStep1SubmitHandler` (интерфейс)
- `IOrderStep2SubmitHandler` (интерфейс)
- `IValidator` (интерфейс)

**Зависит от него:**
- (нет классов, используется через инициализацию)

**Поля:**
```
- model: IModelOrder
- api: IAppApi
- view: IViewOrderModal
- events: IEvents
- successMessageFactory: ISuccessMessageFactory
- orderStep1FormFactory: IOrderStep1FormFactory
- orderStep2FormFactory: IOrderStep2FormFactory
# currentStep: OrderStep
# orderId: string | null
# orderErrorMessage: string | null
# step2SubmitButton: HTMLButtonElement | null
# step2SubmitDefaultText: string
# orderTemplate: HTMLTemplateElement | null
# orderContactsTemplate: HTMLTemplateElement | null
# orderErrorTemplate: HTMLTemplateElement | null
```

**Конструктор:**
- `model: IModelOrder` — модель заказа
- `api: IAppApi` — API-клиент для отправки заказа
- `view: IViewOrderModal` — представление модального окна заказа
- `events: IEvents` — система событий (EventBus)
- `successMessageFactory: ISuccessMessageFactory` — фабрика для создания успешных сообщений о заказе
- `orderStep1FormFactory: IOrderStep1FormFactory` — фабрика для создания формы шага 1 заказа
- `orderStep2FormFactory: IOrderStep2FormFactory` — фабрика для создания формы шага 2 заказа

**Методы:**
```
+ constructor(model: IModelOrder, api: IAppApi, view: IViewOrderModal, events: IEvents, successMessageFactory: ISuccessMessageFactory, orderStep1FormFactory: IOrderStep1FormFactory, orderStep2FormFactory: IOrderStep2FormFactory)
+ init(): void
# submitOrder(): Promise<void>
# updateStep2Loading(isLoading: boolean): void
+ openModal(): void
+ closeModal(): void
# goToStep(step: OrderStep, orderData?: IOrder): void
# createStepContent(step: OrderStep, orderData: IOrder): HTMLElement
# createStep1Content(orderData: IOrder): HTMLElement
# createStep2Content(orderData: IOrder): HTMLElement
# createStep3Content(orderData: IOrder): HTMLElement
# createStep4Content(): HTMLElement
```

---

## Представления (View)

### ViewProductList
**Расположение:** `src/components/products/view/viewProductList.ts`  
**Реализует:** `IViewProductList`  
**Наследуется от:** `View<IProduct[]>`

**Зависит от:**
- `View<IProduct[]>` (базовый класс)
- `IViewProductList` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `PresenterProduct`

**Поля:**
```
(наследуются от View)
# onProductClickCallback: ((productId: string) => void) | null
# renderData: HTMLElement[] | null
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ setOnProductClickCallback(callback: (productId: string) => void): void
+ update(products: IProduct[], cards?: HTMLElement[]): void
+ render(): void
```

---

### ViewProductModal
**Расположение:** `src/components/products/view/viewProductModal.ts`  
**Реализует:** `IViewProductModal`  
**Наследуется от:** `ViewModal<IProduct>`

**Зависит от:**
- `ViewModal<IProduct>` (базовый класс)
- `IViewProductModal` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `PresenterProduct`

**Поля:**
```
(наследуются от ViewModal)
# onAddToCartCallback: ((product: IProduct) => void) | null
```

**Конструктор:**
- `modalContainer: HTMLElement | string = SELECTORS.IDS.MODAL_CONTAINER` — DOM-элемент или селектор контейнера модального окна (опциональный, по умолчанию используется селектор из констант)

**Методы:**
```
+ constructor(modalContainer?: HTMLElement | string)
+ setOnAddToCartCallback(callback: (product: IProduct) => void): void
+ setInCartState(inCart: boolean): void
+ update(product: IProduct, content?: HTMLElement): void
# clickAddToCartEvent(evt: MouseEvent): void
# setupCustomEventListeners(): void
# removeCustomEventListeners(): void
+ render(): void
```

---

### ViewCartModal
**Расположение:** `src/components/cart/view/viewCartModal.ts`  
**Реализует:** `IViewCartModal`  
**Наследуется от:** `ViewModal<ICart>`

**Зависит от:**
- `ViewModal<ICart>` (базовый класс)
- `IViewCartModal` (интерфейс)
- `ICart` (интерфейс)
- `ICardBasket` (интерфейс)

**Зависит от него:**
- `PresenterCart`

**Поля:**
```
(наследуются от ViewModal)
# cartTemplate: HTMLTemplateElement | null
# cartButton: HTMLElement | null
# cartCount: HTMLElement | null
# onOrderCallback: () => void | null
# onBasketButtonClickCallback: () => void | null
```

**Конструктор:**
- `modalContainer: HTMLElement | string` — DOM-элемент или селектор контейнера модального окна

**Методы:**
```
+ constructor(modalContainer: HTMLElement | string)
+ setOnOrderCallback(callback: () => void): void
+ setOnBasketButtonClickCallback(callback: () => void): void
+ update(cartData: ICart, cards?: ICardBasket[]): void
# createModalContent(cartData: ICart, cards: ICardBasket[]): HTMLElement
# clickToCartEvent(evt: MouseEvent): void
# setupCustomEventListeners(): void
# removeCustomEventListeners(): void
+ render(): void
```

---

### ViewOrderModal
**Расположение:** `src/components/order/view/viewOrderModal.ts`  
**Реализует:** `IViewOrderModal`  
**Наследуется от:** `ViewModal<IOrder>`

**Зависит от:**
- `ViewModal<IOrder>` (базовый класс)
- `IViewOrderModal` (интерфейс)
- `IOrder` (интерфейс)

**Зависит от него:**
- `PresenterOrder`

**Поля:**
```
(наследуются от ViewModal)
```

**Конструктор:**
- `modalContainer: HTMLElement | string = SELECTORS.IDS.MODAL_CONTAINER` — DOM-элемент или селектор контейнера модального окна (опциональный, по умолчанию используется селектор из констант)

**Методы:**
```
+ constructor(modalContainer?: HTMLElement | string)
+ update(orderData: IOrder, content?: HTMLElement): void
+ render(): void
```

---

## Формы заказа

### OrderStep1Form
**Расположение:** `src/components/order/forms/orderStep1Form.ts`  
**Наследуется от:** `Form`  
**Реализует:** `IOrderStep1Form`

**Зависит от:**
- `Form` (базовый класс)
- `IOrderStep1Form` (интерфейс)
- `PaymentMethod` (тип)
- `IOrderStep1SubmitHandler` (интерфейс)

**Зависит от него:**
- `OrderStep1FormFactory`

**Поля:**
```
(наследуются от Form)
- selectedPayment: PaymentMethod | null
- addressInput: HTMLInputElement | null
- buttonsContainer: HTMLElement | null
- payButtons: HTMLButtonElement[]
- defaultPayment: PaymentMethod
- submitHandler: IOrderStep1SubmitHandler
- readonly ACTIVE_CLASS: string
```

**Конструктор:**
- `form: HTMLFormElement` — DOM-элемент формы
- `defaultPayment: PaymentMethod` — способ оплаты по умолчанию
- `submitHandler: IOrderStep1SubmitHandler` — обработчик отправки формы

**Методы:**
```
+ constructor(form: HTMLFormElement, defaultPayment: PaymentMethod, submitHandler: IOrderStep1SubmitHandler)
+ getSubmitButton(): HTMLButtonElement | null
# init(): void
# setupPaymentButtons(): void
# validate(): boolean
# handleSubmit(): void
```

---

### OrderStep2Form
**Расположение:** `src/components/order/forms/orderStep2Form.ts`  
**Наследуется от:** `Form`  
**Реализует:** `IOrderStep2Form`

**Зависит от:**
- `Form` (базовый класс)
- `IOrderStep2Form` (интерфейс)
- `IOrderStep2SubmitHandler` (интерфейс)
- `IValidator` (интерфейс)

**Зависит от него:**
- `OrderStep2FormFactory`

**Поля:**
```
(наследуются от Form)
- emailInput: HTMLInputElement | null
- phoneInput: HTMLInputElement | null
- submitHandler: IOrderStep2SubmitHandler
- emailValidator: IValidator
- phoneValidator: IValidator
```

**Конструктор:**
- `form: HTMLFormElement` — DOM-элемент формы
- `submitHandler: IOrderStep2SubmitHandler` — обработчик отправки формы
- `emailValidator: IValidator` — валидатор email
- `phoneValidator: IValidator` — валидатор телефона

**Методы:**
```
+ constructor(form: HTMLFormElement, submitHandler: IOrderStep2SubmitHandler, emailValidator: IValidator, phoneValidator: IValidator)
+ getSubmitButton(): HTMLButtonElement | null
# init(): void
# validate(): boolean
# handleSubmit(): void
```

---

### OrderStep1FormFactory
**Расположение:** `src/components/order/forms/orderStep1FormFactory.ts`  
**Реализует:** `IOrderStep1FormFactory`

**Зависит от:**
- `IOrderStep1FormFactory` (интерфейс)
- `IOrderStep1Form` (интерфейс)
- `PaymentMethod` (тип)
- `IOrderStep1SubmitHandler` (интерфейс)
- `OrderStep1Form` (класс)

**Зависит от него:**
- `PresenterOrder`

**Поля:**
```
(нет полей)
```

**Методы:**
```
+ constructor()
+ create(form: HTMLFormElement, defaultPayment: PaymentMethod, submitHandler: IOrderStep1SubmitHandler): IOrderStep1Form
```

---

### OrderStep2FormFactory
**Расположение:** `src/components/order/forms/orderStep2FormFactory.ts`  
**Реализует:** `IOrderStep2FormFactory`

**Зависит от:**
- `IOrderStep2FormFactory` (интерфейс)
- `IOrderStep2Form` (интерфейс)
- `IOrderStep2SubmitHandler` (интерфейс)
- `IValidator` (интерфейс)
- `OrderStep2Form` (класс)

**Зависит от него:**
- `PresenterOrder`

**Поля:**
```
(нет полей)
```

**Методы:**
```
+ constructor()
+ create(form: HTMLFormElement, submitHandler: IOrderStep2SubmitHandler, emailValidator: IValidator, phoneValidator: IValidator): IOrderStep2Form
```

---

## API и состояние приложения

### AppApi
**Расположение:** `src/components/api/appApi.ts`  
**Реализует:** `IAppApi`  
**Наследуется от:** `Api`

**Зависит от:**
- `Api` (базовый класс)
- `IAppApi` (интерфейс)
- `IProduct` (интерфейс)
- `IOrder` (интерфейс)
- `IPostOrderResponse` (интерфейс)

**Зависит от него:**
- `AppState`
- `PresenterOrder`

**Поля:**
```
(наследуются от Api)
```

**Конструктор:**
- `baseUrl: string` — базовый URL API
- `options: RequestInit = {}` — опции для HTTP‑запросов (опциональный, по умолчанию пустой объект)

**Методы:**
```
+ constructor(baseUrl: string, options?: RequestInit)
+ getProducts(): Promise<IProduct[]>
+ getProductById(id: string): Promise<IProduct>
+ postOrder(order: IOrder): Promise<IPostOrderResponse>
```

---

### AppState
**Расположение:** `src/components/appState/appState.ts`  
**Реализует:** `IAppState`

**Зависит от:**
- `IAppState` (интерфейс)
- `IModelProduct` (интерфейс)
- `IModelCart` (интерфейс)
- `IModelOrder` (интерфейс)
- `IEvents` (интерфейс)
- `IAppApi` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- (нет классов, используется через инициализацию)

**Поля:**
```
# modelProduct: IModelProduct
# modelCart: IModelCart
# modelOrder: IModelOrder
# events: IEvents
# api: IAppApi
# openedModal: string | null
```

**Конструктор:**
- `modelProduct: IModelProduct` — модель каталога товаров
- `modelCart: IModelCart` — модель корзины
- `modelOrder: IModelOrder` — модель заказа
- `events: IEvents` — шина событий приложения
- `api: IAppApi` — API‑клиент загрузки товаров

**Методы:**
```
+ constructor(modelProduct: IModelProduct, modelCart: IModelCart, modelOrder: IModelOrder, events: IEvents, api: IAppApi)
+ init(): Promise<void>
# loadProducts(): Promise<void>
# loadCart(): void
```

---

### SuccessMessage
**Расположение:** `src/components/messages/successMessage.ts`  
**Реализует:** `ISuccessMessage`

**Зависит от:**
- `ISuccessMessage` (интерфейс)

**Зависит от него:**
- `SuccessMessageFactory`

**Поля:**
```
# template: HTMLTemplateElement | null
# container: HTMLElement
# title: HTMLElement | null
# orderId: HTMLElement | null
# description: HTMLElement | null
# closeButton: HTMLButtonElement | null
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ setOrderData(orderId: string, total: number): void
+ setOnCloseCallback(callback: () => void): void
+ getContainer(): HTMLElement
```

---

### SuccessMessageFactory
**Расположение:** `src/components/messages/successMessageFactory.ts`  
**Реализует:** `ISuccessMessageFactory`

**Зависит от:**
- `ISuccessMessageFactory` (интерфейс)
- `ISuccessMessage` (интерфейс)
- `SuccessMessage` (класс)

**Зависит от него:**
- `PresenterOrder`

**Поля:**
```
(нет полей)
```

**Конструктор:**
- Параметры отсутствуют (конструктор без параметров)

**Методы:**
```
+ constructor()
+ create(): ISuccessMessage
```

---

## Интерфейсы

### IView\<S>
**Расположение:** `src/types/components/view/view.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `View<S>` (класс)
- `IViewModal<S>` (интерфейс)
- `IViewProductList` (интерфейс)

**Методы:**
```
+ mount(): void
+ unmount(): void
+ update(newState: Partial<S>): void
+ getElement(): HTMLElement | null
+ render(): void
```

---

### IViewModal\<S>
**Расположение:** `src/types/components/viewModal/viewModal.interface.ts`  
**Расширяет:** `IView<S>`

**Зависит от:**
- `IView<S>` (интерфейс)

**Зависит от него:**
- `ViewModal<S>` (класс)
- `IViewProductModal` (интерфейс)
- `IViewCartModal` (интерфейс)
- `IViewOrderModal` (интерфейс)

**Методы:**
```
+ isModalOpen(): boolean
+ setOnCloseModalCallback(callback: () => void): void
+ setOnOpenModalCallback(callback: () => void): void
+ openModal(): void
+ update(newState: S, renderData?: unknown): void
+ closeModal(): void
```

---

### ICard
**Расположение:** `src/types/components/cards/card.interface.ts`

**Зависит от:**
- `IProduct` (интерфейс)

**Зависит от него:**
- `Card` (класс)
- `ICardBasket` (интерфейс)
- `ICardPreview` (интерфейс)
- `ICardFactory` (интерфейс)

**Методы:**
```
+ render(product: IProduct): void
+ getContainer(): HTMLElement
```

---

### ICardBasket
**Расположение:** `src/types/components/cards/card.interface.ts`  
**Расширяет:** `ICard`

**Зависит от:**
- `ICard` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `CardBasket` (класс)
- `ICardFactory` (интерфейс)
- `IViewCartModal` (интерфейс)

**Методы:**
```
+ render(product: IProduct, index?: number): void
+ setOnDeleteCallback(callback: (itemId: string) => void): void
```

---

### ICardPreview
**Расположение:** `src/types/components/cards/card.interface.ts`  
**Расширяет:** `ICard`

**Зависит от:**
- `ICard` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `CardPreview` (класс)
- `ICardFactory` (интерфейс)

**Методы:**
```
+ render(product: IProduct, inCart?: boolean): void
```

---

### ICardFactory
**Расположение:** `src/types/components/cards/card.interface.ts`

**Зависит от:**
- `ICard` (интерфейс)
- `ICardPreview` (интерфейс)
- `ICardBasket` (интерфейс)

**Зависит от него:**
- `CardFactory` (класс)

**Методы:**
```
+ createProductCard(): ICard
+ createPreviewCard(): ICardPreview
+ createBasketCard(): ICardBasket
```

---

### IModelProduct
**Расположение:** `src/types/components/products/model/modelProduct.interface.ts`

**Зависит от:**
- `IProduct` (интерфейс)

**Зависит от него:**
- `ModelProduct` (класс)

**Методы:**
```
+ setProducts(products: IProduct[]): void
+ getProducts(): IProduct[]
+ getProductById(id: string): IProduct | undefined
+ getProductsCount(): number
```

---

### IModelCart
**Расположение:** `src/types/components/cart/model/modelCart.interface.ts`

**Зависит от:**
- `ICart` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `ModelCart` (класс)

**Методы:**
```
+ init(cartData: ICart): void
+ addItem(item: IProduct): void
+ removeItem(itemId: string): void
+ clearCart(): void
+ getTotalPrice(): number
+ getItemsCount(): number
+ getItems(): IProduct[]
+ getItemById(id: string): IProduct | null
+ getCartData(): ICart
```

---

### IModelOrder
**Расположение:** `src/types/components/order/model/modelOrder.interface.ts`

**Зависит от:**
- `PaymentMethod` (тип)

**Зависит от него:**
- `ModelOrder` (класс)

**Методы:**
```
+ setItems(items: string[]): void
+ setPaymentMethod(method: PaymentMethod): void
+ setEmail(email: string): void
+ setPhone(phone: string): void
+ setAddress(address: string): void
+ setTotal(total: number): void
+ clearData(): void
+ getOrderData(): IOrder
```

---

### IViewProductList
**Расположение:** `src/types/components/products/view/viewProductList.interface.ts`  
**Расширяет:** `IView<IProduct[]>`

**Зависит от:**
- `IView<IProduct[]>` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `ViewProductList` (класс)

**Методы:**
```
+ setOnProductClickCallback(callback: (productId: string) => void): void
+ update(products: IProduct[], cards?: HTMLElement[]): void
+ render(): void
```

---

### IViewProductModal
**Расположение:** `src/types/components/products/view/viewProductModal.interface.ts`  
**Расширяет:** `IViewModal<IProduct>`

**Зависит от:**
- `IViewModal<IProduct>` (интерфейс)
- `IProduct` (интерфейс)

**Зависит от него:**
- `ViewProductModal` (класс)

**Методы:**
```
+ update(product: IProduct, content?: HTMLElement): void
+ unmount(): void
+ setOnAddToCartCallback(callback: (product: IProduct) => void): void
+ setInCartState(inCart: boolean): void
+ render(): void
```

---

### IViewCartModal
**Расположение:** `src/types/components/cart/view/viewCartModal.interface.ts`  
**Расширяет:** `IViewModal<ICart>`

**Зависит от:**
- `IViewModal<ICart>` (интерфейс)
- `ICart` (интерфейс)
- `ICardBasket` (интерфейс)

**Зависит от него:**
- `ViewCartModal` (класс)

**Методы:**
```
+ setOnOrderCallback(callback: () => void): void
+ setOnBasketButtonClickCallback(callback: () => void): void
+ update(cartData: ICart, cards?: ICardBasket[]): void
```

---

### IViewOrderModal
**Расположение:** `src/types/components/order/view/viewOrderModal.interface.ts`  
**Расширяет:** `IViewModal<IOrder>`

**Зависит от:**
- `IViewModal<IOrder>` (интерфейс)
- `IOrder` (интерфейс)

**Зависит от него:**
- `ViewOrderModal` (класс)

**Методы:**
```
+ update(orderData: IOrder, content?: HTMLElement): void
```

---

### IAppApi
**Расположение:** `src/types/components/api/appApi.interface.ts`

**Зависит от:**
- `IProduct` (интерфейс)
- `IOrder` (интерфейс)
- `IPostOrderResponse` (интерфейс)

**Зависит от него:**
- `AppApi` (класс)

**Методы:**
```
+ getProducts(): Promise<IProduct[]>
+ getProductById(id: string): Promise<IProduct>
+ postOrder(order: IOrder): Promise<IPostOrderResponse>
```

---

### IEvents
**Расположение:** `src/components/base/events.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `EventEmitter` (класс)

**Методы:**
```
+ on<T>(event: EventName, callback: (data: T) => void): void
+ emit<T>(event: string, data?: T): void
+ trigger<T>(event: string, context?: Partial<T>): (data: T) => void
```

---

### IAppState
**Расположение:** `src/types/components/appState/appState.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `AppState` (класс)

**Методы:**
```
+ init(): Promise<void>
```

---

### IValidator
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `OrderStep2Form` (класс)

**Методы:**
```
+ validate(value: string): boolean
```

---

### IOrderStep1SubmitHandler
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- `PaymentMethod` (тип)

**Зависит от него:**
- `OrderStep1Form` (класс)
- `PresenterOrder` (класс)

**Методы:**
```
+ handleSubmit(payment: PaymentMethod, address: string): void
```

---

### IOrderStep2SubmitHandler
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `OrderStep2Form` (класс)
- `PresenterOrder` (класс)

**Методы:**
```
+ handleSubmit(email: string, phone: string): void
```

---

### IOrderStep1Form
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `OrderStep1Form` (класс)
- `IOrderStep1FormFactory` (интерфейс)

**Методы:**
```
+ getSubmitButton(): HTMLButtonElement | null
```

---

### IOrderStep2Form
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `OrderStep2Form` (класс)
- `IOrderStep2FormFactory` (интерфейс)

**Методы:**
```
+ getSubmitButton(): HTMLButtonElement | null
```

---

### IOrderStep1FormFactory
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- `IOrderStep1Form` (интерфейс)
- `PaymentMethod` (тип)
- `IOrderStep1SubmitHandler` (интерфейс)

**Зависит от него:**
- `OrderStep1FormFactory` (класс)

**Методы:**
```
+ create(form: HTMLFormElement, defaultPayment: PaymentMethod, submitHandler: IOrderStep1SubmitHandler): IOrderStep1Form
```

---

### IOrderStep2FormFactory
**Расположение:** `src/types/components/order/forms/forms.interface.ts`

**Зависит от:**
- `IOrderStep2Form` (интерфейс)
- `IOrderStep2SubmitHandler` (интерфейс)
- `IValidator` (интерфейс)

**Зависит от него:**
- `OrderStep2FormFactory` (класс)

**Методы:**
```
+ create(form: HTMLFormElement, submitHandler: IOrderStep2SubmitHandler, emailValidator: IValidator, phoneValidator: IValidator): IOrderStep2Form
```

---

### IProduct
**Расположение:** `src/types/components/products/model/modelProduct.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `ICard` (интерфейс)
- `ICart` (интерфейс)
- `IModelProduct` (интерфейс)
- `IViewProductList` (интерфейс)
- `IViewProductModal` (интерфейс)
- `ModelProduct` (класс)
- `ModelCart` (класс)
- `Card` (класс)
- `PresenterProduct` (класс)
- `PresenterCart` (класс)
- `AppState` (класс)

**Поля:**
```
+ id: string
+ title: string
+ description: string
+ category: string
+ price: number | null
+ image: string
```

---

### ICart
**Расположение:** `src/types/components/cart/model/modelCart.interface.ts`

**Зависит от:**
- `IProduct` (интерфейс)

**Зависит от него:**
- `IModelCart` (интерфейс)
- `IViewCartModal` (интерфейс)
- `ModelCart` (класс)
- `ViewCartModal` (класс)

**Поля:**
```
+ items: IProduct[]
+ itemsCount: number
+ totalPrice: number
```

---

### IOrder
**Расположение:** `src/types/components/order/model/modelOrder.interface.ts`

**Зависит от:**
- `PaymentMethod` (тип)

**Зависит от него:**
- `IModelOrder` (интерфейс)
- `IViewOrderModal` (интерфейс)
- `IAppApi` (интерфейс)
- `ModelOrder` (класс)
- `ViewOrderModal` (класс)
- `AppApi` (класс)
- `PresenterOrder` (класс)

**Поля:**
```
+ items: string[]
+ payment: PaymentMethod
+ email: string
+ phone: string
+ address: string
+ total: number
```

---

### IPostOrderResponse
**Расположение:** `src/types/components/order/api/orederApi.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `IAppApi` (интерфейс)
- `AppApi` (класс)
- `PresenterOrder` (класс)

**Поля:**
```
+ id: string
+ total: number
```

---

### ISuccessMessage
**Расположение:** `src/types/components/messages/successMessage.interface.ts`

**Зависит от:**
- (нет зависимостей)

**Зависит от него:**
- `SuccessMessage` (класс)
- `ISuccessMessageFactory` (интерфейс)

**Методы:**
```
+ setOrderData(orderId: string, total: number): void
+ setOnCloseCallback(callback: () => void): void
+ getContainer(): HTMLElement
```

---

### ISuccessMessageFactory
**Расположение:** `src/types/components/messages/successMessage.interface.ts`

**Зависит от:**
- `ISuccessMessage` (интерфейс)

**Зависит от него:**
- `SuccessMessageFactory` (класс)

**Методы:**
```
+ create(): ISuccessMessage
```

