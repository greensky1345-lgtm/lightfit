"use server";

export type InquiryState = { ok: boolean; message: string; errors?: Record<string, string> };

const required = ["company", "name", "phone", "email", "message"] as const;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const errors: Record<string, string> = {};

  for (const key of required) if (!get(key)) errors[key] = "필수 입력 항목입니다.";
  if (get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) errors.email = "이메일 형식을 확인해 주세요.";
  if (get("phone") && !/^[0-9+\-\s()]{8,20}$/.test(get("phone"))) errors.phone = "연락처 형식을 확인해 주세요.";
  if (formData.get("agree") !== "on") errors.agree = "개인정보 수집·이용에 동의해 주세요.";
  for (const key of ["company", "name", "message"]) if (get(key).length > 2000) errors[key] = "내용이 너무 깁니다.";

  if (Object.keys(errors).length) return { ok: false, message: "입력 내용을 확인해 주세요.", errors };

  // TODO: 문의 저장 또는 담당자 메일 발송 연결 (예: Supabase inquiries 테이블, 메일 발송 서비스)
  // 연결 전까지는 서버 로그에만 남습니다.
  console.log("[inquiry]", {
    company: get("company"),
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    headcount: get("headcount"),
    schedule: get("schedule"),
    course: get("course"),
    message: get("message"),
  });

  return { ok: true, message: "접수되었습니다. 영업일 기준 1일 안에 연락드립니다." };
}
