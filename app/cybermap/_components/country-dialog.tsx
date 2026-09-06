'use client';

import { useToolFullscreenContainer } from '@/components/tool-fullscreen';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getCyberProfile } from '../_lib/cyber-profiles';
import type { CountryDetails, CyberProfileEntry } from '../_lib/types';

type CountryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  countryDetails?: CountryDetails;
};

function ProfileSection({
  entries,
  emptyLabel,
}: {
  entries?: CyberProfileEntry[];
  emptyLabel: string;
}) {
  if (!entries || entries.length === 0) {
    return <p className="text-muted-foreground py-6 text-sm">{emptyLabel}</p>;
  }

  return (
    <ul className="flex max-h-72 flex-col gap-3 overflow-y-auto py-3 pr-1">
      {entries.map((entry) => (
        <li key={entry.name} className="border-b pb-3 last:border-b-0 last:pb-0">
          {entry.url ? (
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              {entry.name}
            </a>
          ) : (
            <span className="text-sm font-medium">{entry.name}</span>
          )}
          {entry.description && (
            <p className="text-muted-foreground mt-1 text-sm">
              {entry.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CountryDialog({
  isOpen,
  onClose,
  countryName,
  countryDetails,
}: CountryDialogProps) {
  const isoCode = countryDetails?.['ISO-alpha2 Code'];
  const cyberProfile = isoCode ? getCyberProfile(isoCode) : undefined;
  const fullscreenContainer = useToolFullscreenContainer();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        container={fullscreenContainer ?? undefined}
        className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{countryName}</DialogTitle>
          <DialogDescription className="sr-only">
            Panorama de ciberseguridad y protección de datos de {countryName}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="interestGroups" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-5">
            <TabsTrigger value="interestGroups" className="text-xs sm:text-sm">
              Grupos de interés
            </TabsTrigger>
            <TabsTrigger value="authorities" className="text-xs sm:text-sm">
              Autoridades
            </TabsTrigger>
            <TabsTrigger value="cyberRegulations" className="text-xs sm:text-sm">
              Ciberseguridad
            </TabsTrigger>
            <TabsTrigger value="dataRegulations" className="text-xs sm:text-sm">
              Protección de datos
            </TabsTrigger>
            <TabsTrigger value="judicialRequests" className="text-xs sm:text-sm">
              Solicitudes judiciales
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interestGroups">
            <ProfileSection
              entries={cyberProfile?.interestGroups}
              emptyLabel="Aún no hay grupos de interés registrados para este país."
            />
          </TabsContent>
          <TabsContent value="authorities">
            <ProfileSection
              entries={cyberProfile?.authorities}
              emptyLabel="Aún no hay autoridades registradas para este país."
            />
          </TabsContent>
          <TabsContent value="cyberRegulations">
            <ProfileSection
              entries={cyberProfile?.cybersecurityRegulations}
              emptyLabel="Aún no hay normativas de ciberseguridad registradas para este país."
            />
          </TabsContent>
          <TabsContent value="dataRegulations">
            <ProfileSection
              entries={cyberProfile?.dataProtectionRegulations}
              emptyLabel="Aún no hay normativas de protección de datos registradas para este país."
            />
          </TabsContent>
          <TabsContent value="judicialRequests">
            <ProfileSection
              entries={cyberProfile?.judicialRequestContacts}
              emptyLabel="Aún no hay contactos de empresas para solicitudes judiciales registrados para este país."
            />
          </TabsContent>
        </Tabs>

        {countryDetails ? (
          <div className="text-muted-foreground/70 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-[11px]">
            <span>M49: {countryDetails['M49 Code']}</span>
            <span>ISO-alpha2: {countryDetails['ISO-alpha2 Code']}</span>
            <span>ISO-alpha3: {countryDetails['ISO-alpha3 Code']}</span>
            {countryDetails['Least Developed Countries (LDC)'] && (
              <span>
                LDC: {countryDetails['Least Developed Countries (LDC)']}
              </span>
            )}
            {countryDetails['Land Locked Developing Countries (LLDC)'] && (
              <span>
                LLDC:{' '}
                {countryDetails['Land Locked Developing Countries (LLDC)']}
              </span>
            )}
            {countryDetails['Small Island Developing States (SIDS)'] && (
              <span>
                SIDS: {countryDetails['Small Island Developing States (SIDS)']}
              </span>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground/70 border-t pt-3 text-[11px]">
            No hay información estadística disponible para este país.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
