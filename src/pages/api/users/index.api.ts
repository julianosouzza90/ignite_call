import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { name, username } = req.body

  const userAlreadyExists = await prisma.user.findUnique({
    where: { username },
  })

  if (userAlreadyExists) {
    return res.status(400).json({ message: 'User already exists' })
  }
  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })
  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 60 * 27 * 7, // 7days
    path: '/',
  })

  return res.status(201).json(user)
}
