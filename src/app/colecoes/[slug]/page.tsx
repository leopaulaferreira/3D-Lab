import {notFound} from 'next/navigation';
import {collections,products} from '@/data/catalog';
import {Heading,ProductGrid,CTA} from '@/components/ui';
export const generateStaticParams=()=>collections.map(c=>({slug:c.slug}));
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:collections.find(c=>c.slug===slug)?.name};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=collections.find(c=>c.slug===slug);if(!c)notFound();return <><section><Heading title={c.name} text={c.description}/><ProductGrid items={products.filter(p=>c.productIds.includes(p.id))}/></section><CTA/></>}
