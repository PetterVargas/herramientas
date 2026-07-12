'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { CountryDetails } from '../_lib/types';

type CountryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
  countryDetails?: CountryDetails;
};

export function CountryDialog({
  isOpen,
  onClose,
  countryName,
  countryDetails,
}: CountryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>{countryName}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {countryDetails ? (
            <div className="grid grid-cols-1 gap-4">
              <DialogDescription className="sr-only">
                Códigos e información estadística para {countryName}.
              </DialogDescription>
              <div className="flex flex-col">
                <span className="font-medium">Código M49:</span>
                <span>{countryDetails['M49 Code']}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Código ISO-alpha2:</span>
                <span>{countryDetails['ISO-alpha2 Code']}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-medium">Código ISO-alpha3:</span>
                <span>{countryDetails['ISO-alpha3 Code']}</span>
              </div>

              {countryDetails['Least Developed Countries (LDC)'] && (
                <div className="flex flex-col">
                  <span className="font-medium">
                    Países Menos Adelantados (LDC):
                  </span>
                  <span>{countryDetails['Least Developed Countries (LDC)']}</span>
                </div>
              )}

              {countryDetails['Land Locked Developing Countries (LLDC)'] && (
                <div className="flex flex-col">
                  <span className="font-medium">
                    Países en Desarrollo sin Litoral (LLDC):
                  </span>
                  <span>
                    {countryDetails['Land Locked Developing Countries (LLDC)']}
                  </span>
                </div>
              )}

              {countryDetails['Small Island Developing States (SIDS)'] && (
                <div className="flex flex-col">
                  <span className="font-medium">
                    Pequeños Estados Insulares en Desarrollo (SIDS):
                  </span>
                  <span>
                    {countryDetails['Small Island Developing States (SIDS)']}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <DialogDescription>
              No hay información disponible para este país.
            </DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
