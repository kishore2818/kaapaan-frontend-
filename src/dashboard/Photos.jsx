import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import {
  AlertTriangle,
  CalendarDays,
  Download,
  ImageOff,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { apiUrl, normalizeViolation } from '../lib/api';

Modal.setAppElement('#root');

const VIOLATION_FIELD_MAPPING = {
  phoneUsage: 'Phone Usage',
  stuntRiding: 'Stunt Riding',
  smoking: 'Smoking',
  fire: 'Fire',
  withoutHelmet: 'Without Helmet',
  triples: 'Tripling',
};

const VIOLATION_COLORS = {
  withoutHelmet: 'bg-rose-100 text-rose-800 border-rose-200',
  triples: 'bg-amber-100 text-amber-800 border-amber-200',
  phoneUsage: 'bg-sky-100 text-sky-800 border-sky-200',
  stuntRiding: 'bg-violet-100 text-violet-800 border-violet-200',
  smoking: 'bg-slate-100 text-slate-700 border-slate-200',
  fire: 'bg-orange-100 text-orange-800 border-orange-200',
};

const getViolationLabels = (violation) =>
  Object.entries(VIOLATION_FIELD_MAPPING)
    .filter(([key]) => violation[key])
    .map(([key, label]) => ({ type: key, label }));

const Photos = () => {
  const [violations, setViolations] = useState([]);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchViolations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl('/violations'));
      setViolations(response.data.map(normalizeViolation));
    } catch (error) {
      console.error('Error fetching violations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  const filteredViolations = useMemo(() => {
    let result = [...violations];

    if (filterType !== 'all') {
      result = result.filter((violation) => violation[filterType]);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((violation) => {
        const violationLabels = getViolationLabels(violation)
          .map((item) => item.label.toLowerCase())
          .join(' ');

        return (
          violationLabels.includes(query) ||
          new Date(violation.analyzedAt).toLocaleString().toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [filterType, searchQuery, violations]);

  const getViolationCount = (type) =>
    type === 'all' ? violations.length : violations.filter((violation) => violation[type]).length;

  const filters = [
    { type: 'all', label: 'All Records' },
    { type: 'withoutHelmet', label: 'Without Helmet' },
    { type: 'triples', label: 'Tripling' },
    { type: 'phoneUsage', label: 'Phone Usage' },
    { type: 'stuntRiding', label: 'Stunt Riding' },
    { type: 'smoking', label: 'Smoking' },
    { type: 'fire', label: 'Fire' },
  ];

  const handleDelete = async (violationId) => {
    if (!violationId || deletingId) {
      return;
    }

    try {
      setDeletingId(violationId);
      await axios.delete(apiUrl(`/violations/${violationId}`));

      setViolations((current) => current.filter((item) => item._id !== violationId));
      setSelectedViolation((current) => (current?._id === violationId ? null : current));
    } catch (error) {
      console.error('Error deleting violation:', error);
      window.alert('Unable to delete the selected violation record. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const downloadPDF = async () => {
    if (!selectedViolation) {
      return;
    }

    const input = document.getElementById('violation-details');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`violation_${selectedViolation._id}.pdf`);
  };

  return (
    <div className="min-h-screen">
      <DashboardLayout>
        <div className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="gov-panel overflow-hidden rounded-[2rem]">
              <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.6fr_0.9fr] md:px-8">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-800">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Violation Gallery
                  </div>
                  <h1 className="gov-title text-3xl font-extrabold md:text-4xl">
                    Traffic evidence review and case image management
                  </h1>
                  <p className="gov-subtitle mt-3 max-w-2xl text-sm leading-7 md:text-base">
                    Review captured evidence, inspect detected categories, and remove invalid records
                    through the official review workflow.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Total Records
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{violations.length}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Visible After Filters
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">{filteredViolations.length}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="gov-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="gov-title text-xl font-bold">Evidence Controls</h2>
                  <p className="gov-subtitle mt-1 text-sm">
                    Search records and narrow the gallery by detected violation category.
                  </p>
                </div>

                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search by date or violation type"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {filters.map(({ type, label }) => {
                  const active = filterType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFilterType(type)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {label} ({getViolationCount(type)})
                    </button>
                  );
                })}
              </div>
            </section>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900" />
              </div>
            ) : filteredViolations.length === 0 ? (
              <section className="gov-panel rounded-[2rem] px-6 py-16 text-center">
                <div className="mx-auto flex max-w-md flex-col items-center">
                  <ImageOff className="h-14 w-14 text-slate-400" />
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">No matching records found</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Adjust the search term or switch the current filter to review a wider set of evidence.
                  </p>
                </div>
              </section>
            ) : (
              <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence>
                  {filteredViolations.map((violation) => (
                    <motion.article
                      key={violation._id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ y: -4 }}
                      className="gov-panel group cursor-pointer overflow-hidden rounded-[1.6rem]"
                      onClick={() => setSelectedViolation(violation)}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={violation.imageUrl}
                          alt="Violation evidence"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                        <button
                          type="button"
                          onClick={async (event) => {
                            event.stopPropagation();
                            if (window.confirm('Delete this violation record from the evidence gallery?')) {
                              await handleDelete(violation._id);
                            }
                          }}
                          disabled={deletingId === violation._id}
                          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/30 bg-white/90 text-rose-600 opacity-0 shadow-lg transition hover:bg-white group-hover:opacity-100 disabled:opacity-100"
                        >
                          {deletingId === violation._id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-300 border-t-rose-700" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                          {getViolationLabels(violation).map(({ type, label }) => (
                            <span
                              key={type}
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${VIOLATION_COLORS[type]}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Evidence Timestamp
                            </p>
                            <p className="mt-2 text-sm font-medium text-slate-900">
                              {new Date(violation.analyzedAt).toLocaleString()}
                            </p>
                          </div>
                          <AlertTriangle className="mt-1 h-5 w-5 text-[#b5892d]" />
                        </div>

                        {violation.plateImageUrl && (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Plate Snapshot
                            </p>
                            <img
                              src={violation.plateImageUrl}
                              alt="Detected plate"
                              className="h-14 w-28 rounded-xl border border-slate-200 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </section>
            )}
          </div>
        </div>
      </DashboardLayout>

      <Modal
        isOpen={Boolean(selectedViolation)}
        onRequestClose={() => setSelectedViolation(null)}
        style={{
          overlay: {
            backgroundColor: 'rgba(9, 20, 35, 0.62)',
            backdropFilter: 'blur(10px)',
            zIndex: 60,
            display: 'grid',
            placeItems: 'center',
            padding: '24px',
          },
          content: {
            inset: 'auto',
            width: 'min(1080px, 100%)',
            maxHeight: '88vh',
            overflow: 'hidden',
            padding: 0,
            border: 'none',
            borderRadius: '28px',
            boxShadow: '0 30px 80px rgba(9, 20, 35, 0.24)',
          },
        }}
      >
        {selectedViolation && (
          <div id="violation-details" className="grid h-full bg-white lg:grid-cols-[1.5fr_0.95fr]">
            <div className="flex items-center justify-center bg-slate-100 p-6">
              <div className="relative max-h-[72vh] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-3 shadow-xl">
                <img
                  src={selectedViolation.imageUrl}
                  alt="Violation evidence"
                  className="max-h-[64vh] rounded-[1.2rem] object-contain"
                />
                {selectedViolation.plateImageUrl && (
                  <div className="absolute bottom-6 right-6 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg">
                    <img
                      src={selectedViolation.plateImageUrl}
                      alt="Detected plate"
                      className="h-14 rounded-xl object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Case Detail
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">Violation Record Summary</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedViolation(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <CalendarDays className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-medium">
                      {new Date(selectedViolation.analyzedAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {getViolationLabels(selectedViolation).map(({ type, label }) => (
                    <div
                      key={type}
                      className={`rounded-3xl border p-4 text-sm font-semibold ${VIOLATION_COLORS[type]}`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto grid gap-3 pt-8">
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  Download PDF Summary
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (window.confirm('Delete this violation record from the evidence gallery?')) {
                      await handleDelete(selectedViolation._id);
                    }
                  }}
                  disabled={deletingId === selectedViolation._id}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  {deletingId === selectedViolation._id ? 'Deleting...' : 'Delete Record'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Photos;
