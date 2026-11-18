import {Heading} from '@/components/ui';
import {ContactForm} from '@/components/contact-form';
import {brand,whatsappLink} from '@/lib/config';
export const metadata={title:'Contato'};
export default function Page(){return <section className="form-page"><Heading title="Vamos conversar." text={brand.city}/>{whatsappLink('Olá!')&&<a href={whatsappLink('Olá!')!}>Conversar no WhatsApp</a>}{brand.email&&<a href={`mailto:${brand.email}`}>{brand.email}</a>}<ContactForm/></section>}
