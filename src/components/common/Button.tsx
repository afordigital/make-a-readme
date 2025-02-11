import { Button as RadixButton } from '@radix-ui/themes'
import { VARIANT } from '../constants'

type ButtonProps = {
  variant: VARIANT.PRIMARY | VARIANT.SECONDARY
  children: React.ReactNode
  onClick: () => void
}

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  return (
    <RadixButton
      variant={variant === VARIANT.PRIMARY ? 'classic' : 'soft'}
      onClick={onClick}
    >
      {children}
    </RadixButton>
  )
}
