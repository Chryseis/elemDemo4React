/**
 * Created by AllenFeng on 2017/9/12.
 */
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-pxtorem')({
            rootValue:16,
            propList:['*', '!top','!bottom']
        })
    ]
}