'use client';

import { ChecklistGroup } from '@/components/checklist-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { collaboratorSections, leaderSections } from '../_lib/checklist-data';

export function IncidentChecklist() {
  return (
    <Tabs defaultValue="colaborador" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="colaborador" data-test="tab-colaborador">
          Como colaborador
        </TabsTrigger>
        <TabsTrigger value="lider" data-test="tab-lider">
          Como líder del equipo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="colaborador" className="mt-4">
        <p className="text-muted-foreground mb-4 text-sm">
          Pasos inmediatos si tú detectas, causas o sospechas de un incidente de seguridad (por
          ejemplo, un clic en un enlace de phishing o la pérdida de un dispositivo).
        </p>
        <ChecklistGroup
          storageKey="herramientas:checklist-incidente-colaborador"
          sections={collaboratorSections}
        />
      </TabsContent>

      <TabsContent value="lider" className="mt-4">
        <p className="text-muted-foreground mb-4 text-sm">
          Pasos a seguir cuando lideras al equipo que enfrenta o reporta un incidente de
          seguridad.
        </p>
        <ChecklistGroup
          storageKey="herramientas:checklist-incidente-lider"
          sections={leaderSections}
        />
      </TabsContent>
    </Tabs>
  );
}
