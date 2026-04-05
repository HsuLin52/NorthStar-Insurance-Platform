"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/guards/ProtectedRoute";
import PageShell from "@/components/layout/PageShell";
import SectionHeader from "@/components/layout/SectionHeader";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import StatCard from "@/components/dashboard/StatCard";
import { apiRequest, ApiRequestError } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { DashboardSummary } from "@/types/dashboard";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const response = await apiRequest<DashboardSummary>("/dashboard/summary");

        if (isMounted) {
          setSummary(response.data);
        }
      } catch (error) {
        if (error instanceof ApiRequestError && error.status === 401) {
          router.replace("/login");
          return;
        }

        console.error("Failed to load dashboard summary:", error);
      }
    }

    void load();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionHeader
          title="Dashboard"
          subtitle="Unified secure workspace for customers, internal staff, and administrators."
        />

        <DashboardGrid>
          <StatCard title="Policies" value={summary?.policies ?? 0} subtitle="Protected insurance records" />
          <StatCard title="Claims" value={summary?.claims ?? 0} subtitle="Claims lifecycle" />
          <StatCard title="Amendments" value={summary?.amendments ?? 0} subtitle="Change requests" />
          <StatCard title="Reductions" value={summary?.reductions ?? 0} subtitle="Coverage adjustment requests" />
        </DashboardGrid>
      </PageShell>
    </ProtectedRoute>
  );
}