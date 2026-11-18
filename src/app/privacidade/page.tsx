import { canonical } from "@/lib/seo";
import { Heading } from "@/components/ui";
export const metadata = { ...canonical("/privacidade"), title: "Privacidade" };
export default function Page() {
  return (
    <section className="prose">
      <Heading title="Sua privacidade importa." />
      <p>
        Esta versão não possui cadastro, pagamento, ferramentas de análise ou
        armazenamento de formulários no servidor. Os campos são usados no
        navegador para preparar sua mensagem.
      </p>
      <p>
        Ao continuar para WhatsApp ou e-mail, você compartilha os dados com o
        serviço escolhido e com o destinatário configurado. Esses serviços
        possuem suas próprias políticas. Não envie dados sensíveis.
      </p>
      <p>
        A hospedagem poderá registrar dados técnicos de acesso, como endereço
        IP, para operação e segurança. As condições e o canal responsável serão
        atualizados antes do início do atendimento comercial.
      </p>
    </section>
  );
}
