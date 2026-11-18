'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="empty"><h1>Algo não saiu como esperado.</h1><button className="button" onClick={reset}>Tentar novamente</button></section>}
