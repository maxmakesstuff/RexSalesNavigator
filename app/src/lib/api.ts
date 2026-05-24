import type { Company, AgentTask, AgentResult, Note } from '../types';

const json = (r: Response) => r.json();

export const api = {
  async strategy(): Promise<string> {
    const { markdown } = await fetch('/api/strategy').then(json);
    return markdown;
  },
  async research(which: '01' | '02' | '03'): Promise<string> {
    const { markdown } = await fetch(`/api/research?which=${which}`).then(json);
    return markdown;
  },
  async playbook(which: '01' | '02' | '03' | '04'): Promise<string> {
    const { markdown } = await fetch(`/api/playbook?which=${which}`).then(json);
    return markdown;
  },
  async customers(): Promise<Company[]> {
    return fetch('/api/customers').then(json);
  },
  async top50(): Promise<Company[]> {
    return fetch('/api/top50').then(json);
  },
  async agentInbox(): Promise<AgentTask[]> {
    return fetch('/api/agents/inbox').then(json);
  },
  async createAgentTask(task: AgentTask): Promise<{ ok: boolean; filename?: string }> {
    return fetch('/api/agents/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }).then(json);
  },
  async agentOutbox(): Promise<AgentResult[]> {
    return fetch('/api/agents/outbox').then(json);
  },
  async notes(): Promise<Note[]> {
    return fetch('/api/notes').then(json);
  },
  async addNote(note: Note): Promise<{ ok: boolean; id?: string }> {
    return fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    }).then(json);
  },
};
