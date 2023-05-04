const checkMinAmountProduct = (product) => {
    return (product.CANTIDAD_MINIMA >= product.CANTIDAD)
}

export { checkMinAmountProduct }