'use client';

import { useMemo, useRef, useState } from 'react';

import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  File as FileIcon,
  RotateCcw,
  Search,
  UploadCloud,
} from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { MAX_FILE_SIZE, validateFile } from '../_lib/file-validation';
import {
  BYTES_PER_PAGE,
  BYTES_PER_ROW,
  findByteSequence,
  formatHexRows,
  parseSearchQuery,
  type SearchMode,
} from '../_lib/hex-format';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function HexViewer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [page, setPage] = useState(0);
  const [searchMode, setSearchMode] = useState<SearchMode>('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [lastMatchIndex, setLastMatchIndex] = useState<number | null>(null);
  const [highlightOffset, setHighlightOffset] = useState<number | null>(null);

  const totalPages = bytes ? Math.max(1, Math.ceil(bytes.length / BYTES_PER_PAGE)) : 0;

  const rows = useMemo(() => {
    if (!bytes) return [];
    return formatHexRows(bytes, page * BYTES_PER_PAGE, BYTES_PER_PAGE);
  }, [bytes, page]);

  const reset = () => {
    setFile(null);
    setBytes(null);
    setError(null);
    setPage(0);
    setSearchQuery('');
    setSearchError(null);
    setLastMatchIndex(null);
    setHighlightOffset(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleFile = async (selected: File | undefined | null) => {
    if (!selected) return;

    const validation = validateFile(selected);
    if (!validation.valid) {
      setError(validation.error ?? 'Archivo no válido.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setFile(selected);
    setError(null);
    setPage(0);
    setLastMatchIndex(null);
    setHighlightOffset(null);

    const buffer = await selected.arrayBuffer();
    setBytes(new Uint8Array(buffer));
  };

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(p, 0), totalPages - 1));
  };

  const runSearch = () => {
    if (!bytes) return;
    setSearchError(null);

    const needle = parseSearchQuery(searchQuery, searchMode);
    if (!needle) {
      setSearchError(
        searchMode === 'hex'
          ? 'Ingresa bytes hexadecimales válidos (ej. "89 50 4E 47" o "89504E47").'
          : 'Ingresa un texto para buscar.',
      );
      return;
    }

    const fromIndex = lastMatchIndex !== null ? lastMatchIndex + 1 : 0;
    let match = findByteSequence(bytes, needle, fromIndex);
    if (match === -1 && fromIndex > 0) {
      match = findByteSequence(bytes, needle, 0); // reinicia la búsqueda desde el principio
    }

    if (match === -1) {
      setSearchError('No se encontraron coincidencias.');
      setLastMatchIndex(null);
      setHighlightOffset(null);
      return;
    }

    setLastMatchIndex(match);
    setHighlightOffset(match);
    goToPage(Math.floor(match / BYTES_PER_PAGE));
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="bg-card space-y-6 rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <Heading level={3}>Visor Hexadecimal</Heading>
          {file && (
            <Button variant="outline" onClick={reset} data-test="reset-button">
              <RotateCcw className="mr-2 h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!file && (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              void handleFile(e.dataTransfer.files[0]);
            }}
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-colors',
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50',
            )}
            data-test="dropzone"
          >
            <UploadCloud className="text-muted-foreground h-8 w-8" />
            <div>
              <p className="text-sm font-medium">Arrastra cualquier archivo aquí o haz clic para seleccionarlo</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Máximo {formatBytes(MAX_FILE_SIZE)} · procesado 100% en tu navegador
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => void handleFile(e.target.files?.[0])}
              data-test="file-input"
            />
          </div>
        )}

        {file && bytes && (
          <>
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <FileIcon className="text-primary h-8 w-8 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium" data-test="file-name">
                  {file.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {formatBytes(file.size)} · {bytes.length.toLocaleString()} bytes · {file.type || 'tipo desconocido'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex rounded-md border p-0.5">
                <button
                  onClick={() => setSearchMode('text')}
                  className={cn(
                    'rounded px-2.5 py-1 text-xs font-medium transition-colors',
                    searchMode === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                  )}
                  data-test="search-mode-text"
                >
                  Texto
                </button>
                <button
                  onClick={() => setSearchMode('hex')}
                  className={cn(
                    'rounded px-2.5 py-1 text-xs font-medium transition-colors',
                    searchMode === 'hex' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
                  )}
                  data-test="search-mode-hex"
                >
                  Hex
                </button>
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setLastMatchIndex(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && runSearch()}
                placeholder={searchMode === 'hex' ? 'ej. 89 50 4E 47' : 'ej. contraseña'}
                className="sm:max-w-xs"
                data-test="search-input"
              />
              <Button variant="outline" onClick={runSearch} data-test="search-button">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              {highlightOffset !== null && (
                <span className="text-muted-foreground text-xs">
                  Encontrado en offset 0x{highlightOffset.toString(16).toUpperCase()}
                </span>
              )}
            </div>
            {searchError && <p className="text-destructive text-xs">{searchError}</p>}

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full font-mono text-xs">
                <thead className="bg-muted sticky top-0">
                  <tr className="text-muted-foreground">
                    <th className="px-3 py-2 text-left font-semibold">Offset</th>
                    {Array.from({ length: BYTES_PER_ROW }, (_, i) => (
                      <th key={i} className="px-1 py-2 text-center font-semibold">
                        {i.toString(16).padStart(2, '0').toUpperCase()}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left font-semibold">ASCII</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map((row) => {
                    const rowStartOffset = parseInt(row.offset, 16);
                    return (
                      <tr key={row.offset} data-test="hex-row">
                        <td className="text-muted-foreground px-3 py-1">{row.offset.toUpperCase()}</td>
                        {row.hex.map((byteHex, i) => {
                          const byteOffset = rowStartOffset + i;
                          const isHighlighted = highlightOffset !== null && byteOffset === highlightOffset;
                          return (
                            <td
                              key={i}
                              className={cn(
                                'px-1 py-1 text-center',
                                isHighlighted && 'bg-primary/30 rounded text-foreground font-bold',
                              )}
                            >
                              {byteHex.toUpperCase()}
                            </td>
                          );
                        })}
                        <td className="text-muted-foreground px-3 py-1 whitespace-pre">{row.ascii}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Página {page + 1} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => goToPage(page - 1)} disabled={page === 0} aria-label="Página anterior">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages - 1}
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
