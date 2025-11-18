import { createReadStream } from 'fs';
import { FineTuningJob, FineTuningJobEvent } from 'openai/resources/fine-tuning/jobs/jobs.mjs';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import client, { FINE_TUNING_MODEL } from '~~/server/utils/openai';

export default defineEventHandler(async (event) => {
  // const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: `What's the capital of France?` }];
  const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: 'Lữ Khải Minh là ai?' }];
  try {
    // const fineTune = await executeFileTunning();

    // getFineTunedModelName();

    const completion = await client.chat.completions.create({
      // model: 'gpt-4o-mini',
      // model: 'gpt-3.5-turbo',
      // model: FINE_TUNING_MODEL,
      model: 'ft:gpt-4.1-mini-2025-04-14:smilegate-viet-nam-tax-code-0317591753::CbM6HTUQ',
      messages
    });

    console.log('completion >>> ', JSON.stringify(completion));

    setHeader(event, 'Content-Type', 'application/json');

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { message: 'Failed to retrieve data.' }
    });
  }
});
