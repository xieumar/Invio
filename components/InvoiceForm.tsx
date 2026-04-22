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
import Image from "next/image";

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

  return (
    <>
      <p className="text-[18px] font-bold text-[#777F98] mb-4 mt-10">
        Item List
      </p>
      <div className="hidden sm:grid grid-cols-[1fr_64px_100px_40px] gap-4 mb-2">
        {["Item Name", "Qty.", "Price", "Total"].map((h) => (
          <span key={h} className="text-[13px] text-text-secondary">
            {h}
          </span>
        ))}
      </div>

      {fields.map((field, i) => (
        <div
          key={field.id}
          className="grid grid-cols-[1fr_64px_100px_40px] gap-4 items-start mb-4 sm:mb-3"
        >
          <Input
            placeholder="Item name"
            {...register(`items.${i}.name` as const)}
            error={!!errors.items?.[i]?.name}
          />
          <Input
            type="number"
            {...register(`items.${i}.quantity` as const, {
              valueAsNumber: true,
            })}
            error={!!errors.items?.[i]?.quantity}
          />
          <Input
            type="number"
            step="0.01"
            {...register(`items.${i}.price` as const, { valueAsNumber: true })}
            error={!!errors.items?.[i]?.price}
          />
          <div className="flex items-center justify-center h-14">
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-text-secondary hover:text-red transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ id: nanoid(), name: "", quantity: 1, price: 0, total: 0 })
        }
        className="w-full mt-4 h-14 rounded-3xl text-[15px] font-bold text-text-secondary bg-(--draft-bg) hover:bg-border transition-colors"
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
            </form>
          </FormProvider>
        </div>

        <div className="px-6 py-6 md:px-14 border-t border-border bg-bg mt-auto flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={onDiscard}
            className="px-6 h-12 rounded-3xl text-[15px] font-bold bg-[#F9FAFE] dark:bg-[#252945] text-text-secondary hover:bg-border transition-colors"
          >
            {isEdit ? "Cancel" : "Discard"}
          </button>

          <div className="flex gap-2">
            {!isEdit && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 h-12 rounded-3xl text-[15px] font-bold text-[#888EB0] bg-[#373b53] hover:bg-[#0C0E16] transition-colors"
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
              className="px-6 h-12 rounded-3xl text-[15px] font-bold bg-purple text-white hover:bg-purple-light transition-colors"
            >
              {isEdit ? "Save Changes" : "Save & Send"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
