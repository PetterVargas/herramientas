import { listZipEntries, readZipEntryText } from './zip';

export interface OoxmlMetadata {
  title?: string;
  subject?: string;
  creator?: string;
  keywords?: string;
  description?: string;
  lastModifiedBy?: string;
  revision?: string;
  created?: string;
  modified?: string;
  category?: string;
  application?: string;
  appVersion?: string;
  company?: string;
  manager?: string;
  totalEditTime?: string;
  pages?: string;
  words?: string;
  characters?: string;
}

function textOf(doc: Document, tagName: string): string | undefined {
  const el = doc.getElementsByTagName(tagName)[0];
  const text = el?.textContent?.trim();
  return text ? text : undefined;
}

export async function extractOoxmlMetadata(bytes: Uint8Array): Promise<OoxmlMetadata> {
  const entries = listZipEntries(bytes);
  const result: OoxmlMetadata = {};

  const coreXml = await readZipEntryText(bytes, entries, 'docProps/core.xml');
  if (coreXml) {
    const doc = new DOMParser().parseFromString(coreXml, 'application/xml');
    result.title = textOf(doc, 'dc:title');
    result.subject = textOf(doc, 'dc:subject');
    result.creator = textOf(doc, 'dc:creator');
    result.keywords = textOf(doc, 'cp:keywords');
    result.description = textOf(doc, 'dc:description');
    result.lastModifiedBy = textOf(doc, 'cp:lastModifiedBy');
    result.revision = textOf(doc, 'cp:revision');
    result.created = textOf(doc, 'dcterms:created');
    result.modified = textOf(doc, 'dcterms:modified');
    result.category = textOf(doc, 'cp:category');
  }

  const appXml = await readZipEntryText(bytes, entries, 'docProps/app.xml');
  if (appXml) {
    const doc = new DOMParser().parseFromString(appXml, 'application/xml');
    result.application = textOf(doc, 'Application');
    result.appVersion = textOf(doc, 'AppVersion');
    result.company = textOf(doc, 'Company');
    result.manager = textOf(doc, 'Manager');
    result.totalEditTime = textOf(doc, 'TotalTime');
    result.pages = textOf(doc, 'Pages');
    result.words = textOf(doc, 'Words');
    result.characters = textOf(doc, 'Characters');
  }

  return result;
}
