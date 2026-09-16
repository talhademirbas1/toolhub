export default function Loading() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground font-medium">Yükleniyor...</span>
        </div>
      </main>
    );
  }