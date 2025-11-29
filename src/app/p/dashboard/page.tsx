"use client";

import React, { useEffect, useState } from "react";
import WalletCard from "@/components/provider/wallet/WalletCardComponent";
import QRCodeCard from "@/components/provider/QRcodeComponent";
import TippingHistory from "@/components/provider/TippingHistoryComponent";

import { getUserDetails } from "@/utils/authUtils"; // ← your utils file

const Page = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUserDetails();

        console.log("🟢 User Details Loaded:", res);

        // provider username lives inside: user.providerProfile.username
        const extractedUsername =
          res?.user?.providerProfile?.username || null;

        setUsername(extractedUsername);

      } catch (err) {
        console.error("❌ Failed to load user details:", err);
      }
    }

    loadUser();
  }, []);

  return (
    <div>
      <div>
        <WalletCard />
      </div>

      <div>
       

        <QRCodeCard username={username ?? ""} />
      </div>

      <div>
        <TippingHistory />
      </div>
    </div>
  );
};

export default Page;
