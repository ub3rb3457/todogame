import {override, addWebpackAlias} from 'customize-cra'
const path = require('path')
const resolvePath = (location) => { return path.resolve(__dirname,location) }
module.exports = override(
    addWebpackAlias({
        ['@Components']: resolvePath('./src/Components'),
        ['@hooks']:      resolvePath('./src/hooks'),
        ['@helpers']:    resolvePath('./src/helpers')
    })
)