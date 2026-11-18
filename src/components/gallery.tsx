"use client";
import Image from "next/image";
import { useState, useRef } from "react";
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDialogElement>(null);
  const uniqueImages = [...new Set(images)];
  return (
    <div>
      <button
        className="gallery-main"
        aria-label="Ampliar ilustração"
        onClick={() => ref.current?.showModal()}
      >
        <Image
          src={uniqueImages[index]}
          alt={`Ilustração de ${name}`}
          width={900}
          height={900}
          preload
        />
      </button>
      <p className="gallery-caption">Estudo ilustrativo · toque para ampliar</p>
      {uniqueImages.length > 1 && (
        <div className="thumbs">
          {uniqueImages.map((src, i) => (
            <button
              aria-label={`Ver imagem ${i + 1}`}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
              key={i}
            >
              <Image src={src} alt="" width={70} height={70} />
            </button>
          ))}
        </div>
      )}
      <dialog
        ref={ref}
        aria-label={`Ilustração ampliada de ${name}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight")
            setIndex((index + 1) % uniqueImages.length);
          if (e.key === "ArrowLeft")
            setIndex((index + uniqueImages.length - 1) % uniqueImages.length);
        }}
      >
        <button onClick={() => ref.current?.close()}>Fechar ampliação</button>
        <Image
          src={uniqueImages[index]}
          alt={`Ilustração ampliada de ${name}`}
          width={900}
          height={900}
        />
      </dialog>
    </div>
  );
}
export function Share() {
  const [status, setStatus] = useState("Compartilhar");
  return (
    <button
      className="text-link"
      onClick={async () => {
        try {
          if (navigator.share) await navigator.share({ url: location.href });
          else {
            await navigator.clipboard.writeText(location.href);
            setStatus("Link copiado");
          }
        } catch {
          setStatus("Não foi possível compartilhar");
        }
      }}
    >
      {status}
    </button>
  );
}
