// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export const SITE_TITLE = import.meta.env.APP_TITLE || 'Mercadona Ticket'
export const SITE_DESCRIPTION = 'Una forma rapida y sencilla de convertir tus tickets de Mercadona en un CSV'
export const API_ENDPOINT = import.meta.env.PUBLIC_API_ENDPOINT || 'https://api.mercadona-ticket.nubecita.dev/upload_ticket'