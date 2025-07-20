"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  memo,
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { GuestAPIData } from "~/app/_blueprints/guest";
import { updateGuestAction } from "~/app/_lib/actions";
import { updateProfileSchema } from "~/app/_schemas/updateProfile";

type UpdateProfileFormProps = {
  guest: GuestAPIData | null;
  children: React.ReactNode;
};

const UpdateProfileForm = memo(
  ({ guest, children }: UpdateProfileFormProps) => {
    const [formState, formAction, isPending] = useActionState(
      updateGuestAction,
      { success: false }
    );
    const formRef = useRef<HTMLFormElement>(null);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors: rhfErrors, isSubmitSuccessful },
    } = useForm<z.output<typeof updateProfileSchema>>({
      resolver: zodResolver(updateProfileSchema),
      defaultValues: {
        national_id: "",
      },
      mode: "onSubmit",
    });

    useEffect(() => {
      if (isSubmitSuccessful && formState.success) {
        reset();
      }
    }, [reset, isSubmitSuccessful, formState.success]);

    // Disabled fields do not get passed to FormData
    return (
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(formEvent) => {
          handleSubmit(async () => {
            startTransition(() => formAction(new FormData(formRef.current!)));
          })(formEvent);
        }}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm
          rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600
          disabled:text-gray-400"
            defaultValue={guest?.full_name && guest.full_name}
            {...register("full_name")}
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm
          rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600
          disabled:text-gray-400"
            defaultValue={guest?.email && guest.email}
            {...register("email")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            {guest?.country_flag && (
              <div className="relative h-6 w-12">
                <Image
                  fill
                  src={guest.country_flag}
                  alt="Country flag"
                  className="h-5 rounded-sm object-cover"
                />
              </div>
            )}
          </div>

          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="national_id">National ID number</label>
          <input
            required
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm
          rounded-sm"
            defaultValue={
              guest?.national_id
                ? guest.national_id
                : formState?.fields?.national_id
            }
            {...register("national_id")}
          />
          {formState?.errors?.national_id && (
            <p>{formState.errors.national_id}</p>
          )}
          {rhfErrors.national_id?.message && (
            <p>{rhfErrors.national_id.message}</p>
          )}
        </div>
        <div>
          <input hidden name="id" required defaultValue={guest!.id} />
        </div>
        <div className="flex justify-end items-center gap-6">
          <button
            className="bg-accent-500 px-8 py-4 text-primary-800
          font-semibold hover:bg-accent-600 transition-all
          disabled:cursor-not-allowed disabled:bg-gray-500
          disabled:text-gray-300"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update profile"}
          </button>
        </div>
      </form>
    );
  }
);

// Needed when using memo
UpdateProfileForm.displayName = "UpdateProfileForm";

export default UpdateProfileForm;