
import { NextRequest, NextResponse } from 'next/server';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo } from '@/lib/ziwei/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { year, month, day, hour, gender } = body;

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      !Number.isInteger(day) ||
      !Number.isInteger(hour) ||
      hour < 0 ||
      hour > 11 ||
      !['male', 'female'].includes(gender)
    ) {
      return NextResponse.json(
        { error: 'Invalid birth information' },
        { status: 400 }
      );
    }

    const birthInfo = {
      year,
      month,
      day,
      hour,
      gender,
    } as BirthInfo;

    const chart = generateChart(birthInfo);

    return NextResponse.json(chart);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : 'Chart generation failed',
      },
      { status: 400 }
    );
  }
}
