"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = { src: string; alt: string; sizes: string; eager?: boolean };

export default function ProjectImage({ src, alt, sizes, eager = false }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);

  function open() {
    setOpened(true);
    dialog.current?.showModal();
  }

  return <>
    <button className="image-preview" onClick={open} aria-label={`View full image: ${alt}`}>
      <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />
      <span className="image-preview-label">View full image <span aria-hidden="true">＋</span></span>
    </button>
    <noscript><a className="image-preview-label" href={src}>Open full image</a></noscript>
    <dialog className="image-dialog" data-lenis-prevent ref={dialog} aria-label={alt} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="image-dialog-bar"><p>{alt}</p><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close image">Close <span aria-hidden="true">×</span></button></div>
      {opened && <div className="image-dialog-content">
        {/* The original is requested only when the visitor opens the viewer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <a href={src} target="_blank" rel="noreferrer">Open original image <span aria-hidden="true">↗</span></a>
      </div>}
    </dialog>
  </>;
}
