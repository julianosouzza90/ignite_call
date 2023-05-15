import { Button, Heading, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Hero, Preview } from './styles'
import Image from 'next/image'
import AppPreviewImg from '../../assets/app-preview.png'
import { Form } from './components/ClaimUsernameForm'
export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <Form as="form">
          <TextInput size="sm" prefix="https://www.calendar/" />
          <Button size="sm" type="submit">
            Reservar <ArrowRight />{' '}
          </Button>
        </Form>
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
  )
}
