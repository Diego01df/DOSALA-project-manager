export enum ProjectType {
  Residential = 'Residential',
  Multifamily = 'Multifamily',
  Commercial = 'Commercial',
  Hospitality = 'Hospitality',
  Interior = 'Interior',
}

export enum ProjectPhase {
  PreDesign = 'Pre-Design',
  Concept = 'Concept',
  DD = 'Schematic Design',
  CD = 'Construction Documents',
  Permit = 'Permitting',
  CA = 'Construction Admin',
  Completed = 'Completed'
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  address: string;
}

export interface Project {
  id: string;
  name:string;
  year: number;
  location: string;
  clientId: string;
  type: ProjectType;
  phase: ProjectPhase;
  description: string;
  team: string[];
  images: string[];
}