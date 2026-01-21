import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

// Fetch all companies from the database
export async function GET() {
  await connectDB();
  const companies = await Company.find({});
  return NextResponse.json(companies);
}

// Create a new company using the request body data
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newCompany = await Company.create(data);
  return NextResponse.json(newCompany);
}

// Delete a company by ID provided in the URL parameters
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Company.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}