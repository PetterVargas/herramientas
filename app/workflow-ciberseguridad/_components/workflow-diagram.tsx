'use client';

import { useCallback } from 'react';

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Definidos fuera del componente: pasar un objeto nuevo en cada render como
// nodeTypes/edgeTypes dispara el warning de React Flow (#002), aunque estén
// vacíos.
const nodeTypes = {};
const edgeTypes = {};

const initialNodes: Node[] = [
  // Admin section (Izquierda - Inicio)
  {
    id: 'admin-user',
    type: 'input',
    data: { label: 'Colaborador Interno' },
    position: { x: 0, y: 200 },
    style: {
      background: '#dc2626',
      color: 'white',
      border: '2px solid #b91c1c',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'admin-auth',
    data: { label: 'Autenticación Admin' },
    position: { x: 200, y: 200 },
    style: {
      background: '#f87171',
      color: 'white',
      border: '2px solid #ef4444',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'admin-panel',
    data: { label: 'Panel de Administración' },
    position: { x: 400, y: 200 },
    style: {
      background: '#ef4444',
      color: 'white',
      border: '2px solid #dc2626',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },

  // Infrastructure Management (Centro-Izquierda)
  {
    id: 'deployment',
    data: { label: 'Despliegue & CI/CD' },
    position: { x: 600, y: 50 },
    style: {
      background: '#fdba74',
      color: '#7c2d12',
      border: '2px solid #fb923c',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'monitoring',
    data: { label: 'Monitoreo & Logs' },
    position: { x: 600, y: 350 },
    style: {
      background: '#f97316',
      color: 'white',
      border: '2px solid #ea580c',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'infrastructure',
    data: { label: 'Gestión de Infraestructura' },
    position: { x: 400, y: 350 },
    style: {
      background: '#fb923c',
      color: 'white',
      border: '2px solid #f97316',
      borderRadius: '8px',
      padding: '10px',
    },
  },

  // Website section (Centro)
  {
    id: 'web-server',
    data: { label: 'Servidor Web (Next.js)' },
    position: { x: 800, y: 200 },
    style: {
      background: '#34d399',
      color: 'white',
      border: '2px solid #10b981',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },
  {
    id: 'database',
    data: { label: 'Base de Datos (Supabase)' },
    position: { x: 600, y: 500 },
    style: {
      background: '#f59e0b',
      color: 'white',
      border: '2px solid #d97706',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'api-server',
    data: { label: 'API Server' },
    position: { x: 1000, y: 350 },
    style: {
      background: '#6ee7b7',
      color: '#065f46',
      border: '2px solid #34d399',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'storage',
    data: { label: 'Storage / CDN' },
    position: { x: 1000, y: 50 },
    style: {
      background: '#f59e0b',
      color: 'white',
      border: '2px solid #d97706',
      borderRadius: '8px',
      padding: '10px',
    },
  },

  // Load Balancer (Centro-Derecha)
  {
    id: 'load-balancer',
    data: { label: 'Load Balancer' },
    position: { x: 1200, y: 200 },
    style: {
      background: '#10b981',
      color: 'white',
      border: '2px solid #059669',
      borderRadius: '8px',
      padding: '10px',
      fontWeight: 'bold',
    },
  },

  // Cliente section (Derecha - Final)
  {
    id: 'request',
    data: { label: 'Solicitud HTTP' },
    position: { x: 1400, y: 200 },
    style: {
      background: '#a78bfa',
      color: 'white',
      border: '2px solid #8b5cf6',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'browser',
    data: { label: 'Navegador Web' },
    position: { x: 1600, y: 200 },
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '2px solid #7c3aed',
      borderRadius: '8px',
      padding: '10px',
    },
  },
  {
    id: 'client-device',
    // Sin `type: 'output'`: ese tipo solo renderiza un target handle, pero
    // el edge e18 (abajo) usa este nodo como *source* para representar el
    // flujo de vuelta del cliente — necesita también el source handle.
    data: { label: 'Cliente (Dispositivo)' },
    position: { x: 1800, y: 200 },
    style: {
      background: '#6366f1',
      color: 'white',
      border: '2px solid #4f46e5',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
];

const initialEdges: Edge[] = [
  // Admin flow (Izquierda - Inicio)
  {
    id: 'e1',
    source: 'admin-user',
    target: 'admin-auth',
    animated: true,
    style: { stroke: '#ef4444' },
  },
  {
    id: 'e2',
    source: 'admin-auth',
    target: 'admin-panel',
    animated: true,
    style: { stroke: '#ef4444' },
  },

  // Infrastructure management flow
  {
    id: 'e3',
    source: 'admin-panel',
    target: 'deployment',
    animated: true,
    style: { stroke: '#f97316' },
  },
  {
    id: 'e4',
    source: 'admin-panel',
    target: 'monitoring',
    style: { stroke: '#f97316' },
  },
  {
    id: 'e5',
    source: 'admin-panel',
    target: 'infrastructure',
    style: { stroke: '#f97316' },
  },

  // Infrastructure to Application
  {
    id: 'e6',
    source: 'deployment',
    target: 'web-server',
    animated: true,
    style: { stroke: '#fb923c' },
  },
  {
    id: 'e7',
    source: 'infrastructure',
    target: 'database',
    style: { stroke: '#fb923c' },
  },
  {
    id: 'e8',
    source: 'monitoring',
    target: 'web-server',
    style: { stroke: '#f97316', strokeDasharray: '5 5' },
  },

  // Website backend flow
  {
    id: 'e9',
    source: 'web-server',
    target: 'api-server',
    style: { stroke: '#34d399' },
  },
  {
    id: 'e10',
    source: 'web-server',
    target: 'storage',
    style: { stroke: '#34d399' },
  },
  {
    id: 'e11',
    source: 'web-server',
    target: 'database',
    style: { stroke: '#34d399' },
  },
  {
    id: 'e12',
    source: 'api-server',
    target: 'database',
    style: { stroke: '#6ee7b7' },
  },

  // Response flow from database
  {
    id: 'e13',
    source: 'database',
    target: 'web-server',
    animated: true,
    style: { stroke: '#f59e0b', strokeDasharray: '5 5' },
  },

  // Website to Load Balancer
  {
    id: 'e14',
    source: 'web-server',
    target: 'load-balancer',
    animated: true,
    style: { stroke: '#10b981' },
  },

  // Load Balancer to Client (Derecha - Final)
  {
    id: 'e15',
    source: 'load-balancer',
    target: 'request',
    animated: true,
    style: { stroke: '#10b981' },
  },
  {
    id: 'e16',
    source: 'request',
    target: 'browser',
    animated: true,
    style: { stroke: '#a78bfa' },
  },
  {
    id: 'e17',
    source: 'browser',
    target: 'client-device',
    animated: true,
    style: { stroke: '#8b5cf6' },
  },

  // Return flow from client (optional - para mostrar requests del cliente)
  {
    id: 'e18',
    source: 'client-device',
    target: 'browser',
    animated: true,
    style: { stroke: '#6366f1', strokeDasharray: '5 5' },
  },
  {
    id: 'e19',
    source: 'browser',
    target: 'load-balancer',
    animated: true,
    style: { stroke: '#8b5cf6', strokeDasharray: '5 5' },
  },
];

export function WorkflowDiagram() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[calc(100vh-200px)] min-h-[800px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        className="bg-background"
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            return node.style?.background as string;
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
