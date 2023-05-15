import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotations } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ClaimUsernameFormSchema = zod.object({
  username: zod
    .string()
    .min(2, {
      message: 'O nome de usuário precisa ter no mínimo 2 caracteres',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome de usuário deve conter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})
type ClaimUserFormData = zod.infer<typeof ClaimUsernameFormSchema>
export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUserFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })
  function handleClaimUsername(data: ClaimUserFormData) {
    console.log(data.username)
  }
  return (
    <>
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
      <FormAnnotations>
        <Text>
          {errors.username ? errors.username.message : 'Digite um usuário'}
        </Text>
      </FormAnnotations>
    </>
  )
}
