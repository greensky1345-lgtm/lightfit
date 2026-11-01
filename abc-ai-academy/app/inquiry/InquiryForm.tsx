"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "./actions";
import { courses } from "@/data/courses";

const initial: InquiryState = { ok: false, message: "" };

const input = "mt-1 w-full rounded-md border border-gray-300 px-3 py-2.5 focus:border-brand focus:outline-none";

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function InquiryForm({ defaultCourse }: { defaultCourse?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return <p className="rounded-2xl bg-lavender p-8 text-center font-semibold">{state.message}</p>;
  }

  return (
    <form action={action} className="grid gap-5 md:grid-cols-2" noValidate>
      <Field label="기관·회사명 *" name="company" error={e.company}><input id="company" name="company" required className={input} /></Field>
      <Field label="담당자 이름 *" name="name" error={e.name}><input id="name" name="name" required autoComplete="name" className={input} /></Field>
      <Field label="연락처 *" name="phone" error={e.phone}><input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="010-0000-0000" className={input} /></Field>
      <Field label="이메일 *" name="email" error={e.email}><input id="email" name="email" type="email" required autoComplete="email" className={input} /></Field>
      <Field label="예상 인원" name="headcount"><input id="headcount" name="headcount" placeholder="예: 20명" className={input} /></Field>
      <Field label="희망 일정" name="schedule"><input id="schedule" name="schedule" placeholder="예: 12월 둘째 주" className={input} /></Field>
      <div className="md:col-span-2">
        <Field label="관심 과정" name="course">
          <select id="course" name="course" defaultValue={defaultCourse ?? ""} className={input}>
            <option value="">선택 안 함</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>{c.title.replace("\n", " ")}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field label="문의 내용 *" name="message" error={e.message}>
          <textarea id="message" name="message" required rows={6} className={input} />
        </Field>
      </div>
      <div className="md:col-span-2">
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="agree" className="mt-1" />
          <span>
            [필수] 개인정보 수집·이용에 동의합니다. (수집 항목: 이름, 연락처, 이메일, 기관명 / 목적: 교육 문의 응대 / 보유 기간: 문의 처리 후 1년)
          </span>
        </label>
        {e.agree && <p className="mt-1 text-xs text-red-600">{e.agree}</p>}
      </div>
      {state.message && !state.ok && <p className="text-sm text-red-600 md:col-span-2" role="alert">{state.message}</p>}
      <button type="submit" disabled={pending} className="rounded-md bg-brand py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-60 md:col-span-2">
        {pending ? "보내는 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
