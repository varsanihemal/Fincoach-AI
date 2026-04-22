"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronUp,
  ChevronDown,
  Clock,
  RefreshCw,
  Trash2,
  CheckSquare,
} from "lucide-react";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { bulkDeleteTransactions } from "@/actions/accounts";

const CATEGORY_COLORS = {
  FOOD: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  TRANSPORT: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  ENTERTAINMENT: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  SHOPPING: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  UTILITIES: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  HEALTH: "bg-teal-500/15 text-teal-400 border-teal-500/20",
  SALARY: "bg-green-500/15 text-green-400 border-green-500/20",
  INCOME: "bg-teal-500/15 text-teal-400 border-teal-500/20",
  OTHER: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

const TransactionTable = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    fn: deleteFn,
    loading: deleteLoading,
    data: deleteResult,
  } = useFetch(bulkDeleteTransactions);

  // Handle success
  useState(() => {
    if (deleteResult?.success) {
      toast.success("Transactions deleted successfully!");
      setSelectedIds([]);
    }
  }, [deleteResult]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filtered = transactions
    .filter((tx) => {
      const matchesSearch =
        tx.description?.toLowerCase().includes(search.toLowerCase()) ||
        tx.category?.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "date") { aVal = new Date(aVal); bVal = new Date(bVal); }
      if (sortField === "amount") { aVal = Number(aVal); bVal = Number(bVal); }
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const allSelected = filtered.length > 0 && filtered.every((tx) => selectedIds.includes(tx.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((tx) => tx.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(
      `Delete ${selectedIds.length} transaction${selectedIds.length > 1 ? "s" : ""}? This cannot be undone.`
    );
    if (!confirmed) return;
    await deleteFn(selectedIds);
    setSelectedIds([]);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={12} className="text-slate-700" />;
    return sortOrder === "asc"
      ? <ChevronUp size={12} className="text-blue-400" />
      : <ChevronDown size={12} className="text-blue-400" />;
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-5 border-b border-white/[0.06] flex-wrap">
        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold tracking-widest uppercase text-slate-600">
            Transactions ({filtered.length})
          </div>

          {/* Bulk delete button — appears when rows selected */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleDelete}
              disabled={deleteLoading}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 hover:bg-red-500/25 transition-all"
            >
              <Trash2 size={12} />
              Delete {selectedIds.length} selected
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-white/[0.04] border border-white/[0.08] text-slate-300 placeholder:text-slate-600 text-sm rounded-xl pl-8 pr-4 py-2 outline-none focus:border-blue-700/50 w-48 transition-all"
            />
          </div>

          {/* Type filter */}
          {["ALL", "INCOME", "EXPENSE"].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                typeFilter === t
                  ? "bg-blue-700/20 border-blue-700/40 text-blue-400"
                  : "bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-10 text-center text-slate-600 text-sm">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">

                {/* Select all checkbox */}
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer"
                  />
                </th>

                {[
                  { label: "Date", field: "date" },
                  { label: "Description", field: "description" },
                  { label: "Category", field: "category" },
                  { label: "Amount", field: "amount" },
                  { label: "Status", field: "status" },
                ].map(({ label, field }) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="text-left px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-slate-600 cursor-pointer hover:text-slate-400 transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      {label}
                      <SortIcon field={field} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr
                  key={tx.id}
                  onClick={() => toggleSelect(tx.id)}
                  className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    selectedIds.includes(tx.id) ? "bg-blue-700/[0.07]" : ""
                  }`}
                >
                  {/* Row checkbox */}
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(tx.id)}
                      onChange={() => toggleSelect(tx.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-3.5 h-3.5 rounded accent-blue-500 cursor-pointer"
                    />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-sm text-slate-400 whitespace-nowrap">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>

                  {/* Description */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.type === "INCOME"
                          ? "bg-teal-500/15 border border-teal-500/20"
                          : "bg-red-500/15 border border-red-500/20"
                      }`}>
                        {tx.type === "INCOME"
                          ? <ArrowUpRight size={12} className="text-teal-400" />
                          : <ArrowDownRight size={12} className="text-red-400" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-200">
                          {tx.description || "—"}
                        </div>
                        {tx.isRecurring && (
                          <div className="flex items-center gap-1 text-[10px] text-blue-400 mt-0.5">
                            <RefreshCw size={9} />
                            {tx.recurringInterval?.toLowerCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                      CATEGORY_COLORS[tx.category?.toUpperCase()] || CATEGORY_COLORS.OTHER
                    }`}>
                      {tx.category
                        ? tx.category.charAt(0).toUpperCase() + tx.category.slice(1).toLowerCase()
                        : "—"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      tx.type === "INCOME" ? "text-teal-400" : "text-red-400"
                    }`}>
                      {tx.type === "INCOME" ? "+" : "-"}$
                      {Number(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {tx.status === "PENDING" && <Clock size={11} className="text-amber-400" />}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        tx.status === "COMPLETED"
                          ? "bg-teal-500/10 border-teal-500/20 text-teal-400"
                          : tx.status === "PENDING"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;