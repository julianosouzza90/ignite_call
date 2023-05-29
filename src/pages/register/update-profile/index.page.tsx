import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { FormAnnotation, ProfileBox } from './styles'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Header } from '../styles'
import { z } from 'zod'
import { ArrowRight } from 'phosphor-react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { useSession } from 'next-auth/react'
import { api } from '@/src/lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const UpdateProfileFormSchema = z.object({
  bio: z.string(),
})
type updateProfileFormData = z.infer<typeof UpdateProfileFormSchema>
export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<updateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
  })

  const session = useSession()
  const router = useRouter()
  async function handleUpdateProfile(data: updateProfileFormData) {
    await api.put('users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }
  return (
    <>
      <NextSeo title="Atualize seu Perfil | ignite call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Defina sua Disponibilidade</Heading>
          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>
          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de perfil</Text>
            <Avatar src={session.data?.user?.avatar_url} />
          </label>
          <label>
            <Text>Sobre você</Text>
            <TextArea {...register('bio')} />
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
