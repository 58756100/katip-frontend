import ComingSoon from "@/components/shared/ComingSoon";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <ComingSoon
      featureName="Profile"
      description="Manage your personal information, update your details, and configure your account settings here."
      icon={<User />}
    />
  );
}
