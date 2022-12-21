import { updateAttendance } from './services/attendance.service.js';
import { generateAuthenticationTokens } from './services/auth.service.js';

async function main(){
  await generateAuthenticationTokens();
  await updateAttendance();
}

main();
