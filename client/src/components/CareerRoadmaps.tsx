import React, { useState } from 'react';
import { ROADMAP_TRACKS } from '../data/roadmaps';
import { RoadmapTrack, RoadmapStep } from '../types';
const roadmapGraphic = '/manus-storage/academic_roadmap_path_1790354779688_e79701b0.jpg';
import {
  Compass,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Calendar,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface CareerRoadmapsProps {
  onNavigateToCalculator: (uniId?: string) => void;
  onNavigateToChecklist: (uniId?: string) => void;
  onNavigateToScholarships: (schId?: string) => void;
}

export const CareerRoadmaps: React.FC<CareerRoadmapsProps> = ({
  onNavigateToCalculator,
  onNavigateToChecklist,
  onNavigateToScholarships
}) => {
  const [activeSubsection, setActiveSubsection] = useState<'pakistan' | 'abroad'>('pakistan');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('track-engineering-ecat');
  const [expandedStepId, setExpandedStepId] = useState<string | null>('ecat-step-1');

  const visibleTracks = ROADMAP_TRACKS.filter(t => t.trackType === activeSubsection);

  const activeTrack =
    visibleTracks.find(t => t.id === selectedTrackId) || visibleTracks[0];

  const handleStepToolNavigation = (step: RoadmapStep) => {
    if (!step.linkedTool) return;
    const { toolName, param } = step.linkedTool;
    if (toolName === 'calculator') onNavigateToCalculator(param);
    if (toolName === 'checklist') onNavigateToChecklist(param);
    if (toolName === 'scholarships') onNavigateToScholarships(param);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-paper-200">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Step-by-Step Educational Pathways
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-paper-900 tracking-tight">
            Visual Admission Roadmaps
          </h1>
          <p className="text-sm text-paper-600 leading-relaxed">
            Transparent milestones from high school completion to campus enrollment. Discover exactly
            what tests to take, preparation timing, and how to avoid costly admission pitfalls.
          </p>
        </div>

        {/* Section switcher tab */}
        <div className="flex p-1 bg-paper-100 rounded-xl shrink-0 self-start md:self-auto border border-paper-200">
          <button
            onClick={() => {
              setActiveSubsection('pakistan');
              setSelectedTrackId('track-engineering-ecat');
              setExpandedStepId('ecat-step-1');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubsection === 'pakistan'
                ? 'bg-navy-600 text-white font-semibold shadow-xs'
                : 'text-paper-600 hover:text-navy-900'
            }`}
          >
            Subsection A: Study in Pakistan
          </button>
          <button
            onClick={() => {
              setActiveSubsection('abroad');
              setSelectedTrackId('track-abroad-usa');
              setExpandedStepId('usa-step-1');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubsection === 'abroad'
                ? 'bg-navy-600 text-white font-semibold shadow-xs'
                : 'text-paper-600 hover:text-navy-900'
            }`}
          >
            Subsection B: Study Abroad
          </button>
        </div>
      </div>

      {/* Track Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs no-scrollbar">
        {visibleTracks.map(track => {
          const isActive = track.id === activeTrack.id;
          return (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrackId(track.id);
                setExpandedStepId(track.steps[0]?.id || null);
              }}
              className={`px-4 py-2.5 rounded-lg border whitespace-nowrap font-medium transition-colors text-left shrink-0 ${
                isActive
                  ? 'bg-navy-600 text-white border-navy-600 shadow-xs'
                  : 'bg-paper-50 text-paper-700 border-paper-200 hover:border-paper-300 hover:bg-paper-50'
              }`}
            >
              <div className="font-semibold">{track.title.split('(')[0].trim()}</div>
              <div className={`text-[11px] ${isActive ? 'text-navy-100' : 'text-paper-400'}`}>
                {track.targetField}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Track Overview & Honest Reality Check */}
      <div className="bg-paper-50 border border-paper-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-paper-900">
            {activeTrack.title}
          </h2>
          <p className="text-xs text-paper-500 mt-1">{activeTrack.subtitle}</p>
          <p className="text-sm text-paper-700 mt-2 leading-relaxed">{activeTrack.summary}</p>
        </div>

        {/* Mandatory Honesty & Reality Check Banner */}
        <div className="bg-gold-50/80 border border-gold-200/90 rounded-lg p-4 flex items-start gap-3 text-xs text-gold-950">
          <AlertTriangle className="w-4 h-4 text-gold-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block uppercase tracking-wider text-[11px] text-gold-900">
              Critical Reality Check & Honesty Note:
            </span>
            <p className="leading-relaxed">{activeTrack.honestRealityCheck}</p>
          </div>
        </div>
      </div>

      {/* Connected Visual Process Flow / Metro Timeline */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-paper-900 uppercase tracking-wider">
          Journey Milestones ({activeTrack.steps.length} Sequential Steps)
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-navy-600/30 space-y-6">
          {activeTrack.steps.map((step, idx) => {
            const isExpanded = expandedStepId === step.id;
            return (
              <div key={step.id} className="relative group">
                {/* Milestone Node */}
                <div
                  onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer transition-colors ${
                    isExpanded
                      ? 'bg-navy-600 text-white shadow-xs'
                      : 'bg-paper-200 text-paper-700 group-hover:bg-paper-300'
                  }`}
                >
                  {step.stageNumber}
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all ${
                    isExpanded
                      ? 'bg-paper-50 border-navy-300 shadow-sm'
                      : 'bg-paper-50/80 border-paper-200 hover:bg-paper-50 hover:border-paper-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[11px] font-semibold text-navy-700 uppercase tracking-wider block">
                        Stage {step.stageNumber} · {step.timingWindow}
                      </span>
                      <h4 className="text-base font-serif font-semibold text-paper-900 mt-0.5">
                        {step.title}
                      </h4>
                    </div>

                    <span className="text-xs text-paper-400 group-hover:text-navy-900 font-medium">
                      {isExpanded ? 'Collapse' : 'Expand Details'}
                    </span>
                  </div>

                  <p className="text-xs text-paper-600 mt-2 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Expanded Step Details */}
                  {isExpanded && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="mt-4 pt-4 border-t border-paper-100 space-y-4 text-xs"
                    >
                      {/* Key Actions to Take */}
                      <div className="space-y-2">
                        <span className="font-semibold text-paper-900 block">
                          Key Concrete Actions:
                        </span>
                        <ul className="space-y-1.5 text-paper-700">
                          {step.actions.map((act, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-navy-600 shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Traps to Avoid */}
                      {step.watchOutTraps.length > 0 && (
                        <div className="bg-paper-50 border border-paper-200 rounded-lg p-3 space-y-1.5 text-paper-700">
                          <span className="font-semibold text-rose-900 block text-[11px] uppercase tracking-wider">
                            Common Pitfalls & Traps to Avoid:
                          </span>
                          <ul className="space-y-1 text-paper-600">
                            {step.watchOutTraps.map((trap, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="text-rose-700 font-bold">•</span>
                                <span>{trap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Linked In-App Tool Button */}
                      {step.linkedTool && (
                        <div className="pt-2">
                          <button
                            onClick={() => handleStepToolNavigation(step)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gold-300 hover:bg-gold-200 text-paper-950 font-bold rounded-lg text-xs border border-gold-400/40 shadow-xs transition-colors"
                          >
                            <span>{step.linkedTool.buttonLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-navy-900" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
