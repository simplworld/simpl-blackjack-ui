export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ? 'Invalid email address'
    : undefined
);

export const isRequired = value => (value ? undefined : 'This field is required');
