"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Clock, Coins, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clientSchema, type ClientFormValues } from "@/lib/validations";
import { useCreateClient, useUpdateClient } from "@/features/clients";
import { SUPPORTED_CURRENCIES } from "@/lib/money";

export interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: Client | null;
}

const defaultValues: ClientFormValues = {
  name: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    postCode: "",
    country: "United Kingdom",
  },
  currency: "GBP",
  defaultPaymentTerms: 14,
  notes: "",
};

export function ClientFormModal({
  isOpen,
  onClose,
  clientToEdit,
}: ClientFormModalProps) {
  const isEditing = Boolean(clientToEdit);
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  useEffect(() => {
    if (clientToEdit) {
      reset({
        name: clientToEdit.name,
        email: clientToEdit.email,
        phone: clientToEdit.phone || "",
        address: {
          street: clientToEdit.address.street,
          city: clientToEdit.address.city,
          postCode: clientToEdit.address.postCode,
          country: clientToEdit.address.country,
        },
        currency: clientToEdit.currency || "GBP",
        defaultPaymentTerms: clientToEdit.defaultPaymentTerms || 14,
        notes: clientToEdit.notes || "",
      });
    } else {
      reset(defaultValues);
    }
  }, [clientToEdit, reset, isOpen]);

  const onSubmit = async (values: ClientFormValues) => {
    try {
      if (isEditing && clientToEdit) {
        await updateMutation.mutateAsync({
          clientId: clientToEdit.id,
          data: values,
        });
        toast.success(`Client "${values.name}" updated successfully.`);
      } else {
        await createMutation.mutateAsync(values);
        toast.success(`Client "${values.name}" created successfully.`);
      }
      onClose();
    } catch {
      toast.error(
        isEditing ? "Failed to update client." : "Failed to create client."
      );
    }
  };

  const isSaving =
    isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[92vh] overflow-y-auto bg-surface border-border p-6 sm:p-7 rounded-2xl shadow-2xl">
        <DialogHeader className="p-0 text-left mb-5">
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
            {isEditing ? "Edit Client Profile" : "Register New Client"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-text-secondary mt-1">
            {isEditing
              ? "Update client contact information, default payment terms, and billing address."
              : "Add a new client to your directory for seamless invoicing and contact management."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          {/* Client Name */}
          <div>
            <label
              htmlFor="client-name"
              className="block text-xs font-bold text-text-primary mb-1.5"
            >
              Client Name <span className="text-red">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="client-name"
                {...register("name")}
                placeholder="e.g. Jensen Huang or Acme Corp"
                className="pl-10 h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
              />
            </div>
            {errors.name && (
              <p className="text-[11px] font-semibold text-red mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="client-email"
                className="block text-xs font-bold text-text-primary mb-1.5"
              >
                Billing Email <span className="text-red">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="client-email"
                  type="email"
                  {...register("email")}
                  placeholder="billing@company.com"
                  className="pl-10 h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] font-semibold text-red mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="client-phone"
                className="block text-xs font-bold text-text-primary mb-1.5"
              >
                Phone Number{" "}
                <span className="text-text-muted font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="client-phone"
                  {...register("phone")}
                  placeholder="+44 20 7946 0912"
                  className="pl-10 h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] font-semibold text-red mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-text-secondary block">
              Billing Address
            </span>

            <div>
              <label
                htmlFor="client-street"
                className="block text-xs font-bold text-text-primary mb-1.5"
              >
                Street Address <span className="text-red">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  id="client-street"
                  {...register("address.street")}
                  placeholder="e.g. 106 Kendell Street"
                  className="pl-10 h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
              </div>
              {errors.address?.street && (
                <p className="text-[11px] font-semibold text-red mt-1">
                  {errors.address.street.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="client-city"
                  className="block text-xs font-bold text-text-primary mb-1.5"
                >
                  City <span className="text-red">*</span>
                </label>
                <Input
                  id="client-city"
                  {...register("address.city")}
                  placeholder="e.g. London"
                  className="h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
                {errors.address?.city && (
                  <p className="text-[11px] font-semibold text-red mt-1">
                    {errors.address.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="client-postcode"
                  className="block text-xs font-bold text-text-primary mb-1.5"
                >
                  Postal Code <span className="text-red">*</span>
                </label>
                <Input
                  id="client-postcode"
                  {...register("address.postCode")}
                  placeholder="e.g. E1 3EZ"
                  className="h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
                {errors.address?.postCode && (
                  <p className="text-[11px] font-semibold text-red mt-1">
                    {errors.address.postCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="client-country"
                  className="block text-xs font-bold text-text-primary mb-1.5"
                >
                  Country <span className="text-red">*</span>
                </label>
                <Input
                  id="client-country"
                  {...register("address.country")}
                  placeholder="e.g. United Kingdom"
                  className="h-11 bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple"
                />
                {errors.address?.country && (
                  <p className="text-[11px] font-semibold text-red mt-1">
                    {errors.address.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Billing Terms & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label
                htmlFor="client-currency"
                className="block text-xs font-bold text-text-primary mb-1.5"
              >
                Invoicing Currency
              </label>
              <div className="relative">
                <Coins className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="client-currency"
                  {...register("currency")}
                  className="w-full pl-10 pr-4 h-11 bg-surface-alt border border-border/60 rounded-xl text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-purple cursor-pointer"
                >
                  {Object.values(SUPPORTED_CURRENCIES).map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} ({curr.symbol}) — {curr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="client-terms"
                className="block text-xs font-bold text-text-primary mb-1.5"
              >
                Default Payment Terms
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="client-terms"
                  {...register("defaultPaymentTerms", { valueAsNumber: true })}
                  className="w-full pl-10 pr-4 h-11 bg-surface-alt border border-border/60 rounded-xl text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-purple cursor-pointer"
                >
                  <option value={1}>Net 1 Day (Due next day)</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={14}>Net 14 Days (Standard)</option>
                  <option value={30}>Net 30 Days (Monthly)</option>
                  <option value={60}>Net 60 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="pt-1">
            <label
              htmlFor="client-notes"
              className="block text-xs font-bold text-text-primary mb-1.5"
            >
              Client Notes{" "}
              <span className="text-text-muted font-normal">
                (Internal only)
              </span>
            </label>
            <Textarea
              id="client-notes"
              {...register("notes")}
              placeholder="e.g. Preferred contact method, special billing requirements, contract details..."
              rows={3}
              className="bg-surface-alt border-border/60 rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-purple resize-none"
            />
          </div>

          <DialogFooter className="p-0 pt-4 border-t border-border/40 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-full border-border/80 text-text-secondary hover:text-text-primary text-xs font-bold px-5 h-11"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
              className="bg-purple hover:bg-purple-light text-white text-xs font-bold rounded-full px-6 h-11 transition-all shadow-md shadow-purple/20 flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isEditing ? "Save Changes" : "Register Client"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientFormModal;
