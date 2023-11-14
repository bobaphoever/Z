import { ElementType, MouseEventHandler } from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  as?: ElementType
}

export const Card: React.FC<CardProps> = ({ children, className = '', as: Tag = 'div', }) => {
  return (
    <Tag
      className={`overflow-hidden border dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl ${className}`}
    >
      {children}
    </Tag>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => {
  return <div className={`border-b p-3 ${className}`}>{children}</div>
}

interface CardBodyProps {
  children?: React.ReactNode
  className?: string
  clickHandler?: MouseEventHandler
}
export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
  clickHandler
}) => {
  return <div className={`p-5 ${className}`} onClick={clickHandler? clickHandler : () => {}}>{children}</div>
}
