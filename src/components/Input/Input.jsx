import st from './Input.module.css'
import cn from 'classnames';
import {forwardRef} from 'react';

const Input = forwardRef(function Input({ClassName, isValid = true, appearance, ...props}, ref) {
  return (
    <>
      <input
        {...props}
        ref={ref}
        className={cn(
          ClassName,
          st['input'],
          {[st['invalid-input']]: !isValid},
          {[st['input-title']]: appearance === 'title'}
        )}/>
    </>
  )
})

export default Input
