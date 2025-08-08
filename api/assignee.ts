import prisma from '../prisma';
import {NextResponse} from 'next/server';


export async function GET(){
    const assignees = await prisma.assignee.findMany({
        select:{id:true,name:true}
    })
    return NextResponse.json(assignees);
}