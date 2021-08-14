import React from 'react'
import classNames from 'classnames'

type IconProps = JSX.IntrinsicElements['svg'] & {
  name: string
}

/**
 * iconfont组件
 * @param name 图标名
 */
export default function Icon(props: IconProps) {
  const { name, className, ...rest } = props
  return (
    <svg
      aria-hidden
      className={classNames('iconfont inline-block', className)}
      {...rest}
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  )
}
