export const brand = {
 name: 'Lableo 3D', shortName: 'lableo', slogan: 'Ideias que ganham forma.', description: 'Design, impressão 3D e personalização.', city: 'São Caetano do Sul — SP',
 domain: process.env.NEXT_PUBLIC_SITE_URL || '', whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '', email: process.env.NEXT_PUBLIC_EMAIL || '', instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
 features: { uploads: false, checkout: false },
};
export const navigation = [['Início','/'],['Produtos','/produtos'],['Coleções','/colecoes'],['Projetos','/projetos'],['Personalizados','/personalizados'],['Sobre','/sobre']];
export function whatsappLink(message: string, number = brand.whatsapp) { return /^\d{12,13}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null; }
export const money = (value: number) => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value);
