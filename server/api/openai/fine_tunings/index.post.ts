import { createFileTunning } from '~~/server/utils/openai';

export default defineEventHandler(async (_event) => {
  return await createFileTunning();
});
