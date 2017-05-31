import { GET_PRODUCTS } from '../../types'

export const getters = {
    [GET_PRODUCTS] (state) {
    return state.products
  }
}