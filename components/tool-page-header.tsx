export function ToolPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-border py-6 xl:py-8 2xl:py-10">
      <div className="container mx-auto flex flex-col items-center gap-y-2 lg:gap-y-3 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight xl:text-5xl">{title}</h1>
        <h2 className="text-muted-foreground text-lg 2xl:text-2xl">{subtitle}</h2>
      </div>
    </div>
  );
}
