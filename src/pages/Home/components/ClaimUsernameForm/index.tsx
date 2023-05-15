import { Button, TextInput } from '@ignite-ui/react'
import { Form } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const ClaimUsernameFormSchema = zod.object({
  username: zod.string(),
})
type ClaimUserFormData = zod.infer<typeof ClaimUsernameFormSchema>
export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUserFormData>()
  function handleClaimUsername(data: ClaimUserFormData) {
    console.log(data.username)
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="https://www.calendar/"
        {...register('username')}
        placeholder="Seu-usuario"
      />
      <Button size="sm" type="submit">
        Reservar <ArrowRight />
      </Button>
    </Form>
  )
}
