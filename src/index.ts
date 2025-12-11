import './scss/styles.scss';
import { AppApi } from './components/api/appApi';
import { API_URL, SELECTORS } from './utils/constants';
import { EventEmitter } from './components/base/events';
import PresenterProduct from './components/products/presenter/presenterProduct';
import ModelProduct from './components/products/model/modelProduct';
import ViewProductList from './components/products/view/viewProductList';
import ViewProductModal from './components/products/view/viewProductModal';
import { CardFactory } from './components/cards/cardFactory';
import ModelCart from './components/cart/model/modelCart';
import ViewCartModal from './components/cart/view/viewCartModal';
import PresenterCart from './components/cart/presenter/presenterCart';
import ModelOrder from './components/order/model/modelOreder';
import PresenterOrder from './components/order/presenter/presenterOrder';
import ViewOrderModal from './components/order/view/viewOrderModal';
import AppState from './components/appState/appState';

const events = new EventEmitter();
const cardFactory = new CardFactory();

const api = new AppApi(API_URL);

const modelProduct = new ModelProduct([]);
const viewProductList = new ViewProductList();
const viewProductModal = new ViewProductModal(SELECTORS.IDS.MODAL_CONTAINER);
const presenterProduct = new PresenterProduct(modelProduct, viewProductList, viewProductModal, events, cardFactory);

const modelCart = new ModelCart();
const viewCartModal = new ViewCartModal(SELECTORS.IDS.MODAL_CONTAINER);
const presenterCart = new PresenterCart(modelCart, viewCartModal, events, cardFactory);

const modelOrder = new ModelOrder();
const viewOrder = new ViewOrderModal(SELECTORS.IDS.MODAL_CONTAINER);
const presenterOrder = new PresenterOrder(modelOrder, api, viewOrder, events);

const appState = new AppState(modelProduct, modelCart, modelOrder, events, api);

async function boot(): Promise<void> {
	try {
		presenterProduct.init();
		presenterCart.init();
		presenterOrder.init();

		await appState.init();
	} catch (error) {
		throw new Error(error);
	}
}

boot().then(() => console.log('boot complete')).catch((e) => console.error('boot error', e));
