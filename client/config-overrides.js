const {override, addWebpackAlias} = require('customize-cra')
const path = require('path')
const resolvePath = (location) => { return path.resolve(__dirname,`./src/${location}`) }
module.exports = override(
    addWebpackAlias({
        ['@Components']: resolvePath('Components'),
        ['@hooks']:      resolvePath('hooks'),
        ['@Utils']:      resolvePath('Utilities'),
        ['@Store']:      resolvePath('hooks/useStore')
    })
)