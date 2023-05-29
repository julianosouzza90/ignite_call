import { Heading, Text } from '@ignite-ui/react'

import { Container, Hero, Preview } from './styles'
import Image from 'next/image'
import AppPreviewImg from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={AppPreviewImg}
            height={400}
            alt="Imagem de um calendário, representado a aplicação"
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
