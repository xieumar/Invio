"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { InvoiceDatePicker } from "@/components/InvoiceDatePicker";
import { InvoicePaymentTerms } from "@/components/InvoicePaymentTerms";

import { Invoice, InvoiceFormData, InvoiceStatus } from "@/lib/types";
import { invoiceSchema, InvoiceFormValues } from "@/lib/validations";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave: (data: InvoiceFormData, status: InvoiceStatus) => void;
  onDiscard: () => void;
}

const emptyAddress = { street: "", city: "", postCode: "", country: "" };

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label
          className={`text-[13px] font-medium ${
            error ? "text-red" : "text-text-secondary"
          }`}
        >
          {label}
        </label>
        {error && (
          <span className="text-[10px] text-red italic" role="alert">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Input({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={`w-full rounded px-5 py-4 text-[15px] font-bold text-text-primary outline-none transition-colors border
        bg-(--input-bg) border-(--input-border)
        hover:border-purple focus:border-purple h-14
        ${error ? "border-red!" : ""}
      `}
      {...props}
    />
  );
}

function AddressFields({ type }: { type: "senderAddress" | "clientAddress" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvoiceFormValues>();
  const addressErrors = errors[type];

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Field label="Street Address" error={addressErrors?.street?.message}>
        <Input
          {...register(`${type}.street` as const)}
          error={!!addressErrors?.street}
        />
      </Field>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <Field label="City" error={addressErrors?.city?.message}>
          <Input
            {...register(`${type}.city` as const)}
            error={!!addressErrors?.city}
          />
        </Field>
        <Field label="Post Code" error={addressErrors?.postCode?.message}>
          <Input
            {...register(`${type}.postCode` as const)}
            error={!!addressErrors?.postCode}
          />
        </Field>
        <Field
          label="Country"
          error={addressErrors?.country?.message}
          className="col-span-2 sm:col-span-1"
        >
          <Input
            {...register(`${type}.country` as const)}
            error={!!addressErrors?.country}
          />
        </Field>
      </div>
    </div>
  );
}

function ItemList() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<InvoiceFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const watchedItems = useFormContext().watch("items");

  return (
    <>
      <p className="text-[18px] font-bold text-[#777F98] mb-4 mt-10">
        Item List
      </p>

      {/* Desktop Headers */}
      <div className="hidden sm:grid grid-cols-[1fr_60px_100px_72px_18px] gap-4 mb-2">
        {["Item Name", "Qty.", "Price", "Total", ""].map((h) => (
          <span key={h} className="text-[13px] text-text-secondary">
            {h}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-12 sm:gap-3">
        {fields.map((field, i) => {
          const watched = watchedItems?.[i];
          const qty = Number(watched?.quantity) || 0;
          const price = Number(watched?.price) || 0;
          const total = (qty * price).toFixed(2);

          return (
            <div
              key={field.id}
              className="flex flex-col gap-6 sm:grid sm:grid-cols-[1fr_60px_100px_72px_18px] sm:items-center sm:gap-4"
            >
              <div className="flex flex-col gap-3 sm:block">
                <label className="text-[13px] text-text-secondary sm:hidden">
                  Item Name
                </label>
                <Input
                  placeholder="Item name"
                  {...register(`items.${i}.name` as const)}
                  error={!!errors.items?.[i]?.name}
                />
              </div>

              <div className="flex items-center gap-4 sm:contents">
                <div className="flex flex-col gap-3 sm:block w-16 shrink-0 sm:w-auto">
                  <label className="text-[13px] text-text-secondary sm:hidden">
                    Qty.
                  </label>
                  <Input
                    inputMode="numeric"
                    {...register(`items.${i}.quantity` as const, {
                      setValueAs: (v) => (v === "" ? 0 : Number(v)),
                    })}
                    error={!!errors.items?.[i]?.quantity}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:block flex-1 sm:w-auto">
                  <label className="text-[13px] text-text-secondary sm:hidden">
                    Price
                  </label>
                  <Input
                    inputMode="decimal"
                    {...register(`items.${i}.price` as const, {
                      setValueAs: (v) => (v === "" ? 0 : parseFloat(v) || 0),
                    })}
                    error={!!errors.items?.[i]?.price}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:block flex-1 sm:w-auto">
                  <label className="text-[13px] text-text-secondary sm:hidden">
                    Total
                  </label>
                  <div className="h-14 flex items-center">
                    <span className="text-[15px] font-bold text-text-secondary tabular-nums">
                      {total}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:block shrink-0 sm:w-auto">
                  <label
                    className="text-[13px] opacity-0 sm:hidden"
                    aria-hidden="true"
                  >
                    Del
                  </label>
                  <div className="h-14 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="text-[#888EB0] hover:text-red transition-colors flex items-center justify-center"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          append({ id: nanoid(), name: "", quantity: 1, price: 0, total: 0 })
        }
        className="w-full mt-8 sm:mt-10 h-14 rounded-3xl text-[15px] font-bold text-text-secondary bg-(--draft-bg) hover:bg-border transition-colors"
      >
        + Add New Item
      </button>
    </>
  );
}

export default function InvoiceForm({
  invoice,
  onSave,
  onDiscard,
}: InvoiceFormProps) {
  const isEdit = !!invoice;
  const panelRef = useRef<HTMLDivElement>(null);

  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: invoice || {
      description: "",
      paymentTerms: 30,
      clientName: "",
      clientEmail: "",
      createdAt: new Date().toISOString().split("T")[0],
      senderAddress: emptyAddress,
      clientAddress: emptyAddress,
      items: [{ id: nanoid(), name: "", quantity: 1, price: 0, total: 0 }],
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onDiscard();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDiscard]);

  const handleSaveDraft = () => {
    const values = getValues();
    const formattedData: InvoiceFormData = {
      ...values,
      items: values.items.map((item) => ({
        ...item,
        total: (item.quantity || 0) * (item.price || 0),
      })),
    };
    onSave(formattedData, "draft");
  };

  function submit(data: InvoiceFormValues, status: InvoiceStatus) {
    const formattedData: InvoiceFormData = {
      ...data,
      items: data.items.map((item) => ({
        ...item,
        total: item.quantity * item.price,
      })),
    };
    onSave(formattedData, status);
  }

  const inputBase =
    "w-full rounded px-5 py-4 text-[15px] font-bold text-[var(--text-primary)] outline-none transition-colors border bg-[var(--input-bg)] border-[var(--input-border)] hover:border-purple focus:border-purple h-[56px]";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-150 lg:left-25.75"
        onClick={onDiscard}
      />

      <div
        ref={panelRef}
        className="
          fixed bottom-0 z-151 flex flex-col w-full md:w-160 bg-bg transition-all
          top-18 md:top-20 lg:top-0 
          left-0 lg:left-25.75 
          lg:rounded-r-[20px] shadow-2xl
        "
      >
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-8 md:px-14 md:pt-14">
          <h2 className="text-2xl font-bold text-text-primary mb-12">
            {isEdit ? (
              <>
                {" "}
                <span className="text-text-secondary">#</span>
                {invoice?.id}{" "}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          <FormProvider {...methods}>
            <form noValidate>
              <p className="text-[15px] font-bold text-purple mb-6">
                Bill From
              </p>
              <AddressFields type="senderAddress" />

              <p className="text-[15px] font-bold text-purple mb-6 mt-12">
                Bill To
              </p>
              <div className="flex flex-col gap-6 mb-6">
                <Field label="Client's Name" error={errors.clientName?.message}>
                  <Input
                    {...register("clientName")}
                    error={!!errors.clientName}
                  />
                </Field>
                <Field
                  label="Client's Email"
                  error={errors.clientEmail?.message}
                >
                  <Input
                    type="email"
                    placeholder="e.g. email@example.com"
                    {...register("clientEmail")}
                    error={!!errors.clientEmail}
                  />
                </Field>
              </div>

              <AddressFields type="clientAddress" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 mt-12">
                <Field label="Issue Date">
                  <Controller
                    control={control}
                    name="createdAt"
                    render={({ field }) => (
                      <InvoiceDatePicker
                        value={field.value ?? ""}
                        onChange={(val) => field.onChange(val)}
                        error={!!errors.createdAt}
                      />
                    )}
                  />
                </Field>

                <Field label="Payment Terms">
                  <Controller
                    control={control}
                    name="paymentTerms"
                    render={({ field }) => (
                      <InvoicePaymentTerms
                        value={Number(field.value)}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Field>
              </div>

              <Field
                label="Project Description"
                error={errors.description?.message}
                className="mb-10"
              >
                <Input
                  placeholder="e.g. Graphic Design Service"
                  {...register("description")}
                  error={!!errors.description}
                />
              </Field>

              <ItemList />
            </form>
          </FormProvider>
        </div>

        <div
          className={`px-4 sm:px-6 py-6 md:px-14 border-t border-border bg-surface mt-auto flex items-center ${
            isEdit ? "justify-end gap-2" : "justify-between gap-1.5 sm:gap-4"
          }`}
        >
          {!isEdit && (
            <button
              type="button"
              onClick={onDiscard}
              className="
        px-4 sm:px-6 h-12 pt-1 rounded-3xl text-[13px] sm:text-[15px] font-bold 
        bg-surface-alt text-text-muted dark:text-text-secondary 
        hover:bg-border transition-colors whitespace-nowrap
      "
            >
              Discard
            </button>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2">
            {isEdit && (
              <button
                type="button"
                onClick={onDiscard}
                className="
          px-4 sm:px-6 pt-1 h-12 rounded-3xl text-[13px] sm:text-[15px] font-bold 
          bg-surface-alt text-text-muted dark:text-text-secondary 
          hover:bg-border transition-colors whitespace-nowrap
        "
              >
                Cancel
              </button>
            )}

            {!isEdit && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="
          px-4 sm:px-6 pt-1 h-12 rounded-3xl text-[13px] sm:text-[15px] font-bold 
          text-text-secondary-light dark:text-text-secondary-dark 
          bg-sidebar-light hover:bg-text-primary-light transition-colors whitespace-nowrap
        "
              >
                Save as Draft
              </button>
            )}

            <button
              type="button"
              onClick={handleSubmit((data) =>
                submit(
                  data,
                  isEdit
                    ? invoice?.status === "draft"
                      ? "pending"
                      : invoice?.status || "pending"
                    : "pending"
                )
              )}
              className="
        px-4 pt-1 sm:px-6 h-12 rounded-3xl text-[13px] sm:text-[15px] font-bold 
        bg-purple text-white hover:bg-purple-light transition-colors whitespace-nowrap
      "
            >
              {isEdit ? "Save Changes" : "Save & Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
