import { message, superValidate } from '$lib/server';
import { schema } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
  const form = await superValidate(schema);
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);

    const form = await superValidate(formData, schema, { strict: true });
    console.log('POST', form);

    if (!form.valid) return fail(400, { form });

    return message(form, 'Posted OK!');
  }
};
