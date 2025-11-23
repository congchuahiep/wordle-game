"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { encodeSolution } from "@/lib/utils";

const formSchema = z
  .object({
    wordLength: z.coerce
      .number()
      .min(3, "Tối thiểu 3 ký tự")
      .max(10, "Tối đa 10 ký tự"),
    maxGuesses: z.coerce.number().min(1).max(15),
    solution: z
      .string()
      .regex(/^[a-zA-Z]+$/, "Chỉ được nhập chữ cái (A-Z)")
      .min(1, "Vui lòng nhập đáp án"),
  })
  .refine((data) => data.solution.length === data.wordLength, {
    message: "Độ dài đáp án phải khớp với 'Độ dài từ' mà bạn đã thiết lập",
    path: ["solution"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const router = useRouter();

  const form = useForm<FormValues>({
    // biome-ignore lint/suspicious/noExplicitAny: Kệ
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      wordLength: 5,
      maxGuesses: 6,
      solution: "",
    },
  });

  function onSubmit(values: FormValues) {
    const encryptedSolution = encodeSolution(values.solution.toUpperCase());

    // Điều hướng sang trang play với query params
    router.push(
      `/play?wordLength=${values.wordLength}&maxGuesses=${values.maxGuesses}&solution=${encryptedSolution}`,
    );
  }

  return (
    <div className="size-full bg-stone-50 flex items-center justify-center">
      <section className="size-full flex items-center justify-center p-4 w-md">
        <Card className="w-full shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Cấu hình Game Wordle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="wordLength"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Độ dài từ</FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldDescription>
                        Số lượng ký tự của từ cần đoán (3-10).
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Field: Số lượt đoán */}
                <Controller
                  control={form.control}
                  name="maxGuesses"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Số lượt đoán tối đa</FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Field: Đáp án */}
                <Controller
                  control={form.control}
                  name="solution"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Từ đáp án (Solution)</FieldLabel>
                      <FieldDescription>
                        Nhập từ mà bạn muốn người chơi đoán.
                      </FieldDescription>
                      <Input
                        {...field}
                        placeholder="VD: HELLO"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button type="submit" className="w-full font-bold">
                Bắt đầu chơi
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
