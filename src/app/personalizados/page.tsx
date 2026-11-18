import {Heading,Process} from '@/components/ui';
import {ContactForm} from '@/components/contact-form';
export const metadata={title:'Seu projeto começa aqui',description:'Prepare um orçamento para um objeto personalizado.'};
export default async function Page({searchParams}:{searchParams:Promise<{produto?:string}>}){const {produto}=await searchParams;return <><section className="form-page"><Heading title="Seu projeto começa aqui." text="Uma ideia, uma necessidade, um detalhe só seu. Conte o que você imagina."/><ContactForm product={produto}/></section><Process/></>}
