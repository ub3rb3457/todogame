//import _ from 'lodash'
import { action } from 'easy-peasy' 
const UserModel = {
    anchorEl: null,
    handleProfileMenuOpen: action((state,payload) => {
        state.anchorEl = payload.currentTarget
    }),
    handleMenuClose: action((state,payload)=>{
        state.anchorEl = null
    }),

}
export default UserModel