// app/api/assignee/route.ts
import {prisma} from '../../../prisma';  // or from '@/lib/prisma' if you use aliases
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const assignees = await prisma.assignee.findMany({
      select: { id: true, name: true }
    });
    return NextResponse.json(assignees);
  } catch (error) {
    console.error('Error in GET /api/assignee:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
