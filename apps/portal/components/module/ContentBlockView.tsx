"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  Info,
  Quote,
  Scale,
} from "lucide-react";
import type { ContentBlock } from "@/lib/types";
import { BASE_PATH } from "@/lib/basePath";
import { RichParagraph } from "./RichText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { AudioLesson, VideoLesson } from "@/components/media/LessonMedia";

const calloutStyles = {
  info: { icon: Info, label: "Ponto de atenção" },
  warning: { icon: AlertTriangle, label: "Alerta operacional" },
  success: { icon: CheckCircle2, label: "Boa prática" },
};

const viewport = { once: true, margin: "-70px" };
const itemReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function ContentBlockView({ block, index = 0 }: { block: ContentBlock; index?: number }) {
  const blockTransition = {
    duration: 0.5,
    delay: Math.min(index * 0.06, 0.18),
    ease: [0.16, 1, 0.3, 1] as const,
  };

  switch (block.type) {
    case "text":
      return (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className="atlas-content-card atlas-text-card"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <BookOpen size={20} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Conceito essencial</span>
              <h4>{block.heading || "Entenda o contexto"}</h4>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } } }}
            className="atlas-rich-copy-stack"
          >
            {block.paragraphs.map((p, i) => (
              <motion.div key={i} variants={itemReveal} transition={{ duration: 0.42 }}>
                <RichParagraph runs={p} className="atlas-rich-copy" />
              </motion.div>
            ))}
          </motion.div>
        </motion.article>
      );

    case "callout": {
      const style = calloutStyles[block.variant];
      const Icon = style.icon;
      return (
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className={`atlas-content-card atlas-callout atlas-callout-${block.variant}`}
        >
          <span className="atlas-callout-icon">
            <Icon size={24} aria-hidden="true" />
          </span>
          <div>
            <span className="atlas-content-kicker">{style.label}</span>
            <p className="atlas-callout-title">{block.title}</p>
            <div className="atlas-callout-copy">
              <RichParagraph runs={block.text} className="atlas-rich-copy" />
            </div>
          </div>
        </motion.aside>
      );
    }

    case "checklist":
      return (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className="atlas-content-card atlas-checklist-card"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <ClipboardList size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Roteiro prático</span>
              <h4>{block.title}</h4>
            </div>
          </div>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
            className="atlas-checklist"
          >
            {block.items.map((item, i) => (
              <motion.li key={i} variants={itemReveal} transition={{ duration: 0.38 }}>
                <span className="atlas-check-number">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
                <CheckCircle2 size={18} aria-hidden="true" />
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      );

    case "comparison":
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className="atlas-comparison"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <Scale size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Compare os cenários</span>
              <h4>{block.title}</h4>
            </div>
          </div>
          <div className="atlas-comparison-grid">
            {[block.left, block.right].map((side, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="atlas-comparison-card"
              >
                <span className="atlas-comparison-index">{idx === 0 ? "A" : "B"}</span>
                <p>{side.label}</p>
                <ul>
                  {side.points.map((pt, i) => (
                    <li key={i}>
                      <span />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>
      );

    case "timeline":
      return (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className="atlas-content-card atlas-timeline-card"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <BarChart3 size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Fluxo em sequência</span>
              <h4>{block.title}</h4>
            </div>
          </div>
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
            className="atlas-timeline"
          >
            {block.items.map((item, i) => (
              <motion.li key={i} variants={itemReveal} transition={{ duration: 0.4 }}>
                <span className="atlas-timeline-marker">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p>{item.label}</p>
                  <span>{item.text}</span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.article>
      );

    case "case":
      return (
        <motion.article
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={blockTransition}
          whileHover={{ y: -5 }}
          className="atlas-content-card atlas-case-card"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <Briefcase size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Caso aplicado</span>
              <h4>{block.title}</h4>
            </div>
          </div>
          <p className="atlas-case-copy">{block.text}</p>
          <p className="atlas-case-source">Fonte · {block.source}</p>
        </motion.article>
      );

    case "faq":
      return (
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={blockTransition}
          className="atlas-content-card atlas-faq-card"
        >
          <div className="atlas-content-card-heading">
            <span className="atlas-content-card-icon">
              <HelpCircle size={21} aria-hidden="true" />
            </span>
            <div>
              <span className="atlas-content-kicker">Dúvidas frequentes</span>
              <h4>O que você precisa saber</h4>
            </div>
          </div>
          <Accordion type="single" collapsible className="atlas-faq-list">
            {block.items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.article>
      );

    case "stat":
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="atlas-stat-grid"
        >
          {block.items.map((s, i) => (
            <motion.article
              key={i}
              variants={itemReveal}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="atlas-stat-card"
            >
              <span className="atlas-stat-icon">
                <BarChart3 size={18} aria-hidden="true" />
              </span>
              <p>{s.value}</p>
              <span>{s.label}</span>
            </motion.article>
          ))}
        </motion.div>
      );

    case "quote":
      return (
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ ...blockTransition, duration: 0.6 }}
          className="atlas-quote-card"
        >
          <Quote size={38} aria-hidden="true" />
          <p>{block.text}</p>
          {block.author && <footer>— {block.author}</footer>}
        </motion.blockquote>
      );

    case "image": {
      const imageSrc = block.url.startsWith("/") ? `${BASE_PATH}${block.url}` : block.url;
      return (
        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ ...blockTransition, duration: 0.6 }}
          className="atlas-image-card overflow-hidden rounded-3xl border border-border bg-surface shadow-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={block.alt || block.caption || "Imagem educacional do módulo"}
            className="w-full h-auto max-h-[580px] object-contain bg-zinc-950/40 mx-auto"
            loading="lazy"
          />
          {(block.caption || block.credit) && (
            <figcaption className="border-t border-border p-4 sm:p-5">
              {block.caption && <p className="text-sm font-semibold leading-relaxed text-foreground">{block.caption}</p>}
              {block.credit && <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">Fonte visual: {block.credit}</p>}
            </figcaption>
          )}
        </motion.figure>
      );
    }

    case "video":
      return (
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={blockTransition}>
          <VideoLesson youtubeId={block.youtubeId} title={block.title} caption={block.caption} transcript={block.transcript} />
          {block.source && <p className="mt-2 px-2 text-[11px] font-semibold text-muted">Fonte: {block.source}</p>}
        </motion.div>
      );

    case "audio":
      return (
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={blockTransition}>
          <AudioLesson title={block.title} text={block.text} caption={block.caption} />
        </motion.div>
      );

    default:
      return null;
  }
}
