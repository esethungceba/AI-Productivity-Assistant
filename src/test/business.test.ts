import { beforeEach, describe, expect, it } from "vitest";
import { BUSINESS } from "@/lib/business";
import { getTimeSaved, recordTimeSaved } from "@/lib/time-saved";

describe("Business identity", () => {
  it("uses the real business name", () => expect(BUSINESS.name).toBe("SparkleCore Cleaning Services"));
  it("identifies the founder", () => {
    expect(BUSINESS.founder).toBe("Esethu Ngceba");
    expect(BUSINESS.role).toBe("Founder");
  });
  it("uses Johannesburg as the business location", () => expect(BUSINESS.location).toBe("Johannesburg, South Africa"));
  it("links the real phone and WhatsApp number", () => {
    expect(BUSINESS.phone).toBe("063 324 7156");
    expect(BUSINESS.phoneHref).toBe("tel:+27633247156");
    expect(BUSINESS.whatsappHref).toBe("https://wa.me/27633247156");
  });
  it("uses the real email", () => expect(BUSINESS.emailHref).toBe("mailto:esethungceba01@gmail.com"));
});

describe("No fabricated activity", () => {
  beforeEach(() => localStorage.clear());
  it("starts time savings at zero instead of demonstration activity", () => {
    localStorage.setItem("sparklecore-time-saved", JSON.stringify({ minutes: 50 }));
    expect(getTimeSaved().minutes).toBe(0);
  });
  it("retains estimates from completed tasks", () => {
    recordTimeSaved("email");
    expect(getTimeSaved().minutes).toBe(10);
    expect(getTimeSaved().counts.email).toBe(1);
  });
});