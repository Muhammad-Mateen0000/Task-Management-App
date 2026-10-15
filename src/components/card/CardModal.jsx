import { CalendarDays, Check, Trash2, Users } from "lucide-react";
import { useState } from "react";
import Modal from "../common/Modal";
import Label from "./Label";

const AVAILABLE_LABELS = [
  { name: "Design", color: "#8b5cf6" },
  { name: "Development", color: "#3b82f6" },
  { name: "Bug", color: "#ef4444" },
  { name: "Important", color: "#f59e0b" },
  { name: "Research", color: "#10b981" },
];

const AVAILABLE_MEMBERS = ["Ali", "Ahmed", "Sara", "Hassan", "Ayesha"];

const CardModal = ({ card, isOpen, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [labels, setLabels] = useState(card?.labels || []);
  const [dueDate, setDueDate] = useState(card?.dueDate || "");
  const [members, setMembers] = useState(card?.members || []);
  const [error, setError] = useState("");

  if (!card) {
    return null;
  }

  const toggleLabel = (label) => {
    const exists = labels.some((item) => item.name === label.name);

    if (exists) {
      setLabels((current) =>
        current.filter((item) => item.name !== label.name),
      );
    } else {
      setLabels((current) => [...current, label]);
    }
  };

  const toggleMember = (member) => {
    const exists = members.includes(member);

    if (exists) {
      setMembers((current) => current.filter((item) => item !== member));
    } else {
      setMembers((current) => [...current, member]);
    }
  };

  const handleSave = () => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Card title is required.");
      return;
    }

    if (cleanTitle.length > 100) {
      setError("Card title must not exceed 100 characters.");
      return;
    }

    if (description.trim().length > 500) {
      setError("Description must not exceed 500 characters.");
      return;
    }

    setError("");

    onSave({
      ...card,
      title: cleanTitle,
      description: description.trim(),
      labels,
      dueDate,
      members,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Card" size="lg">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
            Card Title
          </label>

          <input
            type="text"
            value={title}
            maxLength={100}
            onChange={(event) => {
              setTitle(event.target.value);
              setError("");
            }}
            placeholder="Enter card title"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e293b] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
            Description
          </label>

          <textarea
            value={description}
            maxLength={500}
            onChange={(event) => {
              setDescription(event.target.value);
              setError("");
            }}
            placeholder="Add a description..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-[#1e293b] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold text-slate-700 dark:text-slate-200">
            Labels
          </label>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_LABELS.map((label) => {
              const selected = labels.some((item) => item.name === label.name);

              return (
                <button
                  key={label.name}
                  type="button"
                  onClick={() => toggleLabel(label)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
                    selected
                      ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#242b35]"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Label label={label} />

                  {selected && <Check size={14} className="text-blue-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <CalendarDays size={16} />
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-[#1e293b] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Users size={16} />
            Assigned Members
          </label>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AVAILABLE_MEMBERS.map((member) => {
              const selected = members.includes(member);

              return (
                <button
                  key={member}
                  type="button"
                  onClick={() => toggleMember(member)}
                  className={`flex items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                    selected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-200 bg-white hover:border-blue-500/40 dark:border-white/10 dark:bg-[#1e293b]"
                  }`}
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                    {member.charAt(0)}
                  </div>

                  <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {member}
                  </span>

                  {selected && (
                    <Check size={14} className="ml-auto text-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <button
            type="button"
            onClick={() => onDelete(card)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <Trash2 size={17} />
            Delete Card
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl bg-slate-100 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-200 dark:bg-[#302b39] dark:text-slate-300 dark:hover:bg-[#3a3445]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!title.trim()}
              className="h-11 rounded-xl bg-[var(--primary)] px-5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
