import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://studyapi.vgit.cn/health', {
      // 重要：超时设短一点，方便快速报错
      signal: AbortSignal.timeout(5000),
    });
    return NextResponse.json({
      status: res.status,
      text: await res.text(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}