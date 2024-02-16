import { NextRequest, NextResponse } from "next/server";
import { createRequest, createResponse } from "node-mocks-http";

export type ApiRequest = NextRequest & ReturnType<typeof createRequest>;
export type ApiResponse = NextResponse & ReturnType<typeof createResponse>;
export const mockFetch = jest.fn();
