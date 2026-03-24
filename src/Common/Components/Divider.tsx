type Props = {
  handleClick?: () => void
  labelText?: string
  variant?: 'primary' | 'secondary'
}

export const Divider = (props: Props) => {
  const { handleClick, labelText = 'Continue', variant = 'primary' } = props

  return (
    <div className="relative my-6">
      <div
        className="absolute inset-0 flex justify-center items-center"
        aria-hidden="true"
      >
        <div
          className={`border-amber-400 justify-center ${
            variant === 'primary' ? 'w-full border-t-2' : 'w-1/2 border-t'
          }`}
        />
      </div>
      <div className="relative flex justify-center">
        <button type="button" onClick={handleClick}>
          <span className="px-2 bg-white text-m text-black font-medium">
            {labelText}
          </span>
        </button>
      </div>
    </div>
  )
}
