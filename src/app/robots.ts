import {brand} from '@/lib/config';
export default function robots(){return {rules:{userAgent:'*',allow:'/'},...(brand.domain?{sitemap:`${brand.domain}/sitemap.xml`}:{})};}
