import { AxiosError } from "axios"

type TProps = {
  callback: () => Promise<void>
  onError?: ( msg: string, errors: string[] ) => void
  onFinally?: () => void
}

export const tryCatch = async ({ callback, onError, onFinally }: TProps) => {
  try {
    await callback()
  }
  catch (err) {
    
    const error = err instanceof AxiosError
      ? err.response?.data
      : { message: err, errors: [] }

    onError?.(error?.message, error?.errors)

    throw error
  }
  finally {
    onFinally?.()
  }
}