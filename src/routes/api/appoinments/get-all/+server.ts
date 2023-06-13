import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import { prisma } from '$lib/database/prisma';

type CustomRouteParams = {
	isDoctor: string;
};

  
export const GET: RequestHandler<CustomRouteParams> = async ({ url, params }: RequestEvent<CustomRouteParams>) => {
	console.log(url.searchParams.get('isDoctor'))
	const isDoctor = url.searchParams.get('isDoctor')==='true'
  	let results;
  if (isDoctor) {
    const idDoctor = url.searchParams.get('key') ?? '0';
    if (idDoctor === '0') {
      return json([]);
    }
    
    results = await prisma.appointment_form.findMany({
      where: {
        id_doctor: idDoctor
      }
    });
    await prisma.$disconnect();
    return json(results);
  } else {
    const idUser = url.searchParams.get('key') ?? '0';
    if (idUser === '0') {
      return json([]);
    }
    
    results = await prisma.appointment_form.findMany({
      where: {
        id_user: idUser
      }
    });
    
    await prisma.$disconnect();
    return json(results);
  }
};
