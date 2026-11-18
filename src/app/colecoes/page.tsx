import Link from 'next/link';
import Image from 'next/image';
import {collections} from '@/data/catalog';
import {Heading} from '@/components/ui';
export const metadata={title:'Coleções'};
export default function Page(){return <section><Heading title="Universos para explorar"/><div className="collections">{collections.map(c=><Link href={`/colecoes/${c.slug}`} key={c.id}><Image src={c.coverImage} alt={`Ilustração: ${c.name}`} width={600} height={600}/><h2>{c.name}</h2><p>{c.description}</p></Link>)}</div></section>}
