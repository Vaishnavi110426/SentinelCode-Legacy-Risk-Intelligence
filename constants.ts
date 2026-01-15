
import { CodeModule, RiskLevel } from './types';

export const RISK_WEIGHTS = {
  complexity: 0.35,
  churn: 0.25,
  coupling: 0.3,
  coverage: -0.2, // Higher coverage reduces risk
  ownership: 0.1
};

export const MOCK_PROJECT_DATA: CodeModule[] = [
  {
    id: '1',
    name: 'OrderProcessor.java',
    path: 'com/enterprise/order/service/OrderProcessor.java',
    language: 'java',
    riskScore: 92,
    level: RiskLevel.DANGER,
    metrics: {
      complexity: 95,
      churn: 88,
      coupling: 90,
      coverage: 12,
      ownership: 85
    },
    lastCommitDate: '2023-11-24',
    linesOfCode: 4200,
    dependencies: [
      { id: '2', name: 'InventorySync.java', type: 'outgoing', riskScore: 45 },
      { id: '3', name: 'PaymentGateway.java', type: 'outgoing', riskScore: 82 },
      { id: '4', name: 'EmailNotifier.java', type: 'outgoing', riskScore: 15 },
      { id: '5', name: 'OrderController.java', type: 'incoming', riskScore: 30 }
    ]
  },
  {
    id: '2',
    name: 'InventorySync.java',
    path: 'com/enterprise/inventory/InventorySync.java',
    language: 'java',
    riskScore: 45,
    level: RiskLevel.MEDIUM,
    metrics: {
      complexity: 40,
      churn: 30,
      coupling: 55,
      coverage: 65,
      ownership: 40
    },
    lastCommitDate: '2024-01-12',
    linesOfCode: 850,
    dependencies: [
      { id: '6', name: 'WarehouseDB.java', type: 'outgoing', riskScore: 20 }
    ]
  },
  {
    id: '3',
    name: 'PaymentGateway.java',
    path: 'com/enterprise/finance/PaymentGateway.java',
    language: 'java',
    riskScore: 82,
    level: RiskLevel.HIGH,
    metrics: {
      complexity: 78,
      churn: 65,
      coupling: 85,
      coverage: 40,
      ownership: 70
    },
    lastCommitDate: '2023-12-05',
    linesOfCode: 1500,
    dependencies: [
      { id: '7', name: 'StripeAdapter.java', type: 'outgoing', riskScore: 10 }
    ]
  },
  {
    id: '4',
    name: 'EmailNotifier.java',
    path: 'com/enterprise/common/EmailNotifier.java',
    language: 'java',
    riskScore: 15,
    level: RiskLevel.LOW,
    metrics: {
      complexity: 10,
      churn: 5,
      coupling: 20,
      coverage: 95,
      ownership: 10
    },
    lastCommitDate: '2024-02-14',
    linesOfCode: 120,
    dependencies: []
  },
  {
    id: '8',
    name: 'data_pipeline.py',
    path: 'scripts/analytics/data_pipeline.py',
    language: 'python',
    riskScore: 68,
    level: RiskLevel.HIGH,
    metrics: {
      complexity: 72,
      churn: 80,
      coupling: 45,
      coverage: 30,
      ownership: 60
    },
    lastCommitDate: '2024-01-20',
    linesOfCode: 2200,
    dependencies: []
  }
];
