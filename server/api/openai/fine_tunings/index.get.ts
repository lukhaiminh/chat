import { getFineTunings } from '~~/server/utils/openai';

export default defineEventHandler(async (_event) => {
  const ft = await getFineTunings();

  return ft;
});
