import React, { useCallback, useRef, useEffect } from "react"
import { TextField } from "@material-ui/core"
export default ({
 value,
 onChange,
 nativeProps,
 className,
 forwardRef,
 idInput,
 label,
}) => {
 let nativeInput = useRef()
 let didMountRef = useRef(false)
 useEffect(() => {
  let inp = nativeInput.current
  if (didMountRef.current) {
   inp.value = value
  } else didMountRef.current = true
 })
 forwardRef(value => setValue(value))
 const setValue = value => {
  nativeInput.current.value = value
 }
 const checkChange = useCallback(event => {
  if (value != event.target.value) onChange(event)
 })
 const checkEnterKey = useCallback(event => {
  if (event.keyCode === 13) checkChange(event)
 })
 return (
  <TextField
   inputProps={nativeProps}
   InputLabelProps={{ shrink: true }}
   defaultValue={value}
   onBlur={checkChange}
   onKeyUp={checkEnterKey}
   inputRef={nativeInput}
   className={className}
   id={idInput}
   label={label}
  />
 )
}
