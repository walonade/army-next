import { useCallback, useState } from "react"

const customUseState = prop => {
 const [value, setValue] = useState(prop)
 const callbackSetValue = useCallback(
  newProp => {
   setValue(newProp)
  },
  [value]
 )
 return [value, callbackSetValue]
}

export { customUseState }
