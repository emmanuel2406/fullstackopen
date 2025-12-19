import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

const CounterApp = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      <div>{left.value}</div>
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      <div>{right.value}</div>
    </div>
  )
}

export default CounterApp