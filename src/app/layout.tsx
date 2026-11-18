import type {Metadata} from 'next';
import Link from 'next/link';
import {Header} from '@/components/navigation';
import {brand,navigation} from '@/lib/config';
import './globals.css';
export const metadata:Metadata={title:{default:`${brand.name} — ${brand.slogan}`,template:`%s | ${brand.name}`},description:brand.description,...(brand.domain?{metadataBase:new URL(brand.domain)}:{}),openGraph:{title:brand.name,description:brand.description,locale:'pt_BR',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><a className="skip" href="#main">Pular para o conteúdo</a><Header/><main id="main">{children}</main><footer><div><Link className="logo" href="/">{brand.shortName}<span>3D</span></Link><p>{brand.description}</p><small>{brand.city}</small></div><div><h3>Explore</h3>{navigation.slice(1).map(([n,h])=><Link key={h} href={h}>{n}</Link>)}</div><div><h3>Vamos conversar</h3><Link href="/contato">Contato e orçamento</Link>{brand.instagram&&<a href={brand.instagram}>Instagram</a>}<Link href="/privacidade">Política de privacidade</Link></div><div className="footer-bottom">© {new Date().getFullYear()} {brand.name}. Ideias que ganham forma.<span>Design com propósito. Feito em camadas.</span></div></footer></body></html>}
