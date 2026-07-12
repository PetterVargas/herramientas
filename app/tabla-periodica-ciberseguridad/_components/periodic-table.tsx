'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CursorInfo } from './cursor-info';
import { ElementCard } from './element-card';
import { FrameworkElement, domains, frameworkElements, getDomainByCode } from './framework-data';

export function PeriodicTable() {
  const [activeElement, setActiveElement] = useState<FrameworkElement | null>(
    frameworkElements[0] || null,
  );
  const [selectedElement, setSelectedElement] = useState<FrameworkElement | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      const offset = 20;
      let newLeft = event.clientX + offset;
      let newTop = event.clientY + offset;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (newLeft + cursor.clientWidth > windowWidth - 200) {
        newLeft = event.clientX - 350;
      }

      if (newTop + cursor.clientHeight > windowHeight - 100) {
        newTop = windowHeight - cursor.clientHeight - 100;
      }

      cursor.style.left = `${newLeft}px`;
      cursor.style.top = `${newTop}px`;
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('mousemove', handleMouseMove);
      return () => {
        mainElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const handleElementMouseEnter = (element: FrameworkElement) => {
    setActiveElement(element);
    setCursorVisible(false);
  };

  const handleElementMouseLeave = () => {
    setCursorVisible(true);
  };

  const handleElementClick = (element: FrameworkElement) => {
    setSelectedElement(element);
  };

  const activeDomain = activeElement ? getDomainByCode(activeElement.domainCode) : null;

  return (
    <div ref={mainRef} className="relative w-full">
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50"
        style={{
          opacity: !cursorVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <CursorInfo element={activeElement} visible={!cursorVisible} />
      </div>

      <div className="mb-3 h-auto min-h-[120px] w-full px-4">
        <div
          className="flex flex-col gap-4 rounded-lg border p-4 transition-all duration-300 md:flex-row md:p-6"
          style={{
            opacity: !cursorVisible ? 1 : 0.5,
            borderColor: activeDomain?.hexColor || '#dadcca',
          }}
        >
          {activeElement && (
            <>
              <div
                className="flex flex-col items-center justify-center pt-2 md:pt-4"
                style={{ color: activeDomain?.hexColor || '#dadcca' }}
              >
                <div className="text-center text-xs">{activeElement.number}</div>
                <div className="text-center text-3xl font-bold md:text-4xl">
                  {activeElement.domainCode}
                </div>
                <div className="text-center text-xs">{activeElement.code}</div>
              </div>

              <div
                className="flex-1 overflow-auto text-sm"
                style={{ color: activeDomain?.hexColor || '#dadcca' }}
              >
                <p className="mb-2 text-xl font-bold md:text-2xl">{activeElement.name}</p>
                <p className="text-muted-foreground">{activeElement.description}</p>
                <p className="text-muted-foreground mt-2 text-xs">
                  Dominio: {activeElement.category}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto px-4">
        <div className="mx-auto flex min-w-max justify-center">
          <div
            className="periodic-table-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 80px)',
              gridTemplateRows: '60px 12px repeat(9, 80px)',
              columnGap: '4px',
              rowGap: '4px',
              gridAutoFlow: 'dense',
            }}
          >
            {domains.map((domain, index) => (
              <div
                key={`header-${domain.code}`}
                style={{
                  gridColumn: index + 1,
                  gridRow: 1,
                  color: domain.hexColor,
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease-in-out',
                }}
                onMouseEnter={() => {
                  const firstElement = frameworkElements.find(
                    (el) => el.domainCode === domain.code,
                  );
                  if (firstElement) {
                    handleElementMouseEnter(firstElement);
                  }
                }}
                onMouseLeave={handleElementMouseLeave}
                className="group hover:bg-opacity-20 flex cursor-pointer flex-col items-center justify-center border-[0.5px] border-zinc-600 p-2 hover:z-10 hover:scale-105"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = domain.hexColor + '33';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span className="text-2xl font-bold">{domain.code}</span>
              </div>
            ))}

            {frameworkElements.map((element) => (
              <ElementCard
                key={element.code}
                element={element}
                isActive={activeElement?.code === element.code}
                onMouseEnter={handleElementMouseEnter}
                onMouseLeave={handleElementMouseLeave}
                onClick={handleElementClick}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog open={selectedElement !== null} onOpenChange={(open) => !open && setSelectedElement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span
                style={{
                  color: selectedElement
                    ? getDomainByCode(selectedElement.domainCode)?.hexColor
                    : undefined,
                }}
              >
                {selectedElement?.code}
              </span>
              <span>-</span>
              <span>{selectedElement?.domainCode}</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            {selectedElement?.description || selectedElement?.name}
          </DialogDescription>
          <div className="space-y-4 pt-4">
            <div>
              <h4 className="text-foreground font-semibold">{selectedElement?.name}</h4>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Dominio:</span>
              <div className="text-sm">{selectedElement?.category}</div>
            </div>
            {selectedElement?.description && (
              <div>
                <span className="text-muted-foreground text-sm">Descripción:</span>
                <div className="text-sm">{selectedElement.description}</div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
