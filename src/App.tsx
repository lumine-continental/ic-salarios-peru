/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Star, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { careers } from './data';

export default function App() {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'demand' | 'salary'>('demand');

  // Get unique areas for the dropdown
  const areas = useMemo(() => {
    const uniqueAreas = new Set(careers.map(c => c.area));
    return Array.from(uniqueAreas);
  }, []);

  // Filter data based on selections
  const filteredCareers = useMemo(() => {
    let result = careers.filter(career => {
      const matchesArea = selectedArea === '' || career.area === selectedArea;
      const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesArea && matchesSearch;
    });

    if (sortBy === 'demand') {
      result.sort((a, b) => b.demand - a.demand);
    } else if (sortBy === 'salary') {
      result.sort((a, b) => b.avg - a.avg);
    }

    return result;
  }, [selectedArea, searchTerm, sortBy]);

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
      <div className="bg-black text-white pt-24 pb-36 px-4 relative overflow-hidden">
        <img 
          src="https://i.imgur.com/V1ngU0s.jpeg" 
          alt="Estudiantes universitarios" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-2xl font-extrabold tracking-tighter mb-6 uppercase">
            Conoce la carrera que te 
            <span className="text-[#e4000b]"> hará despegar</span>
          </h1>
          <p className="text-gray-300 text-xs max-w-2xl mx-auto font-light">
            Fuentes: ​
            <br />1. Encuesta de Demanda Ocupacional 2026 – EDO (p. 6) (MTPE, 2025).​
            <br />2. Portal Mi Carrera (MINEDU, 2025). Sueldos reportados de trabajadores jóvenes (18 a 29 años).​
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <form onSubmit={handleSearch} className="bg-white p-6 md:p-8 shadow-2xl rounded-2xl border-t-8 border-[#e4000b]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Área de estudio
              </label>
              <select 
                className="w-full border-2 border-gray-200 py-3 px-4 bg-transparent focus:outline-none focus:border-[#e4000b] transition-colors rounded-xl font-medium text-black cursor-pointer"
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
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Ordenar por
              </label>
              <select 
                className="w-full border-2 border-gray-200 py-3 px-4 bg-transparent focus:outline-none focus:border-[#e4000b] transition-colors rounded-xl font-medium text-black cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'demand' | 'salary')}
              >
                <option value="demand">Más demandadas</option>
                <option value="salary">Mejor pagadas</option>
              </select>
            </div>

            <div className="md:col-span-2 relative">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Buscar Carrera
              </label>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                <input 
                  type="text" 
                  placeholder="Ej. Administración, Mecánica..." 
                  className="w-full border-2 border-gray-200 py-3 px-4 bg-transparent focus:outline-none focus:border-[#e4000b] transition-colors rounded-xl sm:rounded-r-none font-medium text-black placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-[#e4000b] hover:bg-black text-white px-8 py-3 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 whitespace-nowrap rounded-xl sm:rounded-l-none sm:-ml-2 z-10"
                >
                  <Search size={18} />
                  Buscar
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* RESULTS SECTION */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b-2 border-gray-200 pb-4 gap-4">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-black">Resultados</h2>
            <span className="text-gray-500 font-bold uppercase tracking-wider text-sm bg-gray-100 px-4 py-2 rounded-full">
              {filteredCareers.length} carreras encontradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career, index) => (
                <div 
                  key={career.id} 
                  className={`group bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-lg rounded-2xl border-2 flex flex-col h-full ${
                    career.isContinental 
                      ? 'border-[#e4000b] shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {/* Header: Area & Ranking */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {career.area}
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-50 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors">
                      <span className="text-sm font-black text-gray-400 group-hover:text-black transition-colors">
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title & Badges */}
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold uppercase text-black leading-tight mb-2">
                      {career.name}
                    </h3>
                    
                    {/* Availability / Continental Badges */}
                    {career.availability === 'available' && career.isContinental && (
                      <div className="inline-flex items-center gap-1.5 mb-3 bg-[#e4000b] text-[white] text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        <GraduationCap size={14} />
                        Disponible en Instituto Continental
                      </div>
                    )}

                    {career.availability === 'coming_soon' && (
                      <div className="inline-flex items-center gap-1.5 mb-3 bg-black text-[white] text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                        <GraduationCap size={14} />
                        Próximamente
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-medium mb-4">
                      <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                        <MapPin size={12} /> Nacional
                      </span>
                      <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                        <Briefcase size={12} /> 18 a 29 años
                      </span>
                    </div>
                  </div>

                  {/* Footer: Stats & Action */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
                    <div className="w-full sm:w-auto flex flex-row gap-6 items-center">
                      {sortBy === 'demand' ? (
                        <>
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                              Puestos Solicitados
                            </p>
                            <p className="text-xl font-black text-[#e4000b] leading-none">
                              {career.demand.toLocaleString('es-PE')}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                              Año de estudio
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              2026
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                              Ingreso Promedio
                            </p>
                            <p className="text-xl font-black text-[#e4000b] leading-none">
                              {formatCurrency(career.avg)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                              Rango Salarial
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {formatCurrency(career.min)} - {formatCurrency(career.max)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="w-full sm:w-auto">
                      {career.availability === 'not_available' || !career.href ? (
                        <button
                          disabled
                          className="w-full px-5 py-3 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 rounded-xl bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          Ver detalle <ChevronRight size={14} />
                        </button>
                      ) : (
                        <a
                          href={career.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <button className={`w-full px-5 py-3 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 rounded-xl ${
                            career.isContinental
                              ? 'bg-[#e4000b] text-white hover:bg-black'
                              : 'bg-black text-white hover:bg-[#e4000b]'
                          }`}>
                            Ver detalle <ChevronRight size={14} />
                          </button>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-white border-2 border-dashed border-gray-200 rounded-2xl md:col-span-2">
                <p className="text-xl font-bold text-gray-400 uppercase tracking-wider">
                  No se encontraron carreras
                </p>
                <p className="text-gray-500 mt-2 font-medium">
                  Intenta con otros términos de búsqueda o cambia el área de estudio.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
