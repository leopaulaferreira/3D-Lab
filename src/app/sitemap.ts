import {MetadataRoute} from 'next';
import {brand} from '@/lib/config';
import {products,collections,projects} from '@/data/catalog';
export default function sitemap():MetadataRoute.Sitemap{return brand.domain?['','/produtos','/colecoes','/projetos','/personalizados','/sobre','/contato','/privacidade',...products.map(p=>`/produtos/${p.slug}`),...collections.map(c=>`/colecoes/${c.slug}`),...projects.map(p=>`/projetos/${p.slug}`)].map(path=>({url:brand.domain+path})):[];}
