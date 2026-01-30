export const MASTER_EMAILS = [
    'kayquegusmao@gmail.com',
    'kayquegusmao1@gmail.com',
    'kayquegusmao276@gmail.com',
    'kayquegusmao@icloud.com'
];

export const isMasterEmail = (email: string | null | undefined): boolean => {
    if (!email) return false;
    return MASTER_EMAILS.includes(email.toLowerCase().trim());
};
