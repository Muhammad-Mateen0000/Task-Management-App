import { ImagePlus } from "lucide-react";
import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const StartScreen = ({ onStart }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    onStart({
      name: name.trim(),
      avatar,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 px-4 py-8 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1400px] items-center justify-center">
        <section className="w-full max-w-xl rounded-3xl border border-blue-100 bg-white/95 p-7 shadow-2xl shadow-blue-500/10 backdrop-blur sm:p-9 dark:border-blue-500/10 dark:bg-gray-800/95">
          <div className="text-center">
            {/* Company Logo */}
            <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl shadow-blue-500/20 ring-8 ring-blue-500/10 dark:border-gray-700 dark:bg-gray-700">
              <img
                src="/it-beam-logo.jpg"
                alt="IT Beam Solutions"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Company Name */}
            <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.22em] text-[var(--primary)]">
              IT Beam Solutions
            </p>

            {/* Heading */}
            <h1 className="mt-2 font-[Space_Grotesk] text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Task Management
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Organize projects, manage tasks, and keep your team moving
              forward.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 w-full max-w-lg space-y-5"
          >
            <Input
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />

            {/* Avatar Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Avatar
              </label>

              <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-blue-500/20 dark:bg-blue-500/5 dark:hover:border-blue-500 dark:hover:bg-blue-500/10">
                {/* Avatar Preview */}
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-blue-100 text-[var(--primary)] dark:bg-blue-500/10">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlus size={22} />
                  )}
                </div>

                {/* Upload Text */}
                <div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {avatar ? "Change avatar" : "Upload avatar"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG or JPEG
                  </p>
                </div>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleAvatar}
                  className="hidden"
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/10 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full">
              Get Started
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default StartScreen;
