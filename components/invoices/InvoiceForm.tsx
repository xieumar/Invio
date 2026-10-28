"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  get,
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { InvoiceDatePicker } from "./InvoiceDatePicker";
import { InvoicePaymentTerms } from "./InvoicePaymentTerms";
import { invoiceSchema, InvoiceFormValues } from "@/lib/validations";
import { ClientSelect } from "@/features/invoices";
import { calculateInvoice, toMajorUnits, formatMoney } from "@/lib/money";

interface InvoiceFormProps {
  invoice?: Invoice;
  initialValues?: Partial<InvoiceFormValues>;
  /** Highlight prefilled fields as AI suggestions until the user edits them */
  aiSuggested?: boolean;
  onSave: (data: InvoiceFormData, status: InvoiceStatus) => void;
  onDiscard: () => void;
}

const AI_FIELD_KEYS = [
  "clientName",
  "clientEmail",
  "description",
  "paymentTerms",
  "senderAddress",
  "clientAddress",
  "items",
  "taxRate",
  "discount",
];

interface AiHighlightState {
  enabled: boolean;
  dirtyFields: unknown;
}

const AiHighlightContext = createContext<AiHighlightState>({
  enabled: false,
  dirtyFields: {},
});

/** True while a field is AI-suggested and the user hasn't edited it yet */
function useIsAiSuggested(name?: string): boolean {
  const { enabled, dirtyFields } = useContext(AiHighlightContext);
  if (!enabled || !name) return false;
  const isAiField = AI_FIELD_KEYS.some(
    (key) => name === key || name.startsWith(`${key}.`)
  );
  return isAiField && !get(dirtyFields, name);
}

const emptyAddress = { street: "", city: "", postCode: "", country: "" };
const defaultSenderAddress = {
  street: "19 Union Terrace",
  city: "London",
  postCode: "E1 3EZ",
  country: "United Kingdom",
};

