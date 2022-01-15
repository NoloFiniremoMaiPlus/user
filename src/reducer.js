export const initialState = {
  cart: [],
  // user: null,
  // tokens: null,
};

// Selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => amount + item.price, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.item);
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in cart!`
        );
      }

      return {
        ...state,
        cart: newCart,
      };

    // case "SET_USER_AND_TOKENS":
    //   console.log(action.user);
    //   console.log(action.tokens);
    //   return {
    //     ...state,
    //     user: action.user,
    //     tokens: action.tokens,
    //   };

    default:
      return state;
  }
};

export default reducer;
