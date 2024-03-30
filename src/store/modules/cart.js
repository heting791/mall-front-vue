import Vue from 'vue'

export default {
  state: {
    shoppingCart: []
  },

  getters: {
    getNum(state) {
      return state.shoppingCart.length;
    },
    getShoppingCart(state) {
      return state.shoppingCart;
    },
    getCheckedNum(state) {
      let checkedNum = 0;
      for (var i = 0; i < state.shoppingCart.length; i++) {
        let temp = state.shoppingCart[i];
        if (temp.checked) {
          checkedNum++;
        }
      }
      return checkedNum;
    },
    getCheckedItem(state) {
      let checkedItems = [];
      for (var i = 0; i < state.shoppingCart.length; i++) {
        let temp = state.shoppingCart[i];
        if (temp.checked) {
          checkedItems.push(temp);
        }
      }
      return checkedItems;
    },
    getTotalPrice(state) {
      let totalPrice = 0;
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (temp.checked) {
          totalPrice += temp.price * temp.count;
        }
      }
      return totalPrice.toFixed(2);
    },
    getIsAllChecked(state) {
      let isAllChecked = true;
      for (let i = 0; i < state.shoppingCart.length; i++) {
        const temp = state.shoppingCart[i];
        if (!temp.checked) {
          isAllChecked = false;
          return isAllChecked;
        }
      }
      return isAllChecked;
    }
  },

  mutations: {
    initShoppingCart(state) {
      console.log("initShoppingCart");
      for (var i = 0; i < state.shoppingCart.length; i++) {
        Vue.set(state.shoppingCart[i], "checked", false);
      }
    },
    setShoppingCart(state, data) {
      state.shoppingCart = data;
    },
    updateShoppingCart(state, payload) {
      // console.log("payload:" + JSON.stringify(payload));
      if (payload.checked != null) {
        // state.shoppingCart[payload.index].checked = payload.checked;
        Vue.set(state.shoppingCart[payload.index], "checked", payload.checked);
      }
      if (payload.count) {
        Vue.set(state.shoppingCart[payload.index], "count", payload.count);
        Vue.set(state.shoppingCart[payload.index], "ttprice", (payload.count * state.shoppingCart[payload.index].price).toFixed(2));
      }
      if (payload.isAllChecked != null) {
        let isAllChecked = payload.isAllChecked;
        console.log("isAllChecked:" + isAllChecked);
        if (isAllChecked) {
          for (var i = 0; i < state.shoppingCart.length; i++) {
            Vue.set(state.shoppingCart[i], "checked", true);
          }
        } else {
          for (var i = 0; i < state.shoppingCart.length; i++) {
            Vue.set(state.shoppingCart[i], "checked", false);
          }
        }
      }
      if (payload.args != null) {
        console.log("yes");
        Vue.set(state.shoppingCart[payload.index], "args", payload.args);
      }
      if (payload.price != null) {
        Vue.set(state.shoppingCart[payload.index], "price", payload.price);
        Vue.set(state.shoppingCart[payload.index], "ttprice", (payload.price * state.shoppingCart[payload.index].count).toFixed(2));
      }
    },
    deleteCartItem(state, payload) {
      // console.log("payload:" + JSON.stringify(payload));
      if (payload.index != null) {
        state.shoppingCart.splice(payload.index, 1);
      } else {
        for (var i = 0; i < state.shoppingCart.length; i++) {
          for (var j = 0; j < payload.checkedItems.length; j++) {
            if (state.shoppingCart[i].cartid == payload.checkedItems[j].cartid) {
              console.log("yes");
              state.shoppingCart.splice(i, 1);
            }
          }
        }
      }
    }
  },

  actions: {
    initShoppingCart({
      commit
    }) {
      commit('initShoppingCart');
    },
    setShoppingCart({
      commit
    }, data) {
      commit('setShoppingCart', data);
    },
    updateShoppingCart({
      commit
    }, payload) {
      commit('updateShoppingCart', payload)
    },
    deleteCartItem({ commit }, payload) {
      commit('deleteCartItem', payload)
    }
  }
}