function Field({
  label,
  error,
  children,
  className = "",
  aiName,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  /** Field name to badge as AI-suggested (for non-Input controls) */
  aiName?: string;
}) {
  const aiSuggested = useIsAiSuggested(aiName);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label
          className={`text-[13px] font-medium ${
            error ? "text-red" : "text-text-secondary"
          }`}
        >
          {label}
          {aiSuggested && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-purple">
              AI suggested
            </span>
          )}
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
  const aiSuggested = useIsAiSuggested(props.name);
  return (
    <input
      className={`w-full rounded px-5 py-4 text-[15px] font-bold text-text-primary outline-none transition-colors border
        bg-(--input-bg) border-(--input-border)
        hover:border-purple focus:border-purple h-14
        ${aiSuggested ? "border-purple/60! bg-purple/5! ring-2 ring-purple/15" : ""}
        ${error ? "border-red!" : ""}
      `}
      data-ai-suggested={aiSuggested || undefined}
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

function TotalsSection() {
  const { watch, register } = useFormContext<InvoiceFormValues>();
  const items = watch("items") ?? [];
  const taxRate = Number(watch("taxRate")) || 0;
  const discount = Number(watch("discount")) || 0;

  const { subtotal, taxAmount, discountAmount, total } = calculateInvoice(
    items.map((i) => ({ quantity: Number(i.quantity) || 0, price: Number(i.price) || 0 })),
    taxRate,
    discount
  );

  const rows: Array<{ label: string; value: number; highlight?: boolean }> = [
    { label: "Subtotal", value: subtotal },
    ...(taxRate > 0 ? [{ label: `Tax (${taxRate}%)`, value: taxAmount }] : []),
    ...(discount > 0 ? [{ label: "Discount", value: -discountAmount }] : []),
    { label: "Total Due", value: total, highlight: true },
  ];

  return (
    <div className="mt-10 space-y-6">
      {/* Tax & Discount inputs */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Tax Rate (%)">
          <Input
            inputMode="decimal"
            placeholder="0"
            {...register("taxRate", {
              setValueAs: (v) => (v === "" || v === undefined ? 0 : parseFloat(v) || 0),
            })}
          />
        </Field>
        <Field label="Discount (£)">
          <Input
            inputMode="decimal"
            placeholder="0.00"
            {...register("discount", {
              setValueAs: (v) => (v === "" || v === undefined ? 0 : parseFloat(v) || 0),
            })}
          />
        </Field>
      </div>

      {/* Totals summary */}
      <div className="rounded-xl overflow-hidden">
        <div className="bg-surface-alt px-6 py-4 space-y-3">
          {rows.map(({ label, value, highlight }) => (
            <div key={label} className="flex justify-between items-center">
              <span className={`text-[13px] ${highlight ? "text-text-primary font-bold text-[15px]" : "text-text-secondary"}`}>
                {label}
              </span>
              <span className={`tabular-nums font-bold ${highlight ? "text-text-primary text-[20px]" : "text-text-secondary text-[15px]"}`}>
                {formatMoney(Math.abs(value))}
                {value < 0 ? " off" : ""}
              </span>
            </div>
          ))}
        </div>
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
          // Minor-unit safe: price is in major units, convert → minor → calc → back to display
          const { subtotal: rowMinor } = calculateInvoice([{ quantity: qty, price }]);
          const total = toMajorUnits(rowMinor).toFixed(2);

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
                      className="text-[#888EB0] hover:text-red transition-colors flex items-center justify-center cursor-pointer"
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
        className="w-full mt-8 sm:mt-10 h-14 rounded-3xl text-[15px] font-bold text-text-secondary bg-(--draft-bg) hover:bg-border transition-colors cursor-pointer"
      >
        + Add New Item
      </button>
    </>
  );
}

export function InvoiceForm({
  invoice,
  initialValues,
  aiSuggested = false,
  onSave,
  onDiscard,
}: InvoiceFormProps) {
  const isEdit = !!invoice;
  const panelRef = useRef<HTMLDivElement>(null);

  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: invoice || {
      clientId: null,
      description: initialValues?.description || "",
      paymentTerms: initialValues?.paymentTerms || 30,
      clientName: initialValues?.clientName || "",
      clientEmail: initialValues?.clientEmail || "",
      createdAt:
        initialValues?.createdAt || new Date().toISOString().split("T")[0],
      senderAddress: initialValues?.senderAddress || defaultSenderAddress,
      clientAddress: initialValues?.clientAddress || emptyAddress,
      items: initialValues?.items?.length
        ? initialValues.items
        : [{ id: nanoid(), name: "", quantity: 1, price: 0, total: 0 }],
      taxRate: initialValues?.taxRate ?? 0,
      discount: initialValues?.discount ?? 0,
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = methods;

  const handleClientSelect = useCallback(
    (client: Client | null) => {
      if (client) {
        setValue("clientId", client.id, { shouldDirty: true });
        setValue("clientName", client.name, { shouldValidate: true });
        setValue("clientEmail", client.email, { shouldValidate: true });
        setValue("clientAddress", client.address, { shouldValidate: true });
      } else {
        setValue("clientId", null);
        setValue("clientName", "");
        setValue("clientEmail", "");
        setValue("clientAddress", emptyAddress);
      }
    },
    [setValue]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onDiscard();
    }
    document.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onDiscard]);

  function buildPayload(values: InvoiceFormValues): InvoiceFormData {
    const { subtotal, taxAmount, discountAmount, total } = calculateInvoice(
      values.items.map((i) => ({ quantity: Number(i.quantity) || 0, price: Number(i.price) || 0 })),
      Number(values.taxRate) || 0,
      Number(values.discount) || 0
    );
    return {
      ...values,
      items: values.items.map((item) => ({
        ...item,
        // per-row total stored in minor units
        total: calculateInvoice([{ quantity: Number(item.quantity) || 0, price: Number(item.price) || 0 }]).total,
      })),
      subtotal,
      taxRate: Number(values.taxRate) || 0,
      taxAmount,
      discountAmount,
      total,
    };
  }

  const handleSaveDraft = () => {
    const values = getValues();
    onSave(buildPayload(values), "draft");
  };

  function submit(data: InvoiceFormValues, status: InvoiceStatus) {
    onSave(buildPayload(data), status);
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-150 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onDiscard}
      />

      <div
        ref={panelRef}
        className="
          fixed top-0 right-0 bottom-0 z-151 flex flex-col
          w-full md:w-160 max-w-full bg-bg
          border-l border-border shadow-2xl md:rounded-l-[20px]
          transition-all animate-in slide-in-from-right duration-300
        "
      >
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-8 md:px-14 md:pt-14">
          <h2 className="text-2xl font-bold text-text-primary mb-12">
            {isEdit ? (
              <>
                <span className="text-text-secondary">#</span>
                {invoice?.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          {aiSuggested && !isEdit && (
            <p
              role="status"
              className="mb-8 -mt-6 rounded-lg border border-purple/30 bg-purple/5 px-4 py-3 text-[13px] text-text-secondary"
            >
              <span className="font-bold text-purple">AI draft.</span> Suggested
              fields are highlighted. Review and edit them, then save. Nothing is
              saved until you click Save.
            </p>
          )}

          <AiHighlightContext.Provider
            value={{ enabled: aiSuggested && !isEdit, dirtyFields }}
          >
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
                <Field label="Client">
                  <Controller
                    control={control}
                    name="clientId"
                    render={({ field }) => (
                      <ClientSelect
                        value={field.value}
                        onChange={handleClientSelect}
                      />
                    )}
                  />
                </Field>
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

                <Field label="Payment Terms" aiName="paymentTerms">
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
              <TotalsSection />
            </form>
          </FormProvider>
          </AiHighlightContext.Provider>
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
                hover:bg-border transition-colors whitespace-nowrap cursor-pointer
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
                  hover:bg-border transition-colors whitespace-nowrap cursor-pointer
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
                  bg-sidebar-light hover:bg-text-primary-light transition-colors whitespace-nowrap cursor-pointer
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
                bg-purple text-white hover:bg-purple-light transition-colors whitespace-nowrap cursor-pointer
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

export default InvoiceForm;
