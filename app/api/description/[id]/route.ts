import {prisma} from '../../../../prisma';
import {NextResponse} from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }){
    const { id } = await params;
    const userId = Number(id);
    const ticket = await prisma.ticketSchema.findUnique(
    {
        where:{id:userId}
    });
    let assignee = null;
    let createdBy = null;
    let description = null;

    if (ticket) {
        assignee = await prisma.assignee.findUnique({
            where: { id: ticket.assigneeId }
        });
        if (ticket.createdById) {
            createdBy = await prisma.assignee.findUnique({
                where: { id: ticket.createdById }
            });
        }
        description = {
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            createdBy: createdBy?.name || 'Unknown',
            assignee: assignee?.name || 'Unassigned',
        };
    } else {
        description = { error: 'Ticket not found' };
    }

    return NextResponse.json(description);
}
