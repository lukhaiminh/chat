import { createReadStream } from 'fs';
import OpenAI from 'openai';
import { FineTuningJob } from 'openai/resources/fine-tuning/jobs/jobs.mjs';

const client = new OpenAI();

// https://stackoverflow.com/questions/76976251/openai-chat-completions-api-how-do-i-make-a-fine-tuned-gpt-3-5-model-only-answe
// https://platform.openai.com/docs/guides/model-optimization
export const FINE_TUNING_MODEL = 'gpt-4.1-mini-2025-04-14';

export async function createFileTunning(): Promise<FineTuningJob> {
  console.log(`Uploading file`);

  let file = await client.files.create({
    file: createReadStream('app/assets/files/moon.jsonl'),
    purpose: 'fine-tune'
  });

  console.log(`Uploaded file with ID: ${file.id}`);

  // console.log('-----');

  // console.log(`Waiting for file to be processed`);
  // while (true) {
  //   file = await client.files.retrieve(file.id);
  //   console.log(`File status: ${file.status}`);

  //   if (file.status === 'processed') {
  //     break;
  //   } else {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //   }
  // }

  console.log('-----');

  console.log(`Starting fine-tuning`);
  const fineTune = await client.fineTuning.jobs.create({
    model: FINE_TUNING_MODEL,
    training_file: file.id
  });
  console.log(`Fine-tuning ID: ${JSON.stringify(fineTune)}`);

  return fineTune;
}

export async function getFineTunings() {
  const ft = await client.fineTuning.jobs.list();
  console.table(ft.data, ['id', 'status', 'fine_tuned_model']);

  return ft.data;
}

export default client;
