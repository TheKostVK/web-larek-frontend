import './scss/styles.scss';
import { ProductApi } from './components/products/api/productApi';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import PresenterProductList from './components/products/presenter/presenterProductList';
import ModelProduct from './components/products/model/modelProduct';
import ViewProductList from './components/products/view/viewProductList';
import ViewProductModal from './components/products/view/viewProductModal';
import PresenterProductModal from './components/products/presenter/presenterProductModal';
import ModelCart from './components/cart/model/modelCart';
import ViewCartModal from './components/cart/view/viewCartModal';
import PresenterCart from './components/cart/presenter/presenterCart';
import ModelOrder from './components/order/model/modelOreder';
import OrderApi from './components/order/api/orderApi';
import PresenterOrder from './components/order/presenter/presenterOrder';
import ViewOrderModal from './components/order/view/viewOrderModal';
import AppState from './components/appState/appState';

const events = new EventEmitter();

const productApi = new ProductApi(API_URL);
const orderApi = new OrderApi(API_URL);

const modelProduct = new ModelProduct([]);
const viewProductList = new ViewProductList();
const viewProductModal = new ViewProductModal();
const presenterProductList = new PresenterProductList(modelProduct, viewProductList, events);
const presenterProductModal = new PresenterProductModal(modelProduct, viewProductModal, events);

const modelCart = new ModelCart();
const viewCartModal = new ViewCartModal();
const presenterCart = new PresenterCart(modelCart, viewCartModal, events);

const modelOrder = new ModelOrder();
const viewOrder = new ViewOrderModal();
const presenterOrder = new PresenterOrder(modelOrder, orderApi, viewOrder, events);

const appState = new AppState(modelProduct, modelCart, modelOrder, events, productApi);

async function boot(): Promise<void> {
	try {
		presenterProductList.init();
		presenterProductModal.init();
		presenterCart.init();
		presenterOrder.init();

		await appState.init();
	} catch (error) {
		throw new Error(error);
	}
}

boot().then(() => console.log('boot complete')).catch((e) => console.error('boot error', e));
