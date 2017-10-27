/**
 * Created by AllenFeng on 2017/9/12.
 */

console.log(process.env.NODE_ENV, process.env.NODE_ENV === "production")

module.exports = {
    plugins: [
        require('autoprefixer'),
        process.env.NODE_ENV === "production" && require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*', '!top', '!bottom']
        })
    ]
}