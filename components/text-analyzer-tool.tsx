'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Trash2, Copy, Check } from 'lucide-react';

export default function TextAnalyzerTool({ dict }: { dict?: any }) {
  const [isTr, setIsTr] = useState(false);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTr(window.location.pathname.startsWith('/tr'));
    }
  }, []);

  // dict yapısını hem dışarıdan gelen prop'a hem de güvenli yedek değerlere göre ayarlıyoruz
  const toolDict = dict?.tools?.textAnalyzer || dict?.textAnalyzer || {};

  const characters = text.length;
  const charactersNoSpace = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const readingTimeSeconds = Math.ceil((words / 200) * 60);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-400/20">
          <FileText className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold">
            {toolDict.title || (isTr ? 'Akıllı Metin & Karakter Analizcisi' : 'Smart Text & Character Analyzer')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {toolDict.description || (isTr ? 'ToolHub Metin Aracı' : 'ToolHub Text Suite')}
          </p>
        </div>
      </div>

      <textarea
        className="w-full h-40 p-4 rounded-xl bg-muted/35 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border border-border/70"
        placeholder={toolDict.placeholder || (isTr ? 'Metninizi buraya yazın veya yapıştırın...' : 'Type or paste your text here...')}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-muted/70 rounded-xl text-center border border-border/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block mb-1">
            {isTr ? 'KELİME' : 'WORDS'}
          </span>
          <span className="text-2xl font-black tracking-tight">{words}</span>
        </div>
        <div className="p-3 bg-muted/70 rounded-xl text-center border border-border/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block mb-1">
            {isTr ? 'KARAKTER' : 'CHARACTERS'}
          </span>
          <span className="text-2xl font-black tracking-tight">{characters}</span>
        </div>
        <div className="p-3 bg-muted/70 rounded-xl text-center border border-border/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block mb-1">
            {isTr ? 'CÜMLE' : 'SENTENCES'}
          </span>
          <span className="text-2xl font-black tracking-tight">{sentences}</span>
        </div>
        <div className="p-3 bg-muted/70 rounded-xl text-center border border-border/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 block mb-1">
            {isTr ? 'OKUMA SÜRESİ' : 'READING TIME'}
          </span>
          <span className="text-2xl font-black tracking-tight">{readingTimeSeconds} {isTr ? 'sn' : 'sec'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {isTr ? 'Karakter (boşluksuz)' : 'Characters (no space)'}: {charactersNoSpace}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!text}
            className="gap-1.5"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            {copied ? (isTr ? 'Kopyalandı!' : 'Copied!') : (isTr ? 'Kopyala' : 'Copy')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setText('')}
            disabled={!text}
            className="gap-1.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
          >
            <Trash2 className="size-4" />
            {isTr ? 'Temizle' : 'Clear'}
          </Button>
        </div>
      </div>
    </div>
  );
}