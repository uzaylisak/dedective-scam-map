'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'cryptonest',
    data: { label: 'CryptoNest (Proje)' },
    position: { x: 400, y: 100 },
    style: { background: '#ffe082', border: '2px solid #ffb300', fontWeight: 'bold' },
  },
];

const allNodes: Node[] = [
  {
    id: 'cryptonest',
    data: { label: 'CryptoNest (Proje)' },
    position: { x: 400, y: 100 },
    style: { background: '#ffe082', border: '2px solid #ffb300', fontWeight: 'bold' },
  },
  {
    id: 'alex',
    data: { label: 'Alex Thorn\n(Takma ad, sahte KYC)' },
    position: { x: 100, y: 250 },
    style: { background: '#b3e5fc', border: '2px solid #0288d1' },
    parentNode: 'cryptonest',
  },
  {
    id: 'techforge',
    data: { label: 'TechForge Ltd.\n(Sahte şirket)' },
    position: { x: 300, y: 250 },
    style: { background: '#c8e6c9', border: '2px solid #388e3c' },
    parentNode: 'cryptonest',
  },
  {
    id: 'chainlabs',
    data: { label: 'ChainLabs\n(Sahte denetim firması)' },
    position: { x: 500, y: 250 },
    style: { background: '#f8bbd0', border: '2px solid #c2185b' },
    parentNode: 'cryptonest',
  },
  {
    id: 'defiayla',
    data: { label: '@DeFiAyla\n(KOL, tanıtımcı)' },
    position: { x: 700, y: 250 },
    style: { background: '#fff9c4', border: '2px solid #fbc02d' },
    parentNode: 'cryptonest',
  },
  {
    id: 'yatirimcilar',
    data: { label: 'Yatırımcılar' },
    position: { x: 900, y: 250 },
    style: { background: '#d1c4e9', border: '2px solid #512da8' },
    parentNode: 'cryptonest',
  },
  {
    id: 'n3x0x',
    data: { label: '@N3x0x\n(Cüzdan, 2.400 ETH)' },
    position: { x: 900, y: 400 },
    style: { background: '#ffe0b2', border: '2px solid #e65100' },
    parentNode: 'yatirimcilar',
  },
  {
    id: 'tornado',
    data: { label: 'Tornado Cash\n(İz kaybettirici)' },
    position: { x: 1100, y: 400 },
    style: { background: '#b2dfdb', border: '2px solid #00695c' },
    parentNode: 'n3x0x',
  },
  {
    id: 'dedektifler',
    data: { label: 'Zincir Dedektifleri\n(Araştırmacılar)' },
    position: { x: 700, y: 400 },
    style: { background: '#f0f4c3', border: '2px solid #827717' },
    parentNode: 'n3x0x',
  },
  {
    id: 'sahte-kyc',
    data: { label: 'Sahte KYC Belgeleri' },
    position: { x: 100, y: 400 },
    style: { background: '#ffccbc', border: '2px solid #d84315' },
    parentNode: 'alex',
  },
  {
    id: 'sahte-rapor',
    data: { label: 'Sahte Denetim Raporu' },
    position: { x: 500, y: 400 },
    style: { background: '#e1bee7', border: '2px solid #6a1b9a' },
    parentNode: 'chainlabs',
  },
  {
    id: 'staking',
    data: { label: 'Staking Platformu\n(Token dağıtımı)' },
    position: { x: 300, y: 400 },
    style: { background: '#c5cae9', border: '2px solid #283593' },
    parentNode: 'techforge',
  },
];

const allEdges: Edge[] = [
  { id: 'e1', source: 'cryptonest', target: 'alex', animated: true },
  { id: 'e2', source: 'cryptonest', target: 'techforge', animated: true },
  { id: 'e3', source: 'cryptonest', target: 'chainlabs', animated: true },
  { id: 'e4', source: 'cryptonest', target: 'defiayla', animated: true },
  { id: 'e5', source: 'cryptonest', target: 'yatirimcilar', animated: true },
  { id: 'e6', source: 'techforge', target: 'staking' },
  { id: 'e7', source: 'chainlabs', target: 'sahte-rapor' },
  { id: 'e8', source: 'alex', target: 'sahte-kyc' },
  { id: 'e9', source: 'yatirimcilar', target: 'n3x0x' },
  { id: 'e10', source: 'n3x0x', target: 'tornado' },
  { id: 'e11', source: 'n3x0x', target: 'dedektifler' },
];

const nodeChildren: Record<string, string[]> = {
  cryptonest: ['alex', 'techforge', 'chainlabs', 'defiayla', 'yatirimcilar'],
  techforge: ['staking'],
  chainlabs: ['sahte-rapor'],
  alex: ['sahte-kyc'],
  yatirimcilar: ['n3x0x'],
  n3x0x: ['tornado', 'dedektifler'],
};

function getSubtree(nodeId: string, nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const resultNodes: Node[] = [];
  const resultEdges: Edge[] = [];
  const visited = new Set<string>();

  function dfs(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const node = nodes.find((n) => n.id === id);
    if (node) resultNodes.push(node);
    (nodeChildren[id] || []).forEach((childId) => {
      const edge = edges.find((e) => e.source === id && e.target === childId);
      if (edge) resultEdges.push(edge);
      dfs(childId);
    });
  }

  dfs(nodeId);
  return { nodes: resultNodes, edges: resultEdges };
}

export default function ScamDetectiveGraph() {
  const [visibleNodes, setVisibleNodes] = useState<Node[]>(initialNodes);
  const [visibleEdges, setVisibleEdges] = useState<Edge[]>([]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const subtree = getSubtree(node.id, allNodes, allEdges);
      // Sadece yeni eklenmeyenleri ekle
      setVisibleNodes((prev) => {
        const ids = new Set(prev.map((n) => n.id));
        return [...prev, ...subtree.nodes.filter((n) => !ids.has(n.id))];
      });
      setVisibleEdges((prev) => {
        const ids = new Set(prev.map((e) => e.id));
        return [...prev, ...subtree.edges.filter((e) => !ids.has(e.id))];
      });
    },
    []
  );

  return (
    <div style={{ width: '100%', height: '80vh', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #ccc' }}>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodeClick={handleNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <MiniMap />
        <Controls />
        <Background color="#e3e3e3" gap={16} />
      </ReactFlow>
      <div style={{ textAlign: 'center', marginTop: 10, color: '#888' }}>
        Düğüme tıklayarak detayları açabilirsin.
      </div>
    </div>
  );
}