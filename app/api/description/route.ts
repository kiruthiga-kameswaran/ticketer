import { Description } from '../../../types/Description'
import { prisma } from '../../../prisma'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request
) {
  const { id } = await request.json()
  const userId = Number(id)

  const ticket = await prisma.ticketSchema.findUnique({
    where: { id: userId },
  })

  let description: Description = { title: '', description: '', priority: '', createdBy: '', assignee: '' }

  if (ticket) {
    const assignee = await prisma.assignee.findUnique({
      where: { id: ticket.assigneeId },
    })

    const createdBy = ticket.createdById
      ? await prisma.assignee.findUnique({
          where: { id: ticket.createdById },
        })
      : null

      if(ticket.title && ticket.description && ticket.priority) {
        description = {
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          createdBy: createdBy?.name || 'Unknown',
          assignee: assignee?.name || 'Unassigned',
        }
      }
    }

  return NextResponse.json(description)
}
