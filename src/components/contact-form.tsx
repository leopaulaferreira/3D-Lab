"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { brand, whatsappLink } from "@/lib/config";
const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.email("Informe um e-mail válido"),
  phone: z.string(),
  type: z.string().min(1, "Selecione um tipo"),
  description: z.string().min(15, "Conte um pouco mais (mínimo 15 caracteres)"),
  dimensions: z.string(),
  quantity: z.number().int().min(1, "Quantidade mínima: 1"),
  deadline: z.string(),
});
type Fields = z.infer<typeof schema>;
export function ContactForm({ product }: { product?: string }) {
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      description: product ? `Tenho interesse em ${product}. ` : "",
    },
  });
  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit((v) => {
        setMessage(
          `Olá! Gostaria de um orçamento.\nNome: ${v.name}\nE-mail: ${v.email}\nWhatsApp: ${v.phone}\nTipo: ${v.type}\nProjeto: ${v.description}\nDimensões: ${v.dimensions}\nQuantidade: ${v.quantity}\nPrazo desejado: ${v.deadline}`,
        );
        setFeedback(
          "Mensagem preparada localmente. Ela ainda não foi enviada.",
        );
      })}
      noValidate
    >
      <div className="form-grid">
        {(
          [
            ["name", "Nome", "text"],
            ["email", "E-mail", "email"],
            ["phone", "WhatsApp (opcional)", "tel"],
            ["dimensions", "Dimensões aproximadas (opcional)", "text"],
            ["quantity", "Quantidade", "number"],
            ["deadline", "Prazo desejado (opcional)", "date"],
          ] as const
        ).map(([key, label, type]) => (
          <label key={key}>
            {label}
            <input
              aria-label={label}
              type={type}
              {...register(
                key,
                key === "quantity" ? { valueAsNumber: true } : {},
              )}
              aria-invalid={!!errors[key]}
              aria-describedby={`${key}-error`}
            />
            <span className="error" id={`${key}-error`}>
              {errors[key]?.message}
            </span>
          </label>
        ))}
      </div>
      <label>
        Tipo de projeto
        <select
          aria-label="Tipo de projeto"
          {...register("type")}
          aria-describedby="type-error"
        >
          <option value="">Selecione</option>
          <option>Produto do catálogo</option>
          <option>Objeto com nome</option>
          <option>Peça sob medida</option>
          <option>Projeto especial</option>
        </select>
        <span className="error" id="type-error">
          {errors.type?.message}
        </span>
      </label>
      <label>
        Descrição
        <textarea
          aria-label="Descrição"
          rows={5}
          {...register("description")}
          aria-describedby="description-error"
        />
        <span className="error" id="description-error">
          {errors.description?.message}
        </span>
      </label>
      <p>
        Referências: o upload ainda não está disponível. Combine o envio de
        arquivos diretamente no atendimento. O prazo desejado está sujeito a
        análise.
      </p>
      <p>
        Seus dados ficam nesta página até você escolher enviá-los pelo canal
        externo. Consulte a <a href="/privacidade">política de privacidade</a>.
      </p>
      <button className="button">Preparar solicitação</button>
      <p role="status">{feedback}</p>
      {message && (
        <div className="notice">
          <h3>Revise sua mensagem</h3>
          <pre>{message}</pre>
          {whatsappLink(message) ? (
            <a className="button" href={whatsappLink(message)!}>
              Continuar no WhatsApp
            </a>
          ) : brand.email ? (
            <a
              className="button"
              href={`mailto:${brand.email}?subject=Orçamento&body=${encodeURIComponent(message)}`}
            >
              Abrir e-mail
            </a>
          ) : (
            <p>
              Os canais de atendimento ainda não foram configurados. Você pode
              copiar sua solicitação.
            </p>
          )}
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(message);
                setFeedback("Mensagem copiada. Nenhum pedido foi enviado.");
              } catch {
                setFeedback("Selecione o texto acima e copie manualmente.");
              }
            }}
          >
            Copiar mensagem
          </button>
        </div>
      )}
    </form>
  );
}
