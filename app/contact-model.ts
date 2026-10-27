export const CONTACT_SUBJECTS = ['Website Purchase', 'Website Personalization', 'Custom Website', 'Partnership', 'General Question'] as const;
export type ContactValues = { name: string; email: string; subject: string; message: string; website: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(input: Record<string, unknown>): { values: ContactValues; errors: ContactErrors } {
    const text = (key: keyof ContactValues) => typeof input[key] === 'string' ? input[key].trim() : '';
    const values = { name: text('name'), email: text('email').toLowerCase(), subject: text('subject'), message: text('message'), website: text('website') };
    const errors: ContactErrors = {};
    if (values.name.length < 2 || values.name.length > 100) errors.name = 'Enter your name using 2–100 characters.';
    if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.';
    if (!CONTACT_SUBJECTS.some(subject => subject === values.subject)) errors.subject = 'Choose what you would like to talk about.';
    if (values.message.length < 10 || values.message.length > 5000) errors.message = 'Write a message using 10–5,000 characters.';
    if (values.website) errors.website = 'Your message could not be accepted. Please try again.';
    return { values, errors };
}
