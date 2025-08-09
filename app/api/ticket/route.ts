import {prisma} from '../../../prisma';
import {NextResponse} from 'next/server';

export async function POST(request: Request){
    try{
        const data = await request.json();
        const ticket = await prisma.ticketSchema.create({
            data:{
                title:data.title,
                description:data.description,
                priority:data.priority,
                status:data.status,
                active:data.active,
                assigneeId:data.assigneeId
            }
        })
        if(ticket){
            return NextResponse.json({message: 'Ticket created successfully', ticket}, {status: 201});
        }
    }
    catch(error)
    {
        return NextResponse.json({error: 'Failed to create ticket'}, {status: 500});
    }
}

export async function GET(){
    try{
        const tickets = await prisma.ticketSchema.findMany();
        return NextResponse.json({tickets}, {status: 200});
    }
    catch(error)
    {
        return NextResponse.json({error: 'Failed to fetch tickets'}, {status: 500});
    }
}
