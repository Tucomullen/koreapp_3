import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function Card({ children, className, title }: CardProps) {
  return (
    <div className={clsx('card', className)}>
      {title && <h3 className="section-title">{title}</h3>}
      {children}
    </div>
  )
}
