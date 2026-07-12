'use client';

import { FrameworkElement, getDomainByCode } from './framework-data';

interface ElementCardProps {
  element: FrameworkElement;
  isActive: boolean;
  onMouseEnter: (element: FrameworkElement) => void;
  onMouseLeave: () => void;
  onClick: (element: FrameworkElement) => void;
}

export function ElementCard({
  element,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ElementCardProps) {
  const domain = getDomainByCode(element.domainCode);

  // Special rendering for H elements
  if (element.isSpecial) {
    return (
      <div
        style={{
          gridArea: `${element.ypos} / ${element.xpos} / ${element.ypos + 1} / ${element.xpos + 1}`,
          color: isActive ? 'black' : domain?.hexColor || '#dadcca',
          backgroundColor: isActive ? domain?.hexColor : 'transparent',
          transition: 'all 0.3s ease-in-out',
        }}
        onMouseEnter={() => onMouseEnter(element)}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(element)}
        className="group flex cursor-pointer items-center justify-center border-[0.5px] border-zinc-600 hover:z-10 hover:scale-105"
        data-test={`element-${element.code}`}
      >
        <span className="text-4xl font-bold">H</span>
      </div>
    );
  }

  return (
    <div
      style={{
        gridArea: `${element.ypos} / ${element.xpos} / ${element.ypos + 1} / ${element.xpos + 1}`,
        color: isActive ? 'black' : domain?.hexColor || '#dadcca',
        backgroundColor: isActive ? domain?.hexColor : 'transparent',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={() => onMouseEnter(element)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(element)}
      className="group flex cursor-pointer flex-col border-[0.5px] border-zinc-600 p-1 hover:z-10 hover:scale-105"
      data-test={`element-${element.code}`}
    >
      <div className="leading-[14px]">
        <span className="pl-[2px] text-[9px]">{element.number}</span>
        <div className="flex flex-col items-center justify-center pt-1 text-center">
          <span className="text-xl font-bold">{element.domainCode}</span>
          <span className="pt-1 text-[9px]">{element.code}</span>
        </div>
      </div>
    </div>
  );
}
