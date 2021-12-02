const SwapSymbol = ({styles, fromPair, toPair, setFromPair, setToPair, inputPriceFrom, inputPriceTo, setInputPriceFrom, setInputPriceTo, fromCoinBalance, setFromCoinBalance, toCoinBalance, setToCoinBalance}) => {
  const changePairs = async() => {
    setFromPair(toPair)
    setInputPriceFrom(inputPriceTo)
    setToPair(fromPair)
    setInputPriceTo(inputPriceFrom)
    setFromCoinBalance(toCoinBalance)
    setToCoinBalance(fromCoinBalance)
  }

  return (
    <div className={styles.swapSymbol} onClick={changePairs}>
      <div className={styles.symbol}>
        <i className='far fa-exchange-alt'></i>
      </div>
    </div>
  )
}

export default SwapSymbol
