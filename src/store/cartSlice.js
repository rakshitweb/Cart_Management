import {createSlice} from '@reduxjs/toolkit';

const initialCartState = {
    items: [],
    totalQuantity: 0,
    isChanged: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart (state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            state.totalQuantity++;
            state.isChanged = true;
            if(!existingItem){
                state.items.push({
                    id: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.title
                });
            } else {
                existingItem.quantity = existingItem.quantity + 1;
                existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(i => i.id === id);
            state.totalQuantity--;
            state.isChanged = true;
            if(existingItem.quantity === 1){
                state.items = state.items.filter(i => i.id !== id);
            } else{
                existingItem.quantity = existingItem.quantity - 1;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;