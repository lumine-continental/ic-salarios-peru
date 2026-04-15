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

  // Get unique areas for the dropdown
  const areas = useMemo(() => {
    const uniqueAreas = new Set(careers.map(c => c.area));
    return Array.from(uniqueAreas);
  }, []);

  // Filter data based on selections
  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchesArea = selectedArea === '' || career.area === selectedArea;
      const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesArea && matchesSearch;
    });
  }, [selectedArea, searchTerm]);

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
          src="https://icontinental.edu.pe/wp-content/uploads/2025/10/bg-lp-exp2025-wtxt.jpg" 
          alt="Estudiantes universitarios" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
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
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
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
                Ranking
              </label>
              <select 
                className="w-full border-2 border-gray-200 py-3 px-4 bg-transparent focus:outline-none transition-colors rounded-xl font-medium text-gray-400 cursor-not-allowed"
                disabled
              >
                <option value="NACIONAL">NACIONAL</option>
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
        <div className="max-w-5xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b-2 border-gray-200 pb-4 gap-4">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-black">Resultados</h2>
            <span className="text-gray-500 font-bold uppercase tracking-wider text-sm bg-gray-100 px-4 py-2 rounded-full">
              {filteredCareers.length} carreras encontradas
            </span>
          </div>

          <div className="space-y-4">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career) => (
                <div 
                  key={career.id} 
                  className={`group bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-lg rounded-2xl border-2 ${
                    career.isContinental 
                      ? 'border-[#e4000b] shadow-sm' 
                      : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                    
                    {/* Ranking */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors hidden md:flex">
                      <span className="text-xl font-black text-gray-400 group-hover:text-black transition-colors">
                        #{career.ranking}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        {career.area}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase text-black leading-tight truncate whitespace-normal">
                        {career.name}
                      </h3>
                      
                      {/* Availability / Continental Badges */}
                      {career.availability === 'available' && career.isContinental && (
                        <div className="inline-flex items-center gap-1.5 mt-2 bg-[#e4000b] text-[white] text-[8px]  font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          <GraduationCap size={14} />
                          Disponible en Instituto Continental
                        </div>
                      )}

                      {career.availability === 'coming_soon' && (
                        <div className="inline-flex items-center gap-1.5 mt-2 bg-black text-[white] text-[8px]  font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          <GraduationCap size={14} />
                          Próximamente
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium mt-3">
                        <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <MapPin size={12} /> Nacional
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <Briefcase size={12} /> 18 a 29 años
                        </span>
                      </div>
                    </div>

                    {/* Salary Stats */}
                    <div className="flex-shrink-0 flex flex-row md:flex-col justify-between md:justify-center w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-3 md:mt-0 md:text-right gap-4 md:gap-0">
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                          Ingreso Promedio
                        </p>
                        <p className="text-xl sm:text-2xl font-black text-[#e4000b] leading-none">
                          {formatCurrency(career.avg)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 md:mt-2">
                          Rango Salarial
                        </p>
                        <p className="text-xs font-bold text-gray-800">
                          {formatCurrency(career.min)} - {formatCurrency(career.max)}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0 w-full md:w-auto mt-3 md:mt-0">
                      {career.availability === 'not_available' || !career.href ? (
                        <button
                          disabled
                          className="w-full md:w-auto px-5 py-3 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 rounded-xl bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          Ver detalle <ChevronRight size={14} />
                        </button>
                      ) : (
                        <a
                          href={career.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block w-full md:w-auto`}
                        >
                          <button className={`w-full md:w-auto px-5 py-3 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-1.5 rounded-xl ${
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
              <div className="text-center py-24 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
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
