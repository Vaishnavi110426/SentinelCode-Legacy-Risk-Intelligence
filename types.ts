
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  DANGER = 'DANGER'
}

export interface RiskMetrics {
  complexity: number; // 0-100 (Cyclomatic complexity normalized)
  churn: number; // 0-100 (Frequency of changes)
  coupling: number; // 0-100 (Fan-in/Fan-out)
  coverage: number; // 0-100 (Test coverage)
  ownership: number; // 0-100 (Knowledge concentration)
}

export interface Dependency {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing';
  riskScore: number;
}

export interface CodeModule {
  id: string;
  name: string;
  path: string;
  language: 'java' | 'python' | 'typescript';
  riskScore: number;
  level: RiskLevel;
  metrics: RiskMetrics;
  explanation?: string;
  refactoringPath?: string[];
  dependencies: Dependency[];
  lastCommitDate: string;
  linesOfCode: number;
}

export interface AnalysisState {
  selectedModule: CodeModule | null;
  loading: boolean;
  error: string | null;
}
