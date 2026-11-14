import { NextRequest } from 'next/server';
import { state,respond,failure } from '../../../lib/server';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){try{const credits=state(req);return respond({remainingUses:credits.remaining,pro:credits.pro},credits);}catch(e){return failure(e);}}
