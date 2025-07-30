export type Event = {
  id: number;
  title: string;
  email: string;
  description?: string;
  date: string;
  participantCount?: number;
  isParticipating?: boolean;
};

export type User = {
  id: number;
  isAdmin: boolean;
  token: string;
};

export type EventFormData = {
  title: string;
  description: string;
  date: string;
};
