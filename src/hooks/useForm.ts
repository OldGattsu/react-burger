import { useState, useCallback } from 'react'

export default function useForm() {
  const [formValues, setFormValues] = useState<any>({})

  const onChangeForm = (e: { target: HTMLInputElement }) => {
    const name = e.target.name
    const value = e.target.value

    setFormValues({ ...formValues, [name]: value })
  }

  const resetForm = useCallback(
    (values = {}) => setFormValues(values),
    [setFormValues]
  )

  return {
    formValues,
    onChangeForm,
    resetForm,
  }
}
