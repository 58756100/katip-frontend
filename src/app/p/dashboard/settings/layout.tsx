import SettingsTopNav from "@/components/provider/settings/SettingsTopNav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Top Navigation */}
        <SettingsTopNav />

        {/* Page Content */}
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
