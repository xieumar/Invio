"use client";

import React from "react";
import { Building2, Mail, Phone, Hash, Globe2, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SUPPORTED_CURRENCIES } from "@/lib/money";
import type { OnboardingFormValues } from "./types";

interface StepBusinessInfoProps {
  values: OnboardingFormValues;
  onChange: (updates: Partial<OnboardingFormValues>) => void;
  errors: Record<string, string>;
}

export function StepBusinessInfo({
  values,
  onChange,
  errors,
}: StepBusinessInfoProps) {
  const handleAddressChange = (
    field: keyof OnboardingFormValues["address"],
    value: string
  ) => {
    onChange({
      address: {
        ...values.address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-text-primary tracking-tight">
          Business Profile
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Enter your company details. These will appear on invoices sent to your
          clients.
        </p>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label
            htmlFor="biz-name"
            className="block text-xs font-semibold text-text-primary mb-1.5"
          >
            Company / Trading Name <span className="text-red">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              id="biz-name"
              type="text"
              placeholder="e.g. Acme Studio Ltd"
              value={values.businessName}
              onChange={(e) => onChange({ businessName: e.target.value })}
              className={`h-11 pl-10 rounded-xl ${errors.businessName ? "border-red focus-visible:ring-red/30" : ""}`}
            />
          </div>
          {errors.businessName && (
            <p className="text-xs text-red mt-1 font-medium">
              {errors.businessName}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="biz-email"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Billing Email <span className="text-red">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                id="biz-email"
                type="email"
                placeholder="billing@acme.com"
                value={values.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className={`h-11 pl-10 rounded-xl ${errors.email ? "border-red focus-visible:ring-red/30" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red mt-1 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="biz-phone"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Phone Number{" "}
              <span className="text-text-muted font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                id="biz-phone"
                type="tel"
                placeholder="+44 20 7946 0991"
                value={values.phone || ""}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="h-11 pl-10 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Tax ID & Currency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="biz-taxid"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Tax ID / VAT Number{" "}
              <span className="text-text-muted font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                id="biz-taxid"
                type="text"
                placeholder="GB 123 4567 89"
                value={values.taxId || ""}
                onChange={(e) => onChange({ taxId: e.target.value })}
                className="h-11 pl-10 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="biz-currency"
              className="block text-xs font-semibold text-text-primary mb-1.5"
            >
              Default Currency <span className="text-red">*</span>
            </label>
            <div className="relative">
              <Globe2 className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="biz-currency"
                value={values.defaultCurrency}
                onChange={(e) => onChange({ defaultCurrency: e.target.value })}
                className="h-11 w-full pl-10 pr-4 rounded-xl border border-input bg-transparent text-sm text-text-primary outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 transition-colors"
              >
                {Object.entries(SUPPORTED_CURRENCIES).map(([code, config]) => (
                  <option
                    key={code}
                    value={code}
                    className="bg-surface text-text-primary"
                  >
                    {config.code} ({config.symbol}) — {config.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="pt-2 border-t border-border/60">
          <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-purple" />
            <span>Business Address</span>
          </div>

          <div className="space-y-3">
            <div>
              <Input
                placeholder="Street Address (e.g. 19 Union Terrace)"
                value={values.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className={`h-11 rounded-xl ${errors["address.street"] ? "border-red" : ""}`}
              />
              {errors["address.street"] && (
                <p className="text-xs text-red mt-1 font-medium">
                  {errors["address.street"]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Input
                  placeholder="City (e.g. London)"
                  value={values.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  className={`h-11 rounded-xl ${errors["address.city"] ? "border-red" : ""}`}
                />
                {errors["address.city"] && (
                  <p className="text-xs text-red mt-1 font-medium">
                    {errors["address.city"]}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Postal Code (e.g. E1 3EZ)"
                  value={values.address.postCode}
                  onChange={(e) =>
                    handleAddressChange("postCode", e.target.value)
                  }
                  className={`h-11 rounded-xl ${errors["address.postCode"] ? "border-red" : ""}`}
                />
                {errors["address.postCode"] && (
                  <p className="text-xs text-red mt-1 font-medium">
                    {errors["address.postCode"]}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Country (e.g. United Kingdom)"
                  value={values.address.country}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  className={`h-11 rounded-xl ${errors["address.country"] ? "border-red" : ""}`}
                />
                {errors["address.country"] && (
                  <p className="text-xs text-red mt-1 font-medium">
                    {errors["address.country"]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
