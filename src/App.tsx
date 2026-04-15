/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Star, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { careers } from './data';

export default function App() {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  // Get unique areas for the dropdown
  const areas = useMemo(() => {
    const uniqueAreas = new Set(careers.map(c => c.area));
    return Array.from(uniqueAreas);
  }, []);

  // Filter data based on selections
  const filteredCareers = useMemo(() => {
    let result = careers.filter(career => {
      return selectedArea === '' || career.area === selectedArea;
    });

    // Always sort by demand
    result.sort((a, b) => b.demand - a.demand);

    return result;
  }, [selectedArea]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return `S/ ${value.toLocaleString('es-PE')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans selection:bg-[#e4000b] selection:text-white pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-black text-white pt-16 pb-24 px-4 relative overflow-hidden">
        <img 
          src="https://i.imgur.com/V1ngU0s.jpeg" 
          alt="Estudiantes universitarios" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3 uppercase">
            Conoce la carrera que te 
            <span className="text-[#e4000b]"> hará despegar</span>
          </h1>
          <p className="text-gray-300 text-[9px] md:text-[10px] max-w-2xl mx-auto font-light leading-relaxed">
            Fuentes: ​
            <br />1. Encuesta de Demanda Ocupacional 2026 – EDO (p. 6) (MTPE, 2025).​
            <br />2. Portal Mi Carrera (MINEDU, 2025). Sueldos reportados de trabajadores jóvenes (18 a 29 años).​
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <form onSubmit={handleSearch} className="bg-white p-3 md:p-4 shadow-xl rounded-xl border-t-4 border-[#e4000b]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            
            <div className="md:col-span-1">
              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Área de estudio
              </label>
              <select 
                className="w-full border border-gray-200 py-1.5 px-2.5 bg-transparent focus:outline-none focus:border-[#e4000b] transition-colors rounded-lg text-xs font-medium text-black cursor-pointer"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">Todas las áreas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Ordenar por
              </label>
              <select 
                className="w-full border border-gray-200 py-1.5 px-2.5 bg-gray-50 focus:outline-none transition-colors rounded-lg text-xs font-medium text-gray-400 cursor-not-allowed"
                disabled
              >
                <option value="demand">Más demandadas</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <button 
                type="submit"
                className="w-full bg-[#e4000b] hover:bg-black text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 rounded-lg"
              >
                <Search size={14} />
                Buscar
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* RESULTS SECTION */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 py-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 border-b border-gray-200 pb-2 gap-2">
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-black">Resultados</h2>
            <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredCareers.length} carreras encontradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career, index) => (
                <div 
                  key={career.id} 
                  className={`group bg-white p-2.5 sm:p-3 transition-all duration-300 hover:shadow-md rounded-xl border flex flex-col gap-2 ${
                    career.isContinental 
                      ? 'border-[#e4000b] shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Header: Ranking, Area & Title */}
                  <div className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-50 flex items-center justify-center rounded-full border border-gray-200">
                      <span className="text-[10px] font-black text-gray-400 group-hover:text-black transition-colors">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-[8px] font-bold text-gray-500 uppercase tracking-wider leading-none mb-1">
                        {career.area}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold uppercase text-black leading-tight truncate">
                        {career.name}
                      </h3>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {career.availability === 'available' && career.isContinental && (
                      <div className="inline-flex items-center gap-1 bg-[#e4000b] text-white text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        <GraduationCap size={8} />
                        Disponible en Instituto Continental
                      </div>
                    )}

                    {career.availability === 'coming_soon' && (
                      <div className="inline-flex items-center gap-1 bg-black text-white text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        <GraduationCap size={8} />
                        Próximamente
                      </div>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100 mt-auto">
                    <div className="flex flex-col">
                      <div className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">
                        Puestos <span className="text-gray-300 mx-0.5">|</span> Edades
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-black text-[#e4000b] leading-none">
                          {career.demand.toLocaleString('es-PE')}
                        </span>
                        <span className="text-gray-300 text-[9px]">|</span>
                        <span className="text-[9px] font-bold text-gray-600 leading-none whitespace-nowrap">
                          18-29 años
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">
                        Media <span className="text-gray-300 mx-0.5">|</span> Rangos
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs font-black text-black leading-none">
                          {formatCurrency(career.avg)}
                        </span>
                        <span className="text-gray-300 text-[9px]">|</span>
                        <span className="text-[8px] font-bold text-gray-500 leading-none whitespace-nowrap">
                          {formatCurrency(career.min).replace('S/ ', '')}-{formatCurrency(career.max).replace('S/ ', '')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-1">
                    {career.availability === 'not_available' || !career.href ? (
                      <button
                        disabled
                        className="w-full px-3 py-1.5 font-bold uppercase tracking-wider text-[9px] transition-colors rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                      >
                        Ver detalle
                      </button>
                    ) : (
                      <a
                        href={career.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full"
                      >
                        <button className={`w-full px-3 py-1.5 font-bold uppercase tracking-wider text-[9px] transition-colors rounded-lg ${
                          career.isContinental
                            ? 'bg-[#e4000b] text-white hover:bg-black'
                            : 'bg-black text-white hover:bg-[#e4000b]'
                        }`}>
                          Ver detalle
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white border border-dashed border-gray-200 rounded-xl md:col-span-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  No se encontraron carreras
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
