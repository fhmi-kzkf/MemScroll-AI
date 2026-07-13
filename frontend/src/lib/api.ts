/**
 * Central API configuration.
 * Uses NEXT_PUBLIC_API_URL from environment variables.
 * In development: defaults to http://localhost:8000
 * In production: set NEXT_PUBLIC_API_URL to your backend URL
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
