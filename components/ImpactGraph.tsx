
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CodeModule } from '../types';

interface ImpactGraphProps {
  module: CodeModule;
}

const ImpactGraph: React.FC<ImpactGraphProps> = ({ module }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const nodes = [
      { id: module.id, name: module.name, score: module.riskScore, type: 'central' },
      ...module.dependencies.map(d => ({ id: d.id, name: d.name, score: d.riskScore, type: d.type }))
    ];

    const links = module.dependencies.map(d => ({
      source: d.type === 'incoming' ? d.id : module.id,
      target: d.type === 'incoming' ? module.id : d.id,
      type: d.type
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => d.type === 'incoming' ? '#3b82f6' : '#94a3b8')
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");

    // Arrowhead marker definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#94a3b8")
      .style("stroke", "none");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", d => d.type === 'central' ? 12 : 8)
      .attr("fill", d => {
        if (d.score > 80) return '#ef4444';
        if (d.score > 50) return '#f59e0b';
        return '#10b981';
      })
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("x", 15)
      .attr("y", 5)
      .text(d => d.name)
      .attr("fill", "#f8fafc")
      .style("font-size", "10px")
      .style("font-family", "Inter, sans-serif");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [module]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 h-full relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Blast Radius Map</h3>
      </div>
      <svg ref={svgRef} className="w-full h-full cursor-move" />
    </div>
  );
};

export default ImpactGraph;
