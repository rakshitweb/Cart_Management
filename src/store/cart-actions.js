import { cartActions } from "./cartSlice";
import { UIActions } from "./UISlice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(UIActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://redux-application-8a464-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
            });

            if(!response.ok){
                throw new Error('Sending cart data failed!');
            }
        }

        try{
            await sendRequest();
            dispatch(UIActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        } catch(e){
            dispatch(UIActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending cart data failed'
            }));
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://redux-application-8a464-default-rtdb.firebaseio.com/cart.json')
            if(!response.ok){
                throw new Error('Could not fetch data.');
            }

            const data = await response.json();
            return {items: data.items || [], totalQuantity: data.totalQuantity};
        }
        try{
            const cartData = await fetchData();
            dispatch(UIActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Fetch cart data successfully!'
            }));
            dispatch(cartActions.replaceCart(cartData));
        } catch (e) {
            dispatch(UIActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetching cart data failed'
            }));
        }
    }
}