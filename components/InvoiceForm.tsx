"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { nanoid } from "nanoid";

import { Invoice, InvoiceFormData, InvoiceStatus } from "@/lib/types";
import { invoiceSchema, InvoiceFormValues } from "@/lib/validations";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave: (data: InvoiceFormData, status: InvoiceStatus) => void;
  onDiscard: () => void;
}

const emptyAddress = { street: "", city: "", postCode: "", country: "" };

// --- Reusable UI Wrappers ---

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
      <label
        className={`text-[13px] font-medium ${error ? "text-red" : "text-[var(--text-secondary)]"}`}
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-[10px] text-red italic" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function Input({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={`w-full rounded px-5 py-4 text-[15px] font-bold text-[var(--text-primary)] outline-none transition-colors border
        bg-[var(--input-bg)] border-[var(--input-border)]
        hover:border-purple focus:border-purple h-[56px]
        ${error ? "!border-red" : ""}
      `}
      {...props}
    />
  );
}

// --- Form Sub-Components (Cleanly extracted using useFormContext) ---

function AddressFields({ type }: { type: "senderAddress" | "clientAddress" }) {
  // Pulls context directly from FormProvider, no prop drilling needed
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
    watch,
  } = useFormContext<InvoiceFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  return (
    <>
      <p className="text-[18px] font-bold text-[#777F98] mb-4 mt-10">
        Item List
      </p>
      <div className="hidden sm:grid grid-cols-[1fr_64px_100px_40px] gap-4 mb-2">
        {["Item Name", "Qty.", "Price", ""].map((h) => (
          <span key={h} className="text-[13px] text-[var(--text-secondary)]">
            {h}
          </span>
        ))}
      </div>

      {fields.map((field, i) => (
        <div
          key={field.id}
          className="grid grid-cols-[1fr_64px_100px_40px] gap-4 items-start mb-4 sm:mb-3"
        >
          <div>
            <label className="sr-only">Item name</label>
            <Input
              placeholder="Item name"
              {...register(`items.${i}.name` as const)}
              error={!!errors.items?.[i]?.name}
            />
            {errors.items?.[i]?.name && (
              <span className="text-[10px] text-red italic" role="alert">
                {errors.items[i]?.name?.message}
              </span>
            )}
          </div>
          <div>
            <label className="sr-only">Quantity</label>
            <Input
              type="number"
              min="1"
              className="text-center"
              // valueAsNumber tells RHF to convert the HTML string back to a real number
              {...register(`items.${i}.quantity` as const, {
                valueAsNumber: true,
              })}
              error={!!errors.items?.[i]?.quantity}
            />
          </div>
          <div>
            <label className="sr-only">Price</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              {...register(`items.${i}.price` as const, {
                valueAsNumber: true,
              })}
              error={!!errors.items?.[i]?.price}
            />
          </div>
          <div className="flex items-center justify-center h-[56px]">
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label={`Remove item ${i + 1}`}
              className="text-[var(--text-secondary)] hover:text-red transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-red/10"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {errors.items && typeof errors.items.message === "string" && (
        <p className="text-[10px] text-red italic mb-2" role="alert">
          {errors.items.message}
        </p>
      )}

      <button
        type="button"
        onClick={() =>
          append({ id: nanoid(), name: "", quantity: 1, price: 0, total: 0 })
        }
        className="w-full mt-4 h-[56px] rounded-3xl text-[15px] font-bold text-[var(--text-secondary)] bg-[var(--draft-bg)] hover:bg-[var(--border)] transition-colors"
      >
        + Add New Item
      </button>
    </>
  );
}

// --- Main Form Component ---

export default function InvoiceForm({
  invoice,
  onSave,
  onDiscard,
}: InvoiceFormProps) {
  const isEdit = !!invoice;
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize the form methods
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
    formState: { errors },
  } = methods;

  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>("input, select");
    first?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onDiscard();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDiscard]);

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

  const hasErrors = Object.keys(errors).length > 0;
  const inputBase =
    "w-full rounded px-5 py-4 text-[15px] font-bold text-[var(--text-primary)] outline-none transition-colors border bg-[var(--input-bg)] border-[var(--input-border)] hover:border-purple focus:border-purple h-[56px]";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[150]"
        onClick={onDiscard}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        className="
          fixed top-[72px] md:top-0 left-0 md:left-[103px]
          bottom-0 z-[151] flex flex-col
          w-full md:w-[719px] md:max-w-[calc(100vw-103px)]
          md:rounded-r-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.25)]
        "
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-8 md:px-14 md:pt-14">
          <h2
            id="form-title"
            className="text-2xl font-bold text-[var(--text-primary)] mb-12"
          >
            {isEdit ? (
              <>
                <span className="text-[var(--text-secondary)]">#</span>
                {invoice?.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          {/* FormProvider wraps the form so AddressFields and ItemList can pull context without props */}
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
                <Field label="Invoice Date" error={errors.createdAt?.message}>
                  <Input
                    type="date"
                    {...register("createdAt")}
                    error={!!errors.createdAt}
                  />
                </Field>
                <Field label="Payment Terms">
                  <select
                    className={`${inputBase} appearance-none cursor-pointer`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' fill='none'%3E%3Cpath d='M1 1l4.228 4.228L9.456 1' stroke='%237C5DFA' stroke-width='2'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "calc(100% - 20px) center",
                    }}
                    {...register("paymentTerms", { valueAsNumber: true })}
                  >
                    <option value={1}>Net 1 Day</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                  </select>
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

              {hasErrors && (
                <div className="mt-6" role="alert" aria-live="polite">
                  <p className="text-[10px] text-red italic">
                    - All fields must be filled in
                  </p>
                  {typeof errors.items?.message === "string" && (
                    <p className="text-[10px] text-red italic">
                      - An item must be added
                    </p>
                  )}
                </div>
              )}
            </form>
          </FormProvider>
        </div>

        <div className="px-6 py-6 md:px-14 border-t border-[var(--border)] bg-[var(--bg)] mt-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="button"
            onClick={onDiscard}
            className="w-full sm:w-auto px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-[var(--draft-bg)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
          >
            {isEdit ? "Cancel" : "Discard"}
          </button>

          <div className="flex w-full sm:w-auto gap-2">
            {!isEdit && (
              <button
                type="button"
                onClick={handleSubmit((data) => submit(data, "draft"))}
                className="flex-1 sm:flex-none px-6 h-[48px] rounded-3xl text-[15px] font-bold text-[var(--text-secondary)] bg-navy hover:bg-navy-light transition-colors dark:bg-navy-light dark:hover:bg-navy"
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
              className="flex-1 sm:flex-none px-6 h-[48px] rounded-3xl text-[15px] font-bold bg-purple text-white hover:bg-purple-light transition-colors"
            >
              {isEdit ? "Save Changes" : "Save & Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
