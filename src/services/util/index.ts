import config from '../../config';

const getApiUrl = (slug: string) => `${config.API_BASE_URL}${slug}`;

export { getApiUrl };
