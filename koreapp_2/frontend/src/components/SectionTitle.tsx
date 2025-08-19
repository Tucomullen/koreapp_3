import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface SectionTitleProps {
  children: ReactNode
  className?: string
}

export default function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2 className={clsx('section-title', className)}>
      {children}
    </h2>
  )
}
