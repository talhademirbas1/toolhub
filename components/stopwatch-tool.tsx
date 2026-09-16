'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function StopwatchTool({ dict }: { dict: any }) {
  const isTr = typeof window !== 'undefined' && window.location.pathname.startsWith('/tr');

  const [time, setTime] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('sw_time');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sw_running') === 'true';
  });

  const [laps, setLaps] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('sw_laps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sw_running', String(isRunning));
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 10;
          localStorage.setItem('sw_time', newTime.toString());
          return newTime;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  const handleLap = () => {
    const newLaps = [time, ...laps];
    setLaps(newLaps);
    localStorage.setItem('sw_laps', JSON.stringify(newLaps));
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    localStorage.removeItem('sw_time');
    localStorage.removeItem('sw_running');
    localStorage.removeItem('sw_laps');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card border rounded-2xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
          <Timer className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{isTr ? 'Kronometre' : 'Stopwatch'}</h2>
          <p className="text-xs text-muted-foreground">{isTr ? 'ToolHub Zaman Aracı' : 'ToolHub Time Suite'}</p>
        </div>
      </div>
      
      <div className="text-5xl font-black my-8 py-6 bg-muted/50 rounded-xl w-full text-center tracking-tight" style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}>
        {formatTime(time)}
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        {!isRunning ? (
          <Button onClick={() => setIsRunning(true)} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
            <Play className="w-4 h-4" /> {isTr ? 'Başlat' : 'Start'}
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} variant="secondary" className="gap-2 flex-1">
            <Pause className="w-4 h-4" /> {isTr ? 'Durdur' : 'Pause'}
          </Button>
        )}
        {isRunning && (
          <Button onClick={handleLap} variant="outline" className="gap-2">
            {isTr ? 'Tur Al' : 'Lap'}
          </Button>
        )}
        <Button onClick={handleReset} variant="outline" className="gap-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
          <RotateCcw className="w-4 h-4" /> {isTr ? 'Sıfırla' : 'Reset'}
        </Button>
      </div>
      
      {laps.length > 0 && (
        <div className="mt-6 max-h-48 overflow-y-auto space-y-2 border border-border/60 rounded-xl p-4 bg-muted/20">
          <h3 className="font-semibold text-xs text-muted-foreground mb-2 uppercase tracking-wider">{isTr ? 'Tur Zamanları' : 'Lap Times'}</h3>
          {laps.map((lapTime, index) => (
            <div key={index} className="flex justify-between text-sm font-mono border-b border-border/40 pb-1.5 last:border-0">
              <span className="text-muted-foreground">{isTr ? 'Tur' : 'Lap'} {laps.length - index}</span>
              <span className="font-bold">{formatTime(lapTime)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}