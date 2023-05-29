import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'É necessário no mínimo 04 caracteres para o usuário',
    })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'O nome pode ter apenas letras e espaços.',
    }),
})
type RegisterFormData = z.infer<typeof registerFormSchema>
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  const router = useRouter()
  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])
  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data.message)
        alert(err.response.data.message)
    }
  }
  return (
    <>
      <NextSeo title="Crie uma conta" />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput prefix="calendar.com/" {...register('username')} />
            {errors.username && (
              <FormError>{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
